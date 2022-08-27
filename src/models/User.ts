import { Schema, model } from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  userImg: string;
  passwordHash: string;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    userImg: String,
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
