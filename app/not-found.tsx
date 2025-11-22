export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="bg-slate-900 border border-slate-700 rounded-xl px-8 py-6 text-center text-slate-100 shadow-lg">
        <h1 className="text-2xl font-semibold mb-2">Link not found</h1>
        <p className="text-slate-400">
          The short code you tried to access does not exist or has been deleted.
        </p>
      </div>
    </div>
  );
}
