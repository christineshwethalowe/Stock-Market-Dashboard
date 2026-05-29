export type TimeRange = "1D" | "1W" | "1M" | "3M" | "YTD";

export type MoversTab = "Gainers" | "Losers" | "Volume";

export type CardSelection = "ASPI" | "S&P SL20" | "MBL Midcap" | "Turnover";

export interface IndexCard {
  symbol: CardSelection;
  label: string;
  value: string;
  change: string;
  direction: "up" | "down";
  progress: number;
}

export interface ChartPoint {
  label: string;
  aspi: number;
  sl20: number;
}

export interface MoverItem {
  symbol: string;
  company: string;
  value: string;
  change: string;
  changeType: "gain" | "loss" | "flat";
  volume: string;
}

export interface MarketStat {
  label: string;
  value: string;
  delta?: string;
  emphasis?: "neutral" | "positive" | "negative";
}

export interface TradeRow {
  symbol: string;
  company: string;
  price: string;
  volume: string;
  side: "Buy" | "Sell";
}

export interface WatchlistItem {
  symbol: string;
  sector: string;
  price: string;
  change: string;
  changeType: "gain" | "loss";
}

export interface PortfolioMetric {
  label: string;
  value: string;
  tone: "neutral" | "positive" | "negative";
}

export interface Announcement {
  category: string;
  headline: string;
  time: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}
