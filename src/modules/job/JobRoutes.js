import express from "express";
import {
  addjob,
  deletejob,
  getAllJobsOfCompany,
  getAlljobswithfilters,
  getalljobs,
  makeapplication,
  updatejob,
} from "./job.Controller.js";
import { allowTo, protectedRoute } from "../auth/authcontroller.js";
import { validation } from "../../middleware/validation.js";
import { addjobVal, deleteJobVal, updatejobVal } from "./job.validation.js";

const jobRouter = express.Router();
jobRouter
  .route("/")
  .post(protectedRoute, allowTo("Company_HR"), validation(addjobVal), addjob)
  .get(protectedRoute, allowTo("Company_HR", "user"), getalljobs);

jobRouter.get(
  "/alljobs",
  protectedRoute,
  allowTo("Company_HR"),

  getAllJobsOfCompany
);
jobRouter.get(
  "/alljobss",
  protectedRoute,
  allowTo("Company_HR"),
  getAlljobswithfilters
);
jobRouter
  .route("/:id")
  .put(
    protectedRoute,
    allowTo("Company_HR"),
    validation(updatejobVal),
    updatejob
  )
  .delete(
    protectedRoute,
    allowTo("Company_HR"),
    validation(deleteJobVal),
    deletejob
  )
  .get(protectedRoute, allowTo("user"), makeapplication);

export default jobRouter;
