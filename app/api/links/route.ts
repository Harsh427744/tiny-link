import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(links);
}

export async function POST(req: Request) {
  try {
    // Detect if the request is form submission
    let url: string | null = null;
    let code: string | null = null;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      url = body.url;
      code = body.code;
    } else {
      const form = await req.formData();
      url = form.get("url") as string;
      code = form.get("code") as string | null;
    }

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Auto-generate random 6-character code if none
    if (!code || code.trim() === "") {
      code = Math.random().toString(36).substring(2, 8);
    }

    // Check for duplicates
    const existing = await prisma.link.findUnique({ where: { code } });
    if (existing) {
      return NextResponse.json(
        { error: "Code already exists" },
        { status: 409 }
      );
    }

    // Create link
    const link = await prisma.link.create({
      data: { code, targetUrl: url },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (e) {
    console.error("Error creating link", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
