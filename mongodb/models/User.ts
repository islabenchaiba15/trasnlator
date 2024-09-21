import mongoose, { Document, Schema } from 'mongoose';

// Translation Interface
export interface ITranslation extends Document {
  source: string;
  target: string;
  textsource: string;
  texttarget: string;
  user: IUser['_id'];
  createdAt: Date;
}

// Translation Schema
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
      ref: 'User',
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

// User Interface
export interface IUser extends Document {
  userID: string;
  translations: ITranslation[];
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    userID: {
      required: true,
      type: String,
      unique: true,
    },
    translations: {
      type: [Schema.Types.ObjectId],
      ref: 'Translation',
    },
  },
  {
    timestamps: true,
  }
);

// Correct Model Registration to Avoid Re-Definition Errors
export const Translation = mongoose.models.Translation || mongoose.model<ITranslation>('Translation', translationSchema);

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);