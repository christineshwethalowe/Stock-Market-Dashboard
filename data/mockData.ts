import {
  type Announcement,
  type ChartPoint,
  type IndexCard,
  type MarketStat,
  type MoverItem,
  type NavItem,
  type PortfolioMetric,
  type TradeRow,
  type WatchlistItem,
} from "@/types/market";

export const topNavItems: NavItem[] = [
  { label: "Dashboard", href: "#dashboard", icon: "home" },
  { label: "Markets", href: "#markets", icon: "markets" },
  { label: "Equities", href: "#equities", icon: "equities" },
  { label: "Derivatives", href: "#derivatives", icon: "derivatives" },
  { label: "Bonds", href: "#bonds", icon: "bonds" },
  { label: "Research", href: "#research", icon: "research" },
];

export const sidebarGroups = [
  {
    title: "Overview",
    items: ["Dashboard", "Market Breadth", "Heatmap", "Alerts"],
  },
  {
    title: "Instruments",
    items: ["Equities", "Derivatives", "Bonds", "ETFs"],
  },
  {
    title: "Portfolio",
    items: ["Watchlist", "Holdings", "Orders", "Performance"],
  },
  {
    title: "Tools",
    items: ["Research", "Screeners", "Calendar", "News"],
  },
];

export const indexCards: IndexCard[] = [
  {
    symbol: "ASPI",
    label: "All Share Price Index",
    value: "12,846.72",
    change: "+84.15 (0.66%)",
    direction: "up",
    progress: 68,
  },
  {
    symbol: "S&P SL20",
    label: "S&P Sri Lanka 20",
    value: "3,648.11",
    change: "+19.42 (0.54%)",
    direction: "up",
    progress: 61,
  },
  {
    symbol: "MBL Midcap",
    label: "Midcap Index",
    value: "4,812.03",
    change: "-14.09 (0.29%)",
    direction: "down",
    progress: 47,
  },
  {
    symbol: "Turnover",
    label: "Market Turnover",
    value: "LKR 2.48B",
    change: "+16.8% vs prev. day",
    direction: "up",
    progress: 83,
  },
];

export const chartData: Record<string, ChartPoint[]> = {
  "1D": [
    { label: "09:30", aspi: 12610, sl20: 3622 },
    { label: "10:00", aspi: 12628, sl20: 3628 },
    { label: "10:30", aspi: 12635, sl20: 3634 },
    { label: "11:00", aspi: 12618, sl20: 3629 },
    { label: "11:30", aspi: 12644, sl20: 3641 },
    { label: "12:00", aspi: 12668, sl20: 3648 },
    { label: "12:30", aspi: 12692, sl20: 3656 },
  ],
  "1W": [
    { label: "Mon", aspi: 12620, sl20: 3618 },
    { label: "Tue", aspi: 12658, sl20: 3630 },
    { label: "Wed", aspi: 12642, sl20: 3626 },
    { label: "Thu", aspi: 12688, sl20: 3643 },
    { label: "Fri", aspi: 12718, sl20: 3651 },
    { label: "Sat", aspi: 12734, sl20: 3657 },
  ],
  "1M": [
    { label: "W1", aspi: 12486, sl20: 3568 },
    { label: "W2", aspi: 12524, sl20: 3583 },
    { label: "W3", aspi: 12592, sl20: 3608 },
    { label: "W4", aspi: 12644, sl20: 3632 },
    { label: "W5", aspi: 12680, sl20: 3648 },
    { label: "W6", aspi: 12722, sl20: 3660 },
  ],
  "3M": [
    { label: "M1", aspi: 12040, sl20: 3412 },
    { label: "M2", aspi: 12208, sl20: 3476 },
    { label: "M3", aspi: 12384, sl20: 3534 },
    { label: "M4", aspi: 12538, sl20: 3591 },
    { label: "M5", aspi: 12638, sl20: 3626 },
    { label: "M6", aspi: 12728, sl20: 3655 },
  ],
  YTD: [
    { label: "Jan", aspi: 11742, sl20: 3361 },
    { label: "Feb", aspi: 11986, sl20: 3410 },
    { label: "Mar", aspi: 12194, sl20: 3478 },
    { label: "Apr", aspi: 12412, sl20: 3543 },
    { label: "May", aspi: 12608, sl20: 3608 },
    { label: "Jun", aspi: 12734, sl20: 3657 },
  ],
};

