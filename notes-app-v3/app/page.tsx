import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Tasks from "./Components/Tasks";

export default async function Home() {
  const { userId } = await auth();

  if (!userId)
    redirect("/signin");

  return (
    <Tasks />
  );
}

