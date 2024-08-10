import { IUser } from "@/helpers/interfaces/User.definations";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

export const User = mongoose.model<IUser>("User", UserSchema);
