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
      className={`pill inline-flex px-2.5 py-1 text-[11px] font-semibold ${
        side === "Buy" ? "pill-positive" : "pill-negative"
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
          <section className="market-panel rounded-[22px] p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="market-eyebrow">Portfolio Snapshot</p>
                <h3 className="market-heading mt-1 text-lg">Live account summary</h3>
              </div>
              <button className="rounded-full border border-blue-200 bg-white p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700">
                <TbRefresh size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {portfolioMetrics.map((metric) => (
                <div key={metric.label} className="market-subpanel rounded-2xl px-3 py-2.5">
                  <p className="market-eyebrow">{metric.label}</p>
                  <p className={`market-mono mt-1 text-base font-semibold ${metric.tone === "positive" ? "text-emerald-700" : metric.tone === "negative" ? "text-rose-700" : "text-blue-900"}`}>
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
        <section className="market-panel rounded-[28px] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="market-eyebrow">Dashboard</p>
              <div className="mt-2 flex flex-wrap items-end gap-3">
                <h1 className="market-heading text-3xl">LK Stock Market Overview</h1>
                <span className="pill pill-blue px-3 py-1 text-xs font-medium">
                  {new Intl.DateTimeFormat("en-LK", { dateStyle: "full", timeZone: "Asia/Colombo" }).format(new Date("2026-05-29T00:00:00+05:30"))}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
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
                className={`rounded-[24px] border p-4 text-left transition ${active ? "border-blue-500 bg-blue-50 shadow-[0_16px_40px_rgba(37,99,235,0.14)]" : "border-[rgba(45,78,133,0.28)] bg-white hover:border-blue-400 hover:bg-blue-50/40"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="market-eyebrow">{card.label}</p>
                    <p className="market-mono mt-2 text-2xl font-semibold text-blue-900">{card.value}</p>
                  </div>
                  <div className={`rounded-full p-2 ${card.direction === "up" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                    <ValueTrend direction={card.direction} />
                  </div>
                </div>
                <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${card.direction === "up" ? "text-emerald-700" : "text-rose-700"}`}>
                  <span>{card.change}</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100">
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
          <div className="market-panel rounded-[28px] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="market-eyebrow">Market Trend</p>
                <h2 className="market-heading mt-1 text-xl">ASPI and S&amp;P SL20 movement</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`pill rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition ${selectedRange === range ? "border-blue-600 bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.25)]" : "pill-neutral hover:border-blue-300 hover:text-blue-700"}`}
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

          <div className="market-panel rounded-[28px] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="market-eyebrow">Top Movers</p>
                <h2 className="market-heading mt-1 text-xl">Intraday leadership board</h2>
              </div>
              <button className="rounded-full border border-blue-200 bg-white p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700">
                <TbDots size={16} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-full border border-blue-200 bg-blue-50/70 p-1">
              {moverTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedMoverTab(tab)}
                    className={`pill rounded-full px-3 py-2 text-xs font-semibold tracking-[0.2em] transition ${
                      selectedMoverTab === tab
                        ? tab === "Gainers"
                          ? "pill-positive"
                          : tab === "Losers"
                            ? "pill-negative"
                            : "pill-blue"
                        : "pill-neutral hover:border-blue-300 hover:text-blue-700"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-4 space-y-3">
              {moverItems.map((item) => (
                <article key={item.symbol} className="market-subpanel rounded-[20px] px-4 py-3 transition hover:border-blue-400 hover:bg-blue-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="market-mono text-base font-semibold text-blue-900">{item.symbol}</span>
                        <span className={`pill px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] ${item.changeType === "gain" ? "pill-positive" : item.changeType === "loss" ? "pill-negative" : "pill-blue"}`}>
                          {item.changeType}
                        </span>
                      </div>
                      <p className="market-subheading mt-1">{item.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="market-mono text-base text-blue-900">{item.value}</p>
                      <p className={`market-mono text-sm ${item.changeType === "gain" ? "text-emerald-700" : "text-rose-700"}`}>{item.change}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Volume</span>
                    <span className="market-mono text-slate-700">{item.volume}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="market-panel rounded-[28px] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="market-eyebrow">Market Statistics</p>
                <h2 className="market-heading mt-1 text-xl">Session breadth and flow</h2>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {marketStats.map((stat) => (
                <div key={stat.label} className="market-subpanel rounded-[20px] px-4 py-3">
                  <p className="market-eyebrow">{stat.label}</p>
                  <p className={`market-mono mt-2 text-lg font-semibold ${stat.emphasis === "positive" ? "text-emerald-700" : stat.emphasis === "negative" ? "text-rose-700" : "text-blue-900"}`}>{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{stat.delta}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="market-panel rounded-[28px] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="market-eyebrow">Recent Trades</p>
                <h2 className="market-heading mt-1 text-xl">Live tape activity</h2>
              </div>
              <button className="rounded-full border border-blue-200 bg-white p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700">
                <TbRefresh size={16} />
              </button>
            </div>
            <div className="overflow-hidden rounded-[22px] border market-separator bg-white">
              <div className="grid grid-cols-[auto_1.4fr_auto_auto_auto] gap-3 border-b market-separator px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-slate-500">
                <span>Symbol</span>
                <span>Company</span>
                <span>Price</span>
                <span>Volume</span>
                <span>Side</span>
              </div>
              <div className="divide-y market-separator">
                {recentTrades.map((trade) => (
                  <div key={`${trade.symbol}-${trade.price}`} className="grid grid-cols-[auto_1.4fr_auto_auto_auto] gap-3 px-4 py-3 text-sm transition hover:bg-blue-50/40">
                    <span className="market-mono font-semibold text-blue-900">{trade.symbol}</span>
                    <span className="market-subheading">{trade.company}</span>
                    <span className="market-mono text-slate-900">{trade.price}</span>
                    <span className="market-mono text-slate-600">{trade.volume}</span>
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
