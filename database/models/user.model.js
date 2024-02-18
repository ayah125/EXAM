import mongoose from "mongoose";
import bcrypt from "bcrypt";
mongoose;
const userschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    secondname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      firstname: String,
      secondname: String,
    },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    passwordChangedAt: Date,
    recoveryemail: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "Company_HR"],
      default: "user",
    },
    mobilenumber: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "online",
    },
    userID: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);
// userschema.findSimilarTypes=function(cb){return mongoose.model('animal').find({type:this.type},cb)}
userschema.pre("save", function () {
  if (this.password) bcrypt.hashSync(this.password, 8);
});
userschema.pre("insertMany", function () {
  if (this.password) bcrypt.hashSync(this.password, 8);
});
// userschema.pre("findOneAndUpdate", function () {
//   if (this._update.password) bcrypt.hashSync(this._update.password, 8);
// });
export const usermodel = mongoose.model("user", userschema);
