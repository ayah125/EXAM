import { usermodel } from "../../../database/models/user.model.js";
import { catcherror } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/apperror.js";
import jwt from "jsonwebtoken";
const protectedRoute = async (req, res, next) => {
  let { token } = req.headers;
  if (!token) return new AppError("user not found", 404);
  let decoded = jwt.verify(token, "ayah");
  let user = await usermodel.findById(decoded.userID);
  if (!user) return new AppError("user not found", 404);
  if (user?.passwordChangedAt) {
    let time = parseInt(user?.passwordChangedAt.getDate() / 1000);
    if (time > decoded.iat) return new AppError("invalid token!", 404);
  }
  req.user = user;
  next();
};
const allowTo = (...roles) => {
  return catcherror(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return new AppError("you are not authorized", 401);
    next();
  });
};
export { protectedRoute, allowTo };
