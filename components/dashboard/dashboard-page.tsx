"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { TbArrowDownRight, TbArrowUpRight, TbDots, TbRefresh, TbDownload } from "react-icons/tb";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { announcements, chartData, indexCards, marketStats, movers, portfolioMetrics, recentTrades } from "@/data/mockData";
import type { CardSelection, MoversTab, TimeRange } from "@/types/market";
import { WatchlistPanel } from "@/components/watchlist/watchlist-panel";
import { NewsPanel } from "@/components/news/news-panel";

const timeRanges: TimeRange[] = ["1D", "1W", "1M", "3M", "YTD"];
const moverTabs: MoversTab[] = ["Gainers", "Losers", "Volume"];
const MarketChart = dynamic(
  () => import("@/components/dashboard/market-chart").then((module) => module.MarketChart),
  { ssr: false },
);

function ValueTrend({ direction }: { direction: "up" | "down" }) {
  return direction === "up" ? <TbArrowUpRight size={16} /> : <TbArrowDownRight size={16} />;
}

function ToneChip({ side }: { side: "Buy" | "Sell" }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        side === "Buy" ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"
      }`}
    >
      {side}
    </span>
  );
}

export function DashboardPage() {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("1D");
  const [selectedMoverTab, setSelectedMoverTab] = useState<MoversTab>("Gainers");
  const [selectedCard, setSelectedCard] = useState<CardSelection>("ASPI");

  const chartPoints = useMemo(() => chartData[selectedRange], [selectedRange]);
  const moverItems = useMemo(() => movers[selectedMoverTab], [selectedMoverTab]);

  const currentCard = useMemo(
    () => indexCards.find((card) => card.symbol === selectedCard) ?? indexCards[0],
    [selectedCard],
  );

  return (
    <DashboardShell
      rightPanel={
        <div className="space-y-4">
          <WatchlistPanel />
          <section className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Portfolio Snapshot</p>
                <h3 className="mt-1 text-lg font-semibold text-white">Live account summary</h3>
              </div>
              <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
                <TbRefresh size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {portfolioMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2.5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
                  <p className={`mt-1 text-base font-semibold ${metric.tone === "positive" ? "text-emerald-300" : metric.tone === "negative" ? "text-rose-300" : "text-white"}`}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
          <NewsPanel announcements={announcements} />
        </div>
      }
    >
      <div id="dashboard" className="space-y-5">
        <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Dashboard</p>
              <div className="mt-2 flex flex-wrap items-end gap-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white">Colombo Market Overview</h1>
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-200">
                  {new Intl.DateTimeFormat("en-LK", { dateStyle: "full", timeZone: "Asia/Colombo" }).format(new Date("2026-05-29T00:00:00+05:30"))}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white">
                <TbDownload size={16} />
                Export
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.3)] transition hover:bg-blue-500">
                New Order
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {indexCards.map((card) => {
            const active = currentCard.symbol === card.symbol;

            return (
              <button
                key={card.symbol}
                onClick={() => setSelectedCard(card.symbol)}
                className={`rounded-[24px] border p-4 text-left transition ${active ? "border-blue-500/45 bg-blue-500/10 shadow-[0_16px_40px_rgba(37,99,235,0.12)]" : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{card.label}</p>
                    <p className="mt-2 font-mono text-2xl font-semibold tracking-[0.04em] text-white">{card.value}</p>
                  </div>
                  <div className={`rounded-full p-2 ${card.direction === "up" ? "bg-emerald-500/15 text-emerald-300" : "bg-rose-500/15 text-rose-300"}`}>
                    <ValueTrend direction={card.direction} />
                  </div>
                </div>
                <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${card.direction === "up" ? "text-emerald-300" : "text-rose-300"}`}>
                  <span>{card.change}</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${card.direction === "up" ? "bg-gradient-to-r from-blue-500 to-emerald-400" : "bg-gradient-to-r from-rose-500 to-orange-400"}`}
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
              </button>
            );
          })}
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Market Trend</p>
                <h2 className="mt-1 text-xl font-semibold text-white">ASPI and S&amp;P SL20 movement</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition ${selectedRange === range ? "bg-blue-500 text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)]" : "text-slate-400 hover:text-white"}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 h-[340px]">
              <MarketChart data={chartPoints} />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Top Movers</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Intraday leadership board</h2>
              </div>
              <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
                <TbDots size={16} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {moverTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedMoverTab(tab)}
                  className={`rounded-full px-3 py-2 text-xs font-semibold tracking-[0.2em] transition ${selectedMoverTab === tab ? "bg-blue-500 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {moverItems.map((item) => (
                <article key={item.symbol} className="rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3 transition hover:border-blue-500/30 hover:bg-blue-500/8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-semibold tracking-[0.18em] text-white">{item.symbol}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] ${item.changeType === "gain" ? "bg-emerald-500/15 text-emerald-300" : item.changeType === "loss" ? "bg-rose-500/15 text-rose-300" : "bg-white/10 text-slate-300"}`}>
                          {item.changeType}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-300">{item.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-base text-white">{item.value}</p>
                      <p className={`font-mono text-sm ${item.changeType === "gain" ? "text-emerald-300" : "text-rose-300"}`}>{item.change}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Volume</span>
                    <span className="font-mono text-slate-300">{item.volume}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Market Statistics</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Session breadth and flow</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {marketStats.map((stat) => (
                <div key={stat.label} className="rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
                  <p className={`mt-2 text-lg font-semibold ${stat.emphasis === "positive" ? "text-emerald-300" : stat.emphasis === "negative" ? "text-rose-300" : "text-white"}`}>{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{stat.delta}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Recent Trades</p>
                <h2 className="mt-1 text-xl font-semibold text-white">Live tape activity</h2>
              </div>
              <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
                <TbRefresh size={16} />
              </button>
            </div>
            <div className="overflow-hidden rounded-[22px] border border-white/8 bg-[#0f1420]">
              <div className="grid grid-cols-[auto_1.4fr_auto_auto_auto] gap-3 border-b border-white/8 px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-slate-500">
                <span>Symbol</span>
                <span>Company</span>
                <span>Price</span>
                <span>Volume</span>
                <span>Side</span>
              </div>
              <div className="divide-y divide-white/6">
                {recentTrades.map((trade) => (
                  <div key={`${trade.symbol}-${trade.price}`} className="grid grid-cols-[auto_1.4fr_auto_auto_auto] gap-3 px-4 py-3 text-sm transition hover:bg-white/[0.03]">
                    <span className="font-mono font-semibold tracking-[0.18em] text-white">{trade.symbol}</span>
                    <span className="text-slate-300">{trade.company}</span>
                    <span className="font-mono text-slate-100">{trade.price}</span>
                    <span className="font-mono text-slate-400">{trade.volume}</span>
                    <ToneChip side={trade.side} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
