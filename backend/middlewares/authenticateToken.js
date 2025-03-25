import jwt from "jsonwebtoken";
import {config} from "dotenv"
config();
export const authenticateToken =async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
  if (!token || token === "null"){
    return res.status(403).json({ message: "Unauthorized", refresh: true });
  }
  let decode = jwt.verify(token, process.env.ACCESS_SECRET);
  if(!decode){
    return res.status(403).json({ message: "Token Expired", refresh: true });
  }
  req.email = decode.email;
  next();
  } catch (error) {
    next(error)
  }
};
