import { usermodel } from "../../../database/models/user.model.js";
import { catcherror } from "../../middleware/catcherror.js";
import { AppError } from "../../utils/apperror.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const signup = catcherror(async (req, res, next) => {
  let user = new usermodel(req.body);
  let token = jwt.sign({ email: req.body.email }, "ayah");
  await user.save();
  res.json({ message: "success", token });
});
const signin = catcherror(async (req, res, next) => {
  let user = await usermodel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ message: "signin" });
  }
  next(new AppError("incorrect pass or email", 401));
});
const updatepassword = catcherror(async (req, res, next) => {
  let user = await usermodel.findById(req.params.id);
  if (user) {
    let token = req.headers.token;
    let decoded = jwt.verify(token, "ayah");
    if (decoded.userID == req.params.id) {
      await usermodel.findOneAndUpdate(
        { email: req.body.email },
        { password: req.body.newpassword, repassword: req.body.repassword }
      );
      res.json({ message: "success" });
    } else {
      next(new AppError("email not found", 401));
    }
  }
});
const updateacconut = catcherror(async (req, res, next) => {
  let user = await usermodel.findById(req.params.id);
  if (user) {
    let token = req.headers.token;
    let decoded = jwt.verify(token, "ayah");
    if (decoded.userID == req.params.id) {
      await usermodel.findByIdAndUpdate(req.params.id, req.body);
      res.json({ message: "success" });
    } else {
      next(new AppError("error", 401));
    }
  }
});
const deleteAccount = catcherror(async (req, res, next) => {
  let user = await usermodel.findById(req.params.id);
  if (user) {
    let token = req.headers.token;
    let decoded = jwt.verify(token, "ayah");
    console.log(decoded);
    if (decoded.email == req.body.email) {
      await usermodel.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted" });
    } else {
      next(new AppError("Errorr", 401));
    }
  } else {
    next(new AppError("Errorr", 401));
  }
});
const getuserData = catcherror(async (req, res, next) => {
  let token = req.headers.token;
  let decoded = jwt.verify(token, "ayah");
  if (decoded.userID == req.params.id) {
    let userData = await usermodel.findById(req.params.id);
    !userData && res.status(404).json({ message: "user not found" });
    userData && res.json({ message: "success", userData });
  } else {
    next(new AppError("email not found", 401));
  }
});
//Get all accounts associated to a specific recovery Email
const getallaccounts = catcherror(async (req, res) => {
  let accounts = await usermodel.find({
    recoveryemail: req.body.recoveryemail,
  });
  res.json({ message: "success", accounts });
});
const forgotpassword = async (req, res) => {
  let checkmail = await usermodel.findOne({
    email: req.body.email,
    id: req.params.id,
  });
  let OTP = "12345";
  if (checkmail && OTP == req.body.OTP) {
    password == req.body.newpassword;
    res.json({ message: "success" });
  } else {
    res.json({ message: "falied" });
  }
};

const getprofiledata = catcherror(async (req, res, next) => {
  let token = req.headers.token;
  let decoded = jwt.verify(token, "ayah");
  if (decoded.userID !== req.body.id) {
    let profile = await usermodel.findById(req.body.id);
    res.json({ message: "success", profile });
  } else {
    res.json({ message: "failed" });
  }
});

export {
  signup,
  signin,
  updateacconut,
  updatepassword,
  deleteAccount,
  getuserData,
  getallaccounts,
  forgotpassword,
  getprofiledata,
};
