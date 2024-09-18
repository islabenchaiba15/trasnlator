import React from 'react';
import { MessageCircle, Menu, User } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import TranslateForm from '@/components/TranslateForm';
import HistoryTranslation from '@/components/History';

const TranslatePage = async() => {
    const languagesEndpoint = 
  "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0";

const response = await fetch(languagesEndpoint, {
  next: {
    revalidate: 60 * 60 * 24, // cache the results for 24 hours and then refresh
  },
  
}
);
const languages=await response.json()
// console.log(languages)

  return (
    <div className=" flex flex-col justify-star">
   <TranslateForm languages={languages}/>
   <HistoryTranslation/>
  </div>
  );
};

export default TranslatePage;