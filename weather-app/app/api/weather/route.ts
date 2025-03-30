import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const searchParams = req.nextUrl.searchParams;

    // const lat = searchParams.get("lat");
    // const lon = searchParams.get("lon");

    const lat = 53.4800;
    const lon = -2.2400;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const res = await axios.get(url);
    console.log(res.data)

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error in fetching forecast data.");

    return new Response("Error in fetching forecast data", { status: 500 });
  }
}