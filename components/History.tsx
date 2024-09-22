import {
  formatDateToTimeAgo,
  getAllLanguageNames,
  speakHistory,
} from '@/mongodb/functions';
import { ITranslation } from '@/mongodb/models/User';
import { auth } from '@clerk/nextjs/server';
import React from 'react';
import Timeago from './Timeago';
import Delete from './Delete';
import VolumeIcon from './Volume';

async function HistoryTranslation() {
  const { userId } = auth();

  // Construct the API URL based on the environment
  const url = `${
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.AZURE_URL
  }/api/translateHistory?userId=${userId}`;

  console.log("url->>>>>>>>>> ",url)
  // Fetch the history data with error handling
  let translations = [];
  try {
    const response = await fetch(url, {
      next: {
        tags: ['translationHistory'],
      },
    });

    // Check if the response is ok and has valid JSON
    if (response.ok) {
      translations = await response.json();
      console.log('translaaaaaaaaaaaaaatoioooo',translations,userId)

    } else {
      // Handle non-200 responses (e.g., 404, 500)
      console.error('Failed to fetch translations:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching translation history:', error);
  }

  // If translations is empty, render an empty state or message
  if (!translations || translations.length === 0) {
    return (
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-md mx-auto px-2 my-4">
        <h1 className="text-blue-700 mx-5 my-3 font-semibold text-xl md:text-2xl lg:text-3xl">
          History
        </h1>
        <p className="text-gray-500 mx-5 my-3">No translation history found.</p>
      </div>
    );
  }

  // Render the translation history
  return (
    <div className="max-w-6xl w-full bg-white rounded-lg shadow-md mx-auto px-2 my-4">
      <h1 className="text-blue-700 mx-5 my-3 font-semibold text-xl md:text-2xl lg:text-3xl">
        History
      </h1>
      {translations.map((translation: ITranslation, index: number) => (
        <div
          key={index}
          className="border hover:bg-blue-50 cursor-pointer border-gray-200 p-3 bg-white rounded-xl my-1 flex justify-between items-center"
        >
          <div className="mx-2 flex flex-col gap-1">
            <div className="text-gray-500 text-md text-left">
              {getAllLanguageNames(translation.source) +
                ' -> ' +
                getAllLanguageNames(translation.target)}
            </div>
            <h1 className="text-blue-800 font-semibold text-lg">
              {translation.textsource}
            </h1>
            <h1 className="text-gray-800 text-lg">{translation.texttarget}</h1>
          </div>
          <div className="flex items-center justify-start gap-6 mx-2">
            <div className="flex flex-col items-end justify-between h-full gap-4">
              <div className="text-gray-400">
                <Timeago date={translation.createdAt} />
              </div>
              <div className="flex items-center gap-6 md:gap-8">
                <VolumeIcon value={translation.texttarget} />
                <Delete id={translation._id as string} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryTranslation;
