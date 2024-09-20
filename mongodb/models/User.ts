import mongoose from "mongoose";
import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  userID: string;
  translations: ITranslation[];
}

const userSchema = new Schema<IUser>(
  {
    userID: {
      required: true,
      type: String,
      unique: true,
    },

    translations: {
      type: [Schema.Types.ObjectId],
      ref: "Translation",
    },
  },
  {
    timestamps: true,
  }
);
export interface ITranslation extends Document {
  source: string;
  target: string;
  textsource: string;
  texttarget: string;
  user: IUser["_id"];
  createdAt: Date;
}

const translationSchema = new Schema<ITranslation>(
  {
    source: {
      required: true,
      type: String,
    },
    target: {
      required: true,
      type: String,
    },
    textsource: {
      required: true,
      type: String,
    },
    texttarget: {
      required: true,
      type: String,
    },
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Translation =
  mongoose.models.Translation || model<ITranslation>("Translation", translationSchema);

export const User =
  mongoose.models.User || model<IUser>("User", userSchema);
