import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ code: string }>;
};

export default async function CodeStatsPage({ params }: PageProps) {
  const { code } = await params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <h1 className="text-xl font-semibold mb-1">
          Stats for <span className="text-sky-400">{link.code}</span>
        </h1>
        <p className="text-sm text-slate-400 break-all">
          Target URL:
          <br />
          <span className="text-slate-100">{link.targetUrl}</span>
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <div className="text-xs text-slate-400">Total clicks</div>
            <div className="text-lg font-semibold">{link.totalClicks}</div>
          </div>
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3">
            <div className="text-xs text-slate-400">Last clicked</div>
            <div className="text-sm">
              {link.lastClickedAt
                ? new Date(link.lastClickedAt).toLocaleString()
                : "Never"}
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 space-y-1">
          <div>
            Created at: {new Date(link.createdAt).toLocaleString()}
          </div>
          <div>
            Updated at: {new Date(link.updatedAt).toLocaleString()}
          </div>
        </div>

        <a
          href="/"
          className="inline-flex mt-2 text-sm text-sky-400 hover:text-sky-300"
        >
          ← Back to dashboard
        </a>
      </div>
    </div>
  );
}