export const movers: Record<string, MoverItem[]> = {
  Gainers: [
    { symbol: "JKH", company: "John Keells Holdings", value: "LKR 212.50", change: "+6.4%", changeType: "gain", volume: "1.8M" },
    { symbol: "COMB", company: "Commercial Bank", value: "LKR 150.20", change: "+4.9%", changeType: "gain", volume: "980K" },
    { symbol: "DIAL", company: "Dialog Axiata", value: "LKR 16.70", change: "+3.2%", changeType: "gain", volume: "3.4M" },
    { symbol: "HNB", company: "Hatton National Bank", value: "LKR 305.00", change: "+2.8%", changeType: "gain", volume: "610K" },
  ],
  Losers: [
    { symbol: "LIOC", company: "Lanka IOC", value: "LKR 92.10", change: "-5.1%", changeType: "loss", volume: "1.1M" },
    { symbol: "CARG", company: "Cargills", value: "LKR 256.40", change: "-3.7%", changeType: "loss", volume: "420K" },
    { symbol: "SAMP", company: "Sampath Bank", value: "LKR 112.80", change: "-2.4%", changeType: "loss", volume: "755K" },
    { symbol: "NDB", company: "NDB Bank", value: "LKR 232.60", change: "-1.9%", changeType: "loss", volume: "352K" },
  ],
  Volume: [
    { symbol: "DIAL", company: "Dialog Axiata", value: "LKR 16.70", change: "+3.2%", changeType: "gain", volume: "3.4M" },
    { symbol: "JKH", company: "John Keells Holdings", value: "LKR 212.50", change: "+6.4%", changeType: "gain", volume: "1.8M" },
    { symbol: "LIOC", company: "Lanka IOC", value: "LKR 92.10", change: "-5.1%", changeType: "loss", volume: "1.1M" },
    { symbol: "COMB", company: "Commercial Bank", value: "LKR 150.20", change: "+4.9%", changeType: "gain", volume: "980K" },
  ],
};

export const marketStats: MarketStat[] = [
  { label: "Advancers", value: "86", delta: "+12 from open", emphasis: "positive" },
  { label: "Decliners", value: "41", delta: "-6 from open", emphasis: "negative" },
  { label: "Unchanged", value: "23", delta: "Net flat", emphasis: "neutral" },
  { label: "New Highs", value: "14", delta: "3 in financials", emphasis: "positive" },
  { label: "New Lows", value: "5", delta: "Mainly small caps", emphasis: "negative" },
  { label: "Foreign Flow", value: "LKR 318M", delta: "+22M net buy", emphasis: "positive" },
];

export const recentTrades: TradeRow[] = [
  { symbol: "JKH", company: "John Keells Holdings", price: "212.50", volume: "120K", side: "Buy" },
  { symbol: "DIAL", company: "Dialog Axiata", price: "16.70", volume: "340K", side: "Buy" },
  { symbol: "LIOC", company: "Lanka IOC", price: "92.10", volume: "215K", side: "Sell" },
  { symbol: "COMB", company: "Commercial Bank", price: "150.20", volume: "98K", side: "Buy" },
  { symbol: "HNB", company: "Hatton National Bank", price: "305.00", volume: "54K", side: "Sell" },
];

export const watchlist: WatchlistItem[] = [
  { symbol: "JKH", sector: "Diversified", price: "212.50", change: "+6.4%", changeType: "gain" },
  { symbol: "COMB", sector: "Banking", price: "150.20", change: "+4.9%", changeType: "gain" },
  { symbol: "DIAL", sector: "Telecom", price: "16.70", change: "+3.2%", changeType: "gain" },
  { symbol: "LIOC", sector: "Energy", price: "92.10", change: "-5.1%", changeType: "loss" },
  { symbol: "HNB", sector: "Banking", price: "305.00", change: "+2.8%", changeType: "gain" },
];

export const portfolioMetrics: PortfolioMetric[] = [
  { label: "Total value", value: "LKR 18.42M", tone: "neutral" },
  { label: "Today\'s P&L", value: "+LKR 126,480", tone: "positive" },
  { label: "Unrealised gain", value: "+8.4%", tone: "positive" },
  { label: "Invested amount", value: "LKR 16.91M", tone: "neutral" },
  { label: "Holdings", value: "24 positions", tone: "neutral" },
];

export const announcements: Announcement[] = [
  { category: "Results", headline: "JKH reports improved travel and retail momentum in Q4 update", time: "12 min ago" },
  { category: "Corporate", headline: "Commercial Bank schedules analyst briefing for mid-year strategy", time: "31 min ago" },
  { category: "Market", headline: "Energy counters drive volume as foreign participation picks up", time: "54 min ago" },
  { category: "Policy", headline: "CSE publishes trading calendar adjustments for upcoming holiday period", time: "2 hrs ago" },
];

export const tickerItems = [
  { symbol: "ASPI", price: "12,846.72", change: "+84.15", tone: "gain" },
  { symbol: "SL20", price: "3,648.11", change: "+19.42", tone: "gain" },
  { symbol: "JKH", price: "212.50", change: "+6.4%", tone: "gain" },
  { symbol: "LIOC", price: "92.10", change: "-5.1%", tone: "loss" },
  { symbol: "DIAL", price: "16.70", change: "+3.2%", tone: "gain" },
  { symbol: "COMB", price: "150.20", change: "+4.9%", tone: "gain" },
  { symbol: "HNB", price: "305.00", change: "+2.8%", tone: "gain" },
  { symbol: "CARG", price: "256.40", change: "-3.7%", tone: "loss" },
];
