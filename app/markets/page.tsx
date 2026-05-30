"use client";

import { TbArrowDownRight, TbArrowUpRight } from "react-icons/tb";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { indexCards, marketStats } from "@/data/mockData";
import type { MarketStat } from "@/types/market";

function ValueTrend({ direction }: { direction: "up" | "down" }) {
  return direction === "up" ? <TbArrowUpRight size={16} /> : <TbArrowDownRight size={16} />;
}

function MarketValueRow({ label, value, change, direction }: { label: string; value: string; change: string; direction: "up" | "down" }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[20px] border border-[rgba(45,78,133,0.28)] bg-white px-4 py-3">
      <div>
        <p className="market-eyebrow">{label}</p>
        <p className="market-mono mt-2 text-2xl font-semibold text-blue-900">{value}</p>
      </div>
      <div className={`flex items-center gap-2 text-sm font-medium ${direction === "up" ? "text-emerald-700" : "text-rose-700"}`}>
        <ValueTrend direction={direction} />
        <span>{change}</span>
      </div>
    </div>
  );
}

export default function MarketsPage() {
  const listItems = indexCards;

  return (
    <DashboardShell rightPanel={<div />}>
      <div className="space-y-5">
        <section className="market-panel rounded-[28px] p-5">
          <p className="market-eyebrow">Markets</p>
          <h1 className="market-heading mt-2 text-3xl">Market list</h1>
          <p className="mt-2 text-sm text-slate-600">
            Simple market list view with normal values.
          </p>
        </section>

        <section className="market-panel rounded-[28px] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="market-eyebrow">Market Values</p>
              <h2 className="market-heading mt-1 text-xl">Current index list</h2>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {listItems.map((item) => (
              <MarketValueRow
                key={item.symbol}
                label={item.label}
                value={item.value}
                change={item.change}
                direction={item.direction}
              />
            ))}
          </div>
        </section>

        <section className="market-panel rounded-[28px] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="market-eyebrow">Breadth</p>
              <h2 className="market-heading mt-1 text-xl">Normal value summary</h2>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {marketStats.map((stat: MarketStat) => (
              <div key={stat.label} className="flex items-center justify-between gap-4 rounded-[20px] border border-[rgba(45,78,133,0.28)] bg-white px-4 py-3">
                <div>
                  <p className="market-eyebrow">{stat.label}</p>
                  <p className="market-mono mt-2 text-2xl font-semibold text-blue-900">{stat.value}</p>
                </div>
                <p className="text-sm text-slate-500">{stat.delta}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}