import { jobModel } from "../../../database/models/job.model.js";
import { AppError } from "../../utils/apperror.js";
import { catcherror } from "../../middleware/catcherror.js";
import { companyModel } from "../../../database/models/company.model.js";
import { applicationModel } from "../../../database/models/applicationmodel.js";
const addjob = async (req, res, next) => {
  let job = new jobModel(req.body);
  await job.save();
  res.json({ message: "Added!", job });
};
const updatejob = async (req, res, next) => {
  let job = await jobModel.findById(req.params.id);
  if (job) {
    await jobModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "updated!" });
  } else {
    next(new AppError("ERRORR!", 401));
  }
};

const deletejob = async (req, res, next) => {
  let job = await jobModel.findById(req.params.id);
  if (job) {
    await jobModel.findByIdAndDelete(req.params.id);
    res.json({ message: "DELETED!" });
  } else {
    next(new AppError("job not found"));
  }
};

const getjobData = catcherror(async (req, res, next) => {
  let job = await jobModel.findById(req.params.id);
  res.json({ message: "success", job });
});
const getalljobs = async (req, res, next) => {
  const jobs = await jobModel.find().populate("companyID");
  res.json({ message: "jobs:", jobs });
};
//Search for a job with a name
const getAllJobsOfCompany = catcherror(async (req, res, next) => {
  let companyname = req.query.companyname;
  let company = await companyModel.findOne({
    companyname: req.body.companyname,
  });
  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }
  let job = await jobModel
    .find({ companyID: req.body.companyID })
    .populate("companyID");
  res.json({ message: "Success", job });
});
//Get all Jobs that match the following filters
const getAlljobswithfilters = catcherror(async (req, res) => {
  let filter = {};
  const {
    workingTime,
    joblocation,
    seniorityLevel,
    jobtitle,
    technicalSkills,
  } = req.body;
  if (workingTime) filter.workingTime = workingTime;
  if (joblocation) filter.joblocation = joblocation;
  if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
  if (jobtitle) filter.jobtitle = jobtitle;
  if (technicalSkills) filter.technicalSkills = technicalSkills;
  const jobs = await jobModel.find(filter);
  res.json({ message: "Success", jobs });
});
const makeapplication = catcherror(async (req, res) => {
  let app = new applicationModel(req.body);
  app.jobId = req.params.id;
  app.userId = req.user._id;
  await app.save();
  res.json({ message: "Application added succsufly" });
});
export {
  addjob,
  updatejob,
  deletejob,
  getjobData,
  getalljobs,
  getAllJobsOfCompany,
  getAlljobswithfilters,
  makeapplication,
};
