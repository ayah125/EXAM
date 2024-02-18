import jwt from "jsonwebtoken";

import { companyModel } from "../../../database/models/company.model.js";
import { AppError } from "../../utils/apperror.js";
import { catcherror } from "../../middleware/catcherror.js";
import { jobModel } from "../../../database/models/job.model.js";

const addcompany = async (req, res, next) => {
  let company = new companyModel(req.body);
  await company.save();
  res.json({ message: "Added!", company });
};
const updatecompany = async (req, res, next) => {
  let company = await companyModel.findById(req.params.id);
  if (company) {
    await companyModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "updated!" });
  } else {
    next(new AppError("ERRORR!", 401));
  }
};

const deletecompanydata = async (req, res, next) => {
  let company = await companyModel.findById(req.params.id);
  if (company) {
    await companyModel.findByIdAndDelete(req.params.id);
    res.json({ message: "DELETED!" });
  } else {
    next(new AppError("company not found"));
  }
};
// فاضل جزء الjobs
const getcompanyData = catcherror(async (req, res, next) => {
  let company = await companyModel.findById(req.params.id);
  res.json({ message: "success", company });
});
//Search for a company with a name.
const searchwithname = catcherror(async (req, res, next) => {
  let company = await companyModel.findOne({
    companyname: req.body.companyname,
  });
  if (company) {
    res.json({ message: "company:", company });
  } else {
    next(new AppError("company not found", 404));
  }
});
const getAplicationsJobs = catcherror(async (req, res) => {
  let job = await jobModel.findById(req.params.id);
  let company = await companyModel.findById(job.companyID);
  if (lodash.isEqual(req.user._id, company.companyOwner)) {
    let app = await applicationModel.find({ jobId: req.params.id });
    res.json({ message: "Success", app });
  }
});
export {
  addcompany,
  updatecompany,
  deletecompanydata,
  getcompanyData,
  searchwithname,
  getAplicationsJobs,
};
