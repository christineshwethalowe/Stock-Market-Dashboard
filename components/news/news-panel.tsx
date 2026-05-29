import type { Announcement } from "@/types/market";

interface NewsPanelProps {
  announcements: Announcement[];
}

function announcementPillTone(category: string) {
  const normalized = category.toLowerCase();

  if (normalized === "results") {
    return "pill-positive";
  }

  if (normalized === "policy") {
    return "pill-amber";
  }

  if (normalized === "market") {
    return "pill-blue";
  }

  return "pill-neutral";
}

export function NewsPanel({ announcements }: NewsPanelProps) {
  return (
    <section className="market-panel rounded-[22px] p-4">
      <div className="mb-4">
        <p className="market-eyebrow">Latest Announcements</p>
        <h3 className="market-heading mt-1 text-lg">News feed</h3>
      </div>
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <article key={`${announcement.category}-${announcement.headline}`} className="market-subpanel group rounded-2xl px-3 py-3 transition hover:border-blue-400 hover:bg-blue-50">
            <div className="flex items-center justify-between gap-3">
              <span className={`pill px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] transition ${announcementPillTone(announcement.category)}`}>
                {announcement.category}
              </span>
              <span className="text-xs text-slate-500 transition group-hover:text-slate-600">{announcement.time}</span>
            </div>
            <p className="market-subheading mt-2 leading-6 transition group-hover:text-blue-800">{announcement.headline}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
