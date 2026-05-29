import type { Announcement } from "@/types/market";

interface NewsPanelProps {
  announcements: Announcement[];
}

export function NewsPanel({ announcements }: NewsPanelProps) {
  return (
    <section className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-sm">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Latest Announcements</p>
        <h3 className="mt-1 text-lg font-semibold text-white">News feed</h3>
      </div>
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <article key={`${announcement.category}-${announcement.headline}`} className="group rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3 transition hover:border-blue-500/30 hover:bg-blue-500/8">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200 transition group-hover:border-blue-400/30 group-hover:bg-blue-500/15">
                {announcement.category}
              </span>
              <span className="text-xs text-slate-500 transition group-hover:text-slate-400">{announcement.time}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-200 transition group-hover:text-white">{announcement.headline}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
