"use server";
import prismadb from "@/lib/prismaDB";
import { getServerSession } from "next-auth";
import { HomepageCta, Role } from "@prisma/client";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function updateCta(cta: Pick<HomepageCta, "id" | "title" | "subtitle" | "button1Text" | "button1Link" | "button2Text" | "button2Link">[]) {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (!session || session.user.role !== Role.ADMIN) throw new Error("Unauthorized");
  for (const c of cta) {
    await prismadb.homepageCta.update({
      where: { id: c.id },
      data: {
        title: c.title,
        subtitle: c.subtitle,
        button1Text: c.button1Text,
        button1Link: c.button1Link,
        button2Text: c.button2Text,
        button2Link: c.button2Link,
      },
    });
  }
  return { success: true };
} 