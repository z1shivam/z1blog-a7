import { Model, Schema, models, model } from "mongoose";

interface IUser {
  _id: string;
  name: string;
  profileImage: string;
  username: string;
  passwordHash: string;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    passwordHash: {
      type: String,
    },
  } as const,
  { _id: false },
);

const User = (models?.User as Model<IUser>) || model("User", userSchema);

export default User;
