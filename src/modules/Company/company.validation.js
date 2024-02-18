import joi from "joi";
const addcompanyVal = joi.object({
  companyname: joi.string().min(2).max(200).required(),
  description: joi.string().min(2).max(200).required(),
  industry: joi.string().min(2).max(200).required(),
  role: joi.string().min(2).max(200).required(),
  companyemail: joi.string().email().required(),
  role: joi.string().valid("user", "Company_HR"),
  numofemployee: joi.number().min(11).max(20).required(),
  companyHR: joi.string().hex().length(24),
});
const updatecompanyVal = joi.object({
  companyname: joi.string().min(2).max(200),
  description: joi.string().min(2).max(200),
  industry: joi.string().min(2).max(200),
  role: joi.string().min(2).max(200),
  companyemail: joi.string().email(),
  numofemployee: joi.number().min(11).max(20),
  companyHR: joi.string().hex().length(24),
  id: joi.string().hex().length(24).required(),
});
const deletecompanyVal = joi.object({
  id: joi.string().hex().length(24).required(),
});
const getsingleval = joi.object({
  id: joi.string().hex().length(24).required(),
});
const searchnameval = joi.object({
  companyname: joi.string().trim().required(),
});

export {
  deletecompanyVal,
  addcompanyVal,
  updatecompanyVal,
  getsingleval,
  searchnameval,
};
