import User from "../models/user.model.js";

export const getAllUsers = async (request, response, next) => {
  try {
    const email = request.email;
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      const users = await User.find({ _id: { $ne: user._id } });
      return response.status(201).json({ users });
    }
    return response.status(400).json({
      message: "You are not authorized to access this page",
      users: {
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const editUserById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, email, role, isVerified } = request.body;

    const user = await User.findById(id);
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.role = role;
    user.isVerified = isVerified;
    await user.save();

    response.status(200).json({success:true, message: "User updated" });
  } catch (error) {
    next(error);
  }
};
export const deleteUserById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }

    response.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
