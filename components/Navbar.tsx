import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

function Navbar() {
  const {userId} = auth();
  return (
    <div className="w-full bg-white">
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center py-2">
      <Image src={"/reverso.png"} alt={"reverso"} width={130} height={50} />
      <div className="">
        {userId ? (
          <SignedIn>
            <UserButton />
          </SignedIn>
        ) : (
          <SignedOut>
            <SignInButton forceRedirectUrl={"/translate"} mode="modal"/>
          </SignedOut>
        )}
      </div>
    </div>
    </div>
  );
}

export default Navbar;
