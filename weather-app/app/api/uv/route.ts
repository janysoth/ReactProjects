import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const searchParams = req.nextUrl.searchParams;
    // const lat = searchParams.get("lat");
    // const lon = searchParams.get("lon");

    const lat = 11.4592;
    const lon = 104.9447;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error) {
    console.log("Error in Getting UV Data from endpoint.");

    return new Response("Error in  Getting UV Data from endpoint", { status: 500 })
  }
}