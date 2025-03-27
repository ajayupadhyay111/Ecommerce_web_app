import jwt from "jsonwebtoken";
import axios from "axios";
import { oauth2client } from "../utils/googleConfig.js";
import User from "../models/user.model.js";

export const googleLogin = async (req, res, next) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);

    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { name, email, picture } = userRes.data;
    const randomPassword = Math.random().toString(36).slice(-8); // Generate random password
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: randomPassword,
        picture,
        isVerified: true,
      });
    }
    const accessToken = jwt.sign(
      { email: user.email },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "success",
      accessToken,
      user: {
        name: user.name,
        email: user.email,
        picture: user.picture,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.log("error while logging user by google ", error.message);
    next(error);
  }
};
