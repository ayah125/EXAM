import mongoose from "mongoose";
mongoose;
const applicationschema = new mongoose.Schema(
  {
    userTechSkills: [],
    userSoftSkills: [],
    seniorityLevel: {
      type: String,
      enum: ["Junior", "midLevel", "senior", "Team-Lead", "CTO"],
    },
    jobID: {
      type: mongoose.Types.ObjectId,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "userID",
    },
    userResume: {
      type: String,
    },
  },
  { timestamps: true }
);
export const applicationModel = mongoose.model(
  "application",
  applicationschema
);
