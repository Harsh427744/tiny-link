import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, context: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await context.params;

    const link = await prisma.link.findUnique({
      where: { code },
    });

    // If already deleted → return 404 silently, not an error
    if (!link) {
      return Response.json({ ok: true, message: "Already deleted" }, { status: 200 });
    }

    await prisma.link.delete({
      where: { code },
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error("Delete error:", e);
    return Response.json({ error: "Server failed" }, { status: 500 });
  }
}
