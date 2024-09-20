import { Button } from "@/components/ui/button";
import {
  CheckCheckIcon,
  Languages,
  LetterText,
  LockKeyholeOpenIcon,
  SearchCheck,
  SpellCheck,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto border-t border-gray-300 bg-white">
      <div className="md:p-10 p-5">
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-black text-center font-semibold ">
          understand the world and communicate across your languages
        </h1>
        <div className="bg-yellow-50 my-10 p-4 rounded-xl flex items-center justify-between">
          <div className="md:w-1/2 w-full flex flex-col gap-3">
            <h1 className="text-xl font-semibold text-amber-700">
              REVERSO PREMIUM IS COMING
            </h1>
            <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
              Fast & accurate traduction. Powerful features are coming ...
            </h1>
            <div className="flex gap-4 items-center">
              <LetterText color="#fbc756" size={28} />
              <p className=" text-xl">Translate longer texts</p>
            </div>
            <div className="flex gap-4 items-center">
              <Languages color="#db9600" size={28} />
              <p className=" text-xl">
                Translate documents in one click
                <span className="text-gray-400">
                  {" "}
                  Word, PDF, PowerPoint, 12+
                </span>
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <SpellCheck color="#db9600" size={28} />
              <p className=" text-xl">
                Correct and Rephrase unlimited text with AI
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <LockKeyholeOpenIcon color="#fbc756" size={28} />
              <p className=" text-xl">
                Enjoy Premium across all reverso products
              </p>
            </div>
            <Link href="/translate">
              <Button
                className="bg-amber-400 p-7 text-xl w-full mt-10 mb-5 md:w-2/3 "
              >
                try now the basic
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2 hidden md:inline-block">
            <Image
              src={"/premium-promo.svg"}
              alt={"reverso"}
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="">
          <h1 className="text-black font-bold text-center text-2xl md:text-3xl">
            The World’s Most Advanced AI Translator <br />
            <span className="space-y-3 text-gray-400 font-normal text-2xl md:text-3xl">
              {" "}
              in French, Spanish, German, Russian, and many more.
            </span>
          </h1>
        </div>
        <div className="my-10 grid md:grid-cols-2 gap-3 cursor-pointer">
          <div className="p-5 border rounded-xl border-gray-400 flex flex-col gap-3 hover:bg-blue-50 cursor-pointer">
            <div className="flex gap-3 items-center">
              <LetterText color="#389fff" size={28} />
              <h1 className="text-xl font-bold text-blue-400">
                Document Translation
              </h1>
            </div>
            <p className="text-black text-lg md:text-xl">
              Instantly translate documents while keeping their layout.
              Translate Word, PDF, PowerPoint, Excel... in 25+ languages.
            </p>
          </div>
          <div className="p-5 border rounded-xl border-gray-400 flex flex-col gap-3 hover:bg-blue-50 cursor-pointer">
            <div className="flex gap-3 items-center">
              <SearchCheck color="#389fff" size={28} />
              <h1 className="text-xl font-bold text-blue-400">Quick Lookup</h1>
            </div>
            <p className="text-black text-lg md:text-xl">
              Use the integrated dictionaries to fine-tune your translation:
              synonyms in one click and translations with examples in context.
            </p>
          </div>
          <div className="p-5 border rounded-xl border-gray-400 flex flex-col gap-3 hover:bg-blue-50 cursor-pointer">
            <div className="flex gap-3 items-center">
              <CheckCheckIcon color="#389fff" size={28} />
              <h1 className="text-xl font-bold text-blue-400">
                Integrated Grammar Check
              </h1>
            </div>
            <p className="text-black text-lg md:text-xl">
              Your original texts are automatically revised with an AI-based
              spell-checker, resulting in a higher-quality translation.
            </p>
          </div>
          <div className="p-5 border rounded-xl border-gray-400 flex flex-col gap-3 hover:bg-blue-50 cursor-pointer">
            <div className="flex gap-3 items-center">
              <Volume2 color="#389fff" size={28} />
              <h1 className="text-xl font-bold text-blue-400">Pronunciation</h1>
            </div>
            <p className="text-black text-lg md:text-xl ">
              Listen to how texts are being pronounced by native speakers to
              improve your oral skills.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
