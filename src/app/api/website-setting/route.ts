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
    return NextResponse.json({
      status: 200,
      msg: "ok",
      settings,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
