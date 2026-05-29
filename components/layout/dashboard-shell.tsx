"use client";

import { useEffect, useMemo, useState } from "react";
import {
  TbBell,
  TbChartLine,
  TbClockHour3,
  TbDotsVertical,
  TbHome2,
  TbLayoutSidebarLeftExpand,
  TbMenu2,
  TbSearch,
  TbSettings,
} from "react-icons/tb";
import { BiSolidChevronDown } from "react-icons/bi";
import { topNavItems, tickerItems, sidebarGroups } from "@/data/mockData";
import type { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
  rightPanel: ReactNode;
}

const baseClock = new Date("2026-05-29T09:30:00+05:30");

function formatColomboTime(date: Date) {
  return new Intl.DateTimeFormat("en-LK", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Colombo",
  }).format(date);
}

function SidebarIcon({ name }: { name: string }) {
  switch (name) {
    case "home":
      return <TbHome2 size={18} />;
    case "markets":
      return <TbChartLine size={18} />;
    case "equities":
      return <TbLayoutSidebarLeftExpand size={18} />;
    default:
      return <TbDotsVertical size={18} />;
  }
}

export function DashboardShell({ children, rightPanel }: DashboardShellProps) {
  const [time, setTime] = useState(() => baseClock);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const clockLabel = useMemo(() => formatColomboTime(time), [time]);

  return (
    <div className="min-h-screen text-slate-100">
      <header className="fixed inset-x-0 top-0 z-50 h-[52px] border-b border-white/10 bg-[#0b0e14]/95 backdrop-blur-xl">
        <div className="flex h-full items-center gap-4 px-4 lg:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_0_1px_rgba(37,99,235,0.1)]">
              <TbChartLine size={18} />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-[0.2em] text-slate-100">
                CSE
              </div>
              <div className="-mt-0.5 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                Market Desk
              </div>
            </div>
          </div>

          <nav className="hidden flex-1 items-center gap-1 xl:flex">
            {topNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 lg:flex">
              <span className="live-dot h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.55)]" />
              <span>Live market</span>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300 xl:flex">
              <TbClockHour3 size={16} />
              <span className="font-mono text-xs tracking-[0.24em] text-slate-100">{clockLabel}</span>
            </div>
          </div>

          <label className="hidden flex-1 max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-400 lg:flex">
            <TbSearch size={16} />
            <input
              type="search"
              placeholder="Search symbols, companies, sectors"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </label>

          <button className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white md:inline-flex">
            <TbBell size={16} />
          </button>
          <button className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white md:inline-flex">
            <TbSettings size={16} />
          </button>

          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 lg:hidden">
            <TbMenu2 size={18} />
          </button>

          <button className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-slate-100 lg:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-[11px] font-semibold text-blue-200">
              AD
            </span>
            <BiSolidChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </header>

      <div className="fixed inset-x-0 top-[52px] z-40 h-[34px] overflow-hidden border-b border-white/10 bg-[#111623]/95 backdrop-blur-xl">
        <div className="ticker-scroll flex h-full min-w-[200%] items-center gap-6 px-4 text-[12px]">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div
              key={`${item.symbol}-${index}`}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1"
            >
              <span className="font-mono font-semibold tracking-[0.18em] text-white">
                {item.symbol}
              </span>
              <span className="font-mono text-slate-200">{item.price}</span>
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold ${
                  item.tone === "gain"
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-rose-500/15 text-rose-300"
                }`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-[86px] lg:pl-[72px] xl:pl-[220px] xl:pr-[280px]">
        <aside className="custom-scrollbar fixed left-0 top-[86px] hidden h-[calc(100vh-86px)] w-[72px] overflow-y-auto border-r border-white/10 bg-[#0d111b]/95 px-2 py-5 lg:block xl:w-[220px] xl:px-4">
          <div className="space-y-5">
            {sidebarGroups.map((group) => (
              <section key={group.title} className="space-y-2">
                <h2 className="hidden px-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 xl:block">
                  {group.title}
                </h2>
                <div className="space-y-1">
                  {group.items.map((item, index) => {
                    const active = index === 0;

                    return (
                      <button
                        key={item}
                        className={`flex w-full items-center justify-center gap-3 border-l-2 px-2 py-2 text-left transition xl:justify-start xl:px-3 ${
                          active
                            ? "border-blue-500 bg-blue-500/10 text-white"
                            : "border-transparent text-slate-400 hover:border-white/15 hover:bg-white/5 hover:text-slate-200"
                        }`}
                      >
                        <span className={`rounded-lg p-1.5 ${active ? "bg-blue-500/20 text-blue-300" : "bg-white/5 text-slate-400"}`}>
                          <SidebarIcon name={index === 0 ? "home" : index === 1 ? "markets" : index === 2 ? "equities" : "other"} />
                        </span>
                        <span className="hidden text-sm font-medium xl:block">{item}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </aside>

        <main className="custom-scrollbar min-h-[calc(100vh-86px)] overflow-y-auto px-4 pb-24 pt-5 lg:px-5">
          {children}
        </main>

        <aside className="custom-scrollbar fixed right-0 top-[86px] hidden h-[calc(100vh-86px)] w-[280px] overflow-y-auto border-l border-white/10 bg-[#0d111b]/95 px-4 py-5 xl:block">
          {rightPanel}
        </aside>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 grid h-14 grid-cols-4 border-t border-white/10 bg-[#0b0e14]/96 px-2 backdrop-blur-xl md:hidden">
        {topNavItems.slice(0, 4).map((item, index) => (
          <button
            key={item.label}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] ${index === 0 ? "text-blue-300" : "text-slate-400"}`}
          >
            <span className="text-base">
              <SidebarIcon name={item.icon} />
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
