import User from "../model/user.js";
import Token from "../model/token.js";
import brcypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signupUser = async (request, response) => {
  try {
    let user = request.body;
    const hashPassword = await brcypt.hash(request.body.password, 10);
    user = { ...user, password: hashPassword };
    const newUser = new User(user);
    await newUser.save();
    return response.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    return response.status(500).json({ msg: "Error while Signup" });
  }
};
export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username not found " });
  }
  try {
    let match = await brcypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: "60m",
        }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );
      const newtoken = new Token({ refreshToken: refreshToken });
      await newtoken.save();
      console.log("Reached here after new token");
      return response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      return response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    return response.status(500).json({ msg: "Error while login in user" });
  }
};
