import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

  } catch (error) {
    console.log("Error in creating task: ", error);
    return NextResponse.json({ error: "Error in creating task", status: 500 });
  }
}