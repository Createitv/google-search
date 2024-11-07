import { NewProduct } from "@/components/editable-table";
import {
  addCommonWebsite,
  deleteCommonWebsite,
  getCommonWebsite,
  updateCommonWebsite,
} from "@/server/action";
import { CommonWebsite } from "@prisma/client";
import { NextResponse } from "next/server";

// Handles GET requests to /api
export async function GET(request: Request) {
  try {
    // console.log("req", request.url);
    const commonWebsite = await getCommonWebsite();
    // console.log("c", commonWebsite);
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
    // console.log("req", request.url);
    const addWebsiteRes = await addCommonWebsite(body);
    // console.log("c", addWebsiteRes);
    return NextResponse.json({
      addWebsiteRes,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}

export async function DELETE(request: Request) {
  const body: string[] = await request.json();
  let output: any[] = [];
  try {
    body.forEach(async (id) => {
      const deleteWebsiteRes = await deleteCommonWebsite(id);
      output.push(deleteWebsiteRes);
    });
    return NextResponse.json({
      status: "ok",
      code: 200,
      output,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}

export async function PUT(request: Request) {
  const option: CommonWebsite = await request.json();
  try {
    const deleteWebsiteRes = await updateCommonWebsite(option);
    if (deleteWebsiteRes.status === "ok") {
      return NextResponse.json({
        status: "ok",
        code: 200,
        deleteWebsiteRes,
      });
    } else {
      return NextResponse.json({
        status: "error",
        code: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}