// File: /mongodb/functions.ts

import mongoose from "mongoose";
import { User, Translation, IUser, ITranslation } from "./models/User";
import ConnectDB from "./db";

export async function addTranslation(
  userId: string,
  translationData: {
    source: string;
    target: string;
    textsource: string;
    texttarget: string;
  }
): Promise<ITranslation> {
  try {
    await ConnectDB();

    let user = await User.findOne({ userID: userId });

    if (!user) {
      user = new User({ userID: userId });
      await user.save();
    }

    const newTranslation = new Translation({
      source: translationData.source,
      target: translationData.target,
      textsource: translationData.textsource,
      texttarget: translationData.texttarget,
      user: user._id,
      createdAt: new Date(),
    });

    const savedTranslation = await newTranslation.save();

    await User.findByIdAndUpdate(user._id, {
      $push: { translations: savedTranslation._id },
    });

    return savedTranslation;
  } catch (error) {
    console.error("Error in addTranslation:", error);
    throw error;
  }
}

export async function fetchUserTranslations(
  userID: string
): Promise<ITranslation[]> {
  try {
    await ConnectDB();
    const user: IUser | null = await User.findOne({ userID }).populate({
      path: "translations",
      options: { sort: { createdAt: -1 } }, // Sort translations by creation date, newest first
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.translations as ITranslation[];
  } catch (error) {
    console.error("Error fetching user translations:", error);
    throw error;
  }
}

export function getAllLanguageNames(code: string) {
  // Create a DisplayNames object to get language names
  const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
  const language = languageNames.of(code);
  return language || "Unknown Language";
}

export function formatDateToTimeAgo(dateString: Date) {
  const date = new Date(dateString);

  // Extract components of the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format date to 'YYYY-MM-DD HH:mm:ss'
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Function to remove a translation from a user's history and delete the translation record
const removeTranslation = async (id: string, userId: string) => {
  try {
    await ConnectDB();
    console.log(id, "idddddddddd");
    // Convert IDs to Mongoose ObjectId if they are in string format
    const translationObjectId = id;
    const userObjectId = userId;

    // Find the user and check if the translationId is in their translations array
    const user = await User.findOne({ userID: userObjectId });

    console.log(user, "uuuuuuuuuuuu");
    if (!user || !user.translations.includes(translationObjectId)) {
      console.log("user islam");
      return {
        success: false,
        message: "Translation ID not found in user's translations",
      };
    }

    console.log("useeeeeeeeeeeeeeer");
    // Remove the translation from the user's translations array
    await User.updateOne(
      { userID: userObjectId },
      { $pull: { translations: translationObjectId } }
    );

    console.log("tifani");

    // Delete the translation record from the database
    await Translation.findByIdAndDelete(translationObjectId);

    return { success: true, message: "Translation removed successfully" };
  } catch (error) {
    console.error("Error removing translation:", error);
    return { success: false, message: "Error removing translation" };
  }
};
export default removeTranslation;

export function speakHistory(targetValue: string) {
  console.log("speaaaaaaaak");
  const synth = window.speechSynthesis;
  if (!synth) return;

  const utterance = new SpeechSynthesisUtterance(targetValue);
  synth.speak(utterance);
}
