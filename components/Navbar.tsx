import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

function Navbar() {
  const { userId } = auth();
  return (
    <div className="w-full bg-white">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center py-4">
        <Image
          priority
          src={"/reverso.png"}
          alt={"reverso"}
          width={130}
          height={50}
          className=" w-auto h-auto"

        />
        <div className="">
          {userId ? (
            <SignedIn>
              <UserButton />
            </SignedIn>
          ) : (
              <SignInButton forceRedirectUrl={"/translate"} >
                <Button size="sm" className="bg-blue-900" >Sign in</Button>
              </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
