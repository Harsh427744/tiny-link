import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ code: string }>;
};

export default async function RedirectPage({ params }: PageProps) {
  const { code } = await params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    // HTTP 404 so tests can detect "not found"
    notFound();
  }

  await prisma.link.update({
    where: { code },
    data: {
      totalClicks: link.totalClicks + 1,
      lastClickedAt: new Date(),
    },
  });

  redirect(link.targetUrl);
}
