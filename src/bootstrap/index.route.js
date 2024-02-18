import { globalerror } from "../middleware/globalerror.js";
import companyRouter from "../modules/Company/companyRoutes.js";
import jobRouter from "../modules/job/JobRoutes.js";
import userRoute from "../modules/user/userRoutes.js";

export const bootstrap = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use(globalerror);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/company", companyRouter);
  app.use("/api/v1/job", jobRouter);
};
