import { omitProperty } from "@/lib/utils";
import { getWebsiteSettings } from "@/server/action";
import { NextResponse } from "next/server";

// Handles GET requests to /api
export async function GET(request: Request) {
  const settings = await getWebsiteSettings();
  return NextResponse.json(omitProperty(settings!, "id"));
}
