import { DashboardShell } from "@/components/layout/dashboard-shell";
import { NewsPanel } from "@/components/news/news-panel";
import { announcements, marketStats } from "@/data/mockData";

const alertRules = [
  {
    name: "Price breakout",
    symbol: "JKH",
    condition: "> LKR 215.00",
    status: "Watching",
    tone: "positive",
  },
  {
    name: "Volume spike",
    symbol: "DIAL",
    condition: "> 3.0M shares",
    status: "Triggered",
    tone: "positive",
  },
  {
    name: "Downside guard",
    symbol: "LIOC",
    condition: "< LKR 90.00",
    status: "Armed",
    tone: "negative",
  },
  {
    name: "Market breadth",
    symbol: "ASPI",
    condition: "Decliners > Advancers",
    status: "Muted",
    tone: "neutral",
  },
] as const;

const alertFeed = [
  {
    title: "JKH crossed intraday threshold",
    detail: "Price is within 1.2% of the configured upper band.",
    time: "3 min ago",
    tone: "positive",
  },
  {
    title: "DIAL volume alert fired",
    detail: "Heavy tape activity confirmed across two consecutive windows.",
    time: "18 min ago",
    tone: "positive",
  },
  {
    title: "LIOC drawdown guard armed",
    detail: "Alert is waiting for downside confirmation before notifying.",
    time: "42 min ago",
    tone: "negative",
  },
  {
    title: "Foreign flow watch updated",
    detail: "Net buying stayed positive, so the macro watchlist remains live.",
    time: "Today",
    tone: "neutral",
  },
] as const;

function ToneBadge({ tone }: { tone: "positive" | "negative" | "neutral" }) {
  return (
    <span
      className={`pill px-2.5 py-1 text-[11px] font-semibold ${
        tone === "positive" ? "pill-positive" : tone === "negative" ? "pill-negative" : "pill-blue"
      }`}
    >
      {tone}
    </span>
  );
}

export default function AlertsPage() {
  return (
    <DashboardShell
      rightPanel={
        <div className="space-y-4">
          <section className="market-panel rounded-[22px] p-4">
            <p className="market-eyebrow">Alert Channels</p>
            <h3 className="market-heading mt-1 text-lg">Delivery status</h3>
            <div className="mt-4 space-y-3">
              {[
                ["Push notifications", "Enabled"],
                ["Email digest", "8:30 PM"],
                ["SMS escalation", "Manual"],
              ].map(([label, value]) => (
                <div key={label} className="market-subpanel rounded-2xl px-3 py-2.5">
                  <p className="market-eyebrow">{label}</p>
                  <p className="market-mono mt-1 text-base font-semibold text-blue-900">{value}</p>
                </div>
              ))}
            </div>
          </section>

          <NewsPanel announcements={announcements} />
        </div>
      }
    >
      <div className="space-y-5">
        <section className="market-panel rounded-[28px] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="market-eyebrow">Alerts</p>
              <h1 className="market-heading mt-2 text-3xl">Signal center</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Track price, volume, and market-breadth triggers in one place. These alert panels are wired for the markets page and can be extended into live rules later.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="market-subpanel rounded-[20px] px-4 py-3">
                <p className="market-eyebrow">Active</p>
                <p className="market-mono mt-2 text-lg font-semibold text-blue-900">24</p>
              </div>
              <div className="market-subpanel rounded-[20px] px-4 py-3">
                <p className="market-eyebrow">Triggered</p>
                <p className="market-mono mt-2 text-lg font-semibold text-emerald-700">8</p>
              </div>
              <div className="market-subpanel rounded-[20px] px-4 py-3">
                <p className="market-eyebrow">Muted</p>
                <p className="market-mono mt-2 text-lg font-semibold text-slate-700">5</p>
              </div>
              <div className="market-subpanel rounded-[20px] px-4 py-3">
                <p className="market-eyebrow">Channels</p>
                <p className="market-mono mt-2 text-lg font-semibold text-blue-900">3</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
          <div className="market-panel rounded-[28px] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="market-eyebrow">Rule Set</p>
                <h2 className="market-heading mt-1 text-xl">Configured alerts</h2>
              </div>
              <span className="pill pill-blue px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">Live</span>
            </div>

            <div className="mt-4 space-y-3">
              {alertRules.map((rule) => (
                <article key={`${rule.symbol}-${rule.name}`} className="market-subpanel rounded-[22px] px-4 py-3">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="market-mono text-base font-semibold text-blue-900">{rule.symbol}</p>
                      <h3 className="market-subheading mt-1">{rule.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">Condition: {rule.condition}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <ToneBadge tone={rule.tone} />
                      <span className="pill pill-neutral px-2.5 py-1 text-[11px] font-semibold">{rule.status}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="market-panel rounded-[28px] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="market-eyebrow">Breadth Check</p>
                <h2 className="market-heading mt-1 text-xl">Market state summary</h2>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {marketStats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="market-subpanel rounded-[20px] px-4 py-3">
                  <p className="market-eyebrow">{stat.label}</p>
                  <p className={`market-mono mt-2 text-lg font-semibold ${stat.emphasis === "positive" ? "text-emerald-700" : stat.emphasis === "negative" ? "text-rose-700" : "text-blue-900"}`}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{stat.delta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="market-panel rounded-[28px] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="market-eyebrow">Notification Feed</p>
              <h2 className="market-heading mt-1 text-xl">Recent alert activity</h2>
            </div>
            <button className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
              Manage rules
            </button>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {alertFeed.map((item) => (
              <article key={item.title} className="market-subpanel rounded-[22px] px-4 py-3 transition hover:border-blue-400 hover:bg-blue-50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="market-subheading leading-6">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                  </div>
                  <ToneBadge tone={item.tone} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-400">{item.time}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}