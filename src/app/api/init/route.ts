import {
  getCommonWebsite,
  getCountryAbbIds,
  getSearchKey,
  getWebsiteSettings,
} from "@/server/action";
import { NextResponse } from "next/server";

// Handles GET requests to /api
export async function GET(request: Request) {
  try {
    const settings = await getWebsiteSettings();
    const country = await getCountryAbbIds();
    const commonWebsite = await getCommonWebsite();
    const searchKeyWords = await getSearchKey();
    return NextResponse.json({
      status: 200,
      msg: "ok",
      settings,
      country,
      commonWebsite,
      searchKeyWords,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
