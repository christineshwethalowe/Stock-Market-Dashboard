import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";
import { watchlist } from "@/data/mockData";

export function WatchlistPanel() {
  return (
    <section className="market-panel rounded-[22px] p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="market-eyebrow">Watchlist</p>
          <h3 className="market-heading mt-1 text-lg">Tracked symbols</h3>
        </div>
        <span className="pill pill-blue px-2.5 py-1 text-[11px] uppercase tracking-[0.22em]">
          5 stocks
        </span>
      </div>
      <div className="space-y-2">
        {watchlist.map((item) => (
          <article key={item.symbol} className="market-subpanel rounded-2xl px-3 py-2.5 transition hover:border-blue-400 hover:bg-blue-50">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="market-mono text-base font-semibold text-blue-900">{item.symbol}</span>
                  <span className="text-xs text-slate-500">{item.sector}</span>
                </div>
                <p className="market-mono mt-1 text-sm text-slate-700">{item.price}</p>
              </div>
              <div className={`pill inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold ${item.changeType === "gain" ? "pill-positive" : "pill-negative"}`}>
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
