import express from "express";
import {
  addcompany,
  deletecompanydata,
  getcompanyData,
  searchwithname,
  updatecompany,
} from "./company.Controller.js";
import { allowTo, protectedRoute } from "../auth/authcontroller.js";
import { validation } from "../../middleware/validation.js";
import {
  deletecompanyVal,
  getsingleval,
  searchnameval,
  updatecompanyVal,
} from "./company.validation.js";

const companyRouter = express.Router();
companyRouter.post(
  "/addcompany",
  protectedRoute,
  allowTo("Company_HR"),
  addcompany
);
companyRouter.get(
  "/search",
  protectedRoute,
  allowTo("Company_HR", "user"),
  validation(searchnameval),
  searchwithname
);
companyRouter
  .route("/:id")
  .put(
    protectedRoute,
    allowTo("Company_HR"),
    validation(updatecompanyVal),
    updatecompany
  )
  .delete(
    protectedRoute,
    allowTo("Company_HR"),
    validation(deletecompanyVal),
    deletecompanydata
  )
  .get(
    protectedRoute,
    allowTo("Company_HR"),
    validation(getsingleval),
    getcompanyData
  );

export default companyRouter;
