import { usermodel } from "../../database/models/user.model.js";

export const check = async (req, res, next) => {
  let user = await usermodel.findOne({ email: req.body.email });
  if (user) return res.json({ message: "email is already exist" });

  next();
};
export const notfound = async (req, res, next) => {
  let user = await usermodel.findOne({ email: req.body.email });
  if (!user) return res.json({ message: "email not found" });
  next();
};
