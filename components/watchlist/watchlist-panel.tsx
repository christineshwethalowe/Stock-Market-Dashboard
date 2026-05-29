import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";
import { watchlist } from "@/data/mockData";

export function WatchlistPanel() {
  return (
    <section className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Watchlist</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Tracked symbols</h3>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-400">
          5 stocks
        </span>
      </div>
      <div className="space-y-2">
        {watchlist.map((item) => (
          <article key={item.symbol} className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2.5 transition hover:border-blue-500/30 hover:bg-blue-500/8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-semibold tracking-[0.18em] text-white">{item.symbol}</span>
                  <span className="text-xs text-slate-500">{item.sector}</span>
                </div>
                <p className="mt-1 text-sm text-slate-300">{item.price}</p>
              </div>
              <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${item.changeType === "gain" ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
                {item.changeType === "gain" ? <TbTrendingUp size={14} /> : <TbTrendingDown size={14} />}
                <span>{item.change}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
