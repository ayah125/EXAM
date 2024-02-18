import joi from "joi";
const addjobVal = joi.object({
  jobtitle: joi.string().min(2).max(200).required(),
  jobdescription: joi.string().min(2).max(200).required(),
  joblocation: joi.string().min(2).max(200).required(),
  workingTime: joi.string().min(2).max(200).required(),
  seniorityLevel: joi.string().min(2).max(200).required(),
  addedBy: joi.string().hex().length(24),
  technicalSkills: joi.array().items(joi.string()),
  softSkills: joi.array().items(joi.string()),
  companyID: joi.string().hex().length(24).required(),
});
const updatejobVal = joi.object({
  id: joi.string().hex().length(24).required(),
  jobtitle: joi.string().min(2).max(200),
  jobdescription: joi.string().min(2).max(200),
  joblocation: joi.string().min(2).max(200),
  workingTime: joi.string().min(2).max(200),
  seniorityLevel: joi.string().min(2).max(200),
  addedBy: joi.string().hex().length(24),
  technicalSkills: joi.array().items(joi.string()),
  softSkills: joi.array().items(joi.string()),
});
const deleteJobVal = joi.object({
  id: joi.string().hex().length(24).required(),
});
const getJobsVal = joi.object({
  companyname: joi.string().min(2).max(200),
});
export { addjobVal, updatejobVal, deleteJobVal, getJobsVal };
