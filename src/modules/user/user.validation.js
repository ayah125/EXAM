import joi from "joi";
const signupval = joi.object({
  firstname: joi.string().min(2).max(200).required(),
  secondname: joi.string().min(2).max(200).required(),
  email: joi.string().email().required(),
  recoveryemail: joi.string().email().required(),
  password: joi.string().required(),
  repassword: joi.valid(joi.ref("password")).required(),
  role: joi.string().valid("user", "Company_HR"),
});

const signinVal = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
const paramIdVal = joi.object({
  id: joi.string().hex().length(24).required(),
});
const updateaccountval = joi.object({
  id: joi.string().hex().length(24),
  firstname: joi.string().max(200),
  secondname: joi.string().max(200),
  email: joi.string().email(),
  recoveryemail: joi.string().email(),
  password: joi.string(),
  repassword: joi.valid(joi.ref("password")),
  role: joi.string().valid("user", "Company_HR"),
  DOB: joi.date(),
});
const deleteAccVal = joi.object({
  email: joi.string().email().required(),
  id: joi.string().hex().length(24).required(),
});
const updatePasswordVal = joi.object({
  id: joi.string().hex().length(24).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  newpassword: joi.string().required(),
  repassword: joi.valid(joi.ref("newpassword")).required(),
});
const getuserdata = joi.object({
  id: joi.string().hex().length(24).required(),
});
const forgotpasswordval = joi.object({
  id: joi.string().hex().length(24).required(),
  email: joi.string().email().required(),
  OTP: joi.string().required(),
  newpassword: joi.string().required(),
});
const getprofileVal = joi.object({
  id: joi.string().hex().length(24).required(),
});

export {
  signinVal,
  paramIdVal,
  signupval,
  updatePasswordVal,
  updateaccountval,
  deleteAccVal,
  getuserdata,
  forgotpasswordval,
  getprofileVal,
};
