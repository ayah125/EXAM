import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  deleteAccVal,
  forgotpasswordval,
  getuserdata,
  signinVal,
  signupval,
  updatePasswordVal,
  updateaccountval,
} from "./user.validation.js";
import { check, notfound } from "../../middleware/checkemail.js";
import {
  deleteAccount,
  forgotpassword,
  getallaccounts,
  getprofiledata,
  getuserData,
  signin,
  signup,
  updateacconut,
  updatepassword,
} from "./userController.js";
import { allowTo, protectedRoute } from "../auth/authcontroller.js";
const userRoute = express.Router();
userRoute
  .post("/signup", validation(signupval), check, signup)
  .post(
    "/signin",
    protectedRoute,
    allowTo("Company_HR", "user"),
    validation(signinVal),
    signin
  )
  .get("/", validation(getuserdata), getuserData)
  .get("/allacounts", getallaccounts);

userRoute
  .route("/:id")
  .put(validation(updatePasswordVal), notfound, updatepassword)
  .delete(validation(deleteAccVal), deleteAccount)
  .get(validation(getuserdata), getuserData);
userRoute.get("/getprofile/:id", getprofiledata);

userRoute.put("/forgot/:id", validation(forgotpasswordval), forgotpassword);

userRoute.put(
  "/updateacconut/:id",
  validation(updateaccountval),
  notfound,
  updateacconut
);

export default userRoute;
