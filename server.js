process.on("uncaughtException", (err) => {
  console.log("error", err);
});
import express from "express";
import { dbconnection } from "./database/db_connection.js";
import { bootstrap } from "./src/bootstrap/index.route.js";
const app = express();
const port = 3000;
app.use(express.json());
bootstrap(app);
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
dbconnection();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/ayah125/EXAM.git
// git push -u origin main
