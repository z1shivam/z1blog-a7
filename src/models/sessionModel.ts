import { Model, Schema, model, models } from "mongoose";

interface ISession{
  _id: string;
  user_id: string;
  expires_at: Date; 
}

const sessionSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  } as const,
  { _id: false },
);

const Session = (models?.Session as Model<ISession>) || model("Session", sessionSchema);

export default Session;
