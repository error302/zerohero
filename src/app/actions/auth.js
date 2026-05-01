"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function loginAsStudent(formData) {
  const name = formData.get("name") || "Student";
  
  // Find or create student
  let user = await prisma.user.findFirst({
    where: { name: name, role: "STUDENT" }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: name,
        role: "STUDENT"
      }
    });
  }

  // Await the cookies() function in Next.js 15+
  const cookieStore = await cookies();
  cookieStore.set("userId", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");
  redirect("/login");
}
