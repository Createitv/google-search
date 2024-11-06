import { NewProduct } from "@/components/editable-table";
import { addCommonWebsite, getCommonWebsite } from "@/server/action";
import { NextResponse } from "next/server";

// Handles GET requests to /api
export async function GET(request: Request) {
  try {
    console.log("req", request.url);
    const commonWebsite = await getCommonWebsite();
    console.log("c", commonWebsite);
    return NextResponse.json({
      commonWebsite,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}

export async function POST(request: Request) {
  const body: NewProduct = await request.json();
  try {
    console.log("req", request.url);
    const addWebsiteRes = await addCommonWebsite(body);
    console.log("c", addWebsiteRes);
    return NextResponse.json({
      addWebsiteRes,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
