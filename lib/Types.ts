export type LanguageData = {
    translation: {
      [languageCode: string]: {
        name: string;
        nativeName: string;
        dir: 'ltr' | 'rtl';
      };
    };
  };

  export type TranslationData = {
    source: string;
    target: string;
    textsource: string;
    texttarget: string;
  };
  
