import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const authenticateToken = async (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null || token === undefined) {
    return response
      .status(401)
      .json({ msg: "token is missing", clearToken: true });
  }
  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      return response.status(404).json({ msg: "Invalid Token", clearToken: true });
    }
    request.user = user;
    next();
  });
};
