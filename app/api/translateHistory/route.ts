import { fetchUserTranslations } from "@/mongodb/functions";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log("staaaaaart")
    const searchParams =req.nextUrl.searchParams
    const userId=searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }    
    const translations=await fetchUserTranslations(userId!)
    return NextResponse.json(translations);
  }
