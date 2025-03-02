import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized", status: 401 });

    const {
      title,
      description,
      date,
      completed,
      important
    } = await req.json();

    if (!title || !description || !date)
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      })

    if (title.length < 3)
      return NextResponse.json({
        error: "Tittle must be at least 3 characters long.",
        status: 400,
      })

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      }
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("Error in creating task: ", error);
    return NextResponse.json({ error: "Error in creating task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized", status: 401 });

  } catch (error) {
    console.log("Error in creating task: ", error);
    return NextResponse.json({ error: "Error in updating task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId)
      return NextResponse.json({ error: "Unauthorized", status: 401 });

  } catch (error) {
    console.log("Error in deleting task", error);
    return NextResponse.json({ error: "Error in deleting task", status: 500 });
  }
}