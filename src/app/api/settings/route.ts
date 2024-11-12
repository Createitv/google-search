import { updateWebsiteSettings } from "@/server/action";
import { WebSiteSettings } from "@prisma/client";
import { NextResponse } from "next/server";

// Handles GET requests to /api
export async function POST(request: Request) {
  const body: WebSiteSettings = await request.json();
  try {
    console.log("req", body);
    const updataWebsiteRes = await updateWebsiteSettings(body);
    console.log("web res", updataWebsiteRes);
    if (updataWebsiteRes.status === "ok") {
      return NextResponse.json({
        ...updataWebsiteRes,
      });
    } else {
      return NextResponse.json({
        code: 300,
        status: "error",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
