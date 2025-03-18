import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const searchParams = req.nextUrl.searchParams;
    // const lat = searchParams.get("lat");
    // const lon = searchParams.get("lon");

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const lat = 11.4592;
    const lon = 104.9447;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error in getting pollution data (backend): ", error);
    return new Response("Error in fetching pollution data from backend ", { status: 500 });
  }
}