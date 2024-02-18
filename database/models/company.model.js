import mongoose from "mongoose";
mongoose;
const companyschema = new mongoose.Schema(
  {
    companyname: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
    },
    companyemail: {
      type: String,
      trim: true,
      unique: true,
    },
    address: [
      {
        street: String,
        city: String,
      },
    ],
    numofemployee: {
      type: Number,
      $range: [11, 20],
    },
    companyHR: {
      type: mongoose.Types.ObjectId,
    },

    companyOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const companyModel = mongoose.model("company", companyschema);
