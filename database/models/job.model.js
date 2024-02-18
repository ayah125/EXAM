import mongoose from "mongoose";
mongoose;
const jobschema = new mongoose.Schema(
  {
    jobtitle: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    jobdescription: {
      type: String,
      required: true,
      trim: true,
    },
    technicalSkills: [],
    softSkills: [],
    joblocation: {
      type: String,
      enum: ["onsite", "remotely", "hybrid"],
    },
    workingTime: {
      type: String,
      enum: ["part time", "full time"],
    },
    seniorityLevel: {
      type: String,
      enum: ["Junior", "midLevel", "senior", "Team-Lead", "CTO"],
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "companyHR",
    },
    companyID: {
      type: mongoose.Types.ObjectId,
      ref: "company",
    },
  },
  { timestamps: true }
);
export const jobModel = mongoose.model("job", jobschema);
