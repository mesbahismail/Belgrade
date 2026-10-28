import * as React from "react"
import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  CalendarClock,
  ChartNoAxesColumn,
  Check,
  ChevronRight,
  CreditCard,
  Dumbbell,
  House,
  Landmark,
  Mic,
  Paperclip,
  Plus,
  QrCode,
  Repeat,
  Search,
  Send,
  SendHorizontal,
  Settings2,
  ShoppingBag,
  Sparkles,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { CountUp } from "@/components/belgrade/motion"
import { LogoMark } from "@/components/belgrade/logo"
import { Avatar, BankCard, ScreenHeader } from "@/components/belgrade/phone"

const panel = "rounded-2xl bg-phone-card shadow-[0_1px_2px_rgb(0_0_0/0.04)]"

/* ------------------------------------------------------------------ */
/* Cards / wallet                                                       */
/* ------------------------------------------------------------------ */

const transactions = [
  { name: "Dentistry", date: "Oct 24, 09:12", amount: "-$350.00", tone: "out" },
  { name: "Salary", date: "Oct 23, 18:40", amount: "+$4,200.00", tone: "in" },
  { name: "Groceries", date: "Oct 22, 13:05", amount: "-$86.40", tone: "out" },
  { name: "Freelance", date: "Oct 21, 10:22", amount: "+$860.00", tone: "in" },
] as const

export function CardsScreen({ animated = false }: { animated?: boolean }) {
  return (
    <>
      <ScreenHeader title="My cards" action={<Check className="size-4" />} />
      <div className="relative mt-2 flex items-center justify-center gap-2">
        <BankCard variant="blue" className="-ml-[180px] opacity-90" />
        <BankCard shine={animated} />
        <BankCard variant="rose" className="-mr-[180px] opacity-90" />
      </div>
      <div className="mt-3 flex justify-center gap-1">
        <span className="h-1 w-3 rounded-full bg-foreground/70" />
        <span className="size-1 rounded-full bg-foreground/20" />
        <span className="size-1 rounded-full bg-foreground/20" />
        <span className="size-1 rounded-full bg-foreground/20" />
      </div>
      <div className="mx-4 mt-4 border-t border-phone-line pt-3">
        <div className="text-[10px] text-muted-foreground">Total balance</div>
        <div className="mt-1 text-[30px] leading-none font-normal tracking-[-0.03em]">
          {animated ? (
            <CountUp value={31204.94} />
          ) : (
            <>
              $31,204<span className="text-muted-foreground/70">.94</span>
            </>
          )}
        </div>
      </div>
      <div className="mx-4 mt-4 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Latest transactions</span>
        <span>See all</span>
      </div>
      <ul className="mx-4 mt-1">
        {transactions.map((t) => (
          <li
            key={t.name}
            className="flex items-center gap-2.5 border-b border-phone-line py-2.5 last:border-0"
          >
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full",
                t.tone === "in"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-500"
              )}
            >
              {t.tone === "in" ? (
                <ArrowDownLeft className="size-3.5" />
              ) : (
                <ArrowUpRight className="size-3.5" />
              )}
            </span>
            <span className="flex-1">
              <span className="block font-medium">{t.name}</span>
              <span className="block text-[9px] text-muted-foreground">
                {t.date}
              </span>
            </span>
            <span className="font-medium tabular-nums">{t.amount}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Balance + statistics                                                 */
/* ------------------------------------------------------------------ */

const balanceActions = [
  { label: "Send", icon: Send },
  { label: "Receive", icon: ArrowDownLeft },
  { label: "Swap", icon: Repeat },
  { label: "Convert", icon: ArrowLeftRight },
]

export function BalanceScreen({ animated = false }: { animated?: boolean }) {
  return (
    <>
      <ScreenHeader title="Wallet" action={<Settings2 className="size-4" />} />
      <div className={cn(panel, "mx-3 mt-1 p-3.5")}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[12px] font-semibold">Balance</div>
            <div className="text-[9px] text-muted-foreground">
              Available funds
            </div>
          </div>
          <span className="flex items-center gap-0.5 rounded-md border border-brand/40 px-1.5 py-0.5 text-[9px] text-brand">
            <Plus className="size-2.5" /> Add
          </span>
        </div>
        <div className="mt-4 text-[30px] leading-none tracking-[-0.03em]">
          {animated ? (
            <CountUp value={238219.32} from={0.9} />
          ) : (
            <>
              $238,219<span className="text-muted-foreground/70">.32</span>
            </>
          )}
        </div>
        <div className="mt-4 grid grid-cols-4 gap-1">
          {balanceActions.map(({ label, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="grid size-9 place-items-center rounded-full bg-linear-to-b from-brand-from to-brand-to text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]">
                <Icon className="size-3.5" />
              </span>
              <span className="text-[9px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={cn(panel, "mx-3 mt-2.5 p-3.5")}>
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[12px] font-semibold">Statistics</div>
            <div className="text-[9px] text-muted-foreground">
              October overview
            </div>
          </div>
          <span className="flex items-center gap-1 rounded-md bg-phone-screen px-1.5 py-0.5 text-[9px] text-muted-foreground">
            <CalendarClock className="size-2.5" /> This month
          </span>
        </div>
        <div className="relative mt-3 flex items-end justify-between">
          <Stat label="Spent" value="24%" icon={TrendingDown} />
          <Gauge />
          <Stat label="Saved" value="67%" icon={TrendingUp} />
        </div>
      </div>
    </>
  )
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 pb-1">
      <Icon className="size-3 text-brand" />
      <span className="text-[12px] font-semibold">{value}</span>
      <span className="text-[9px] text-muted-foreground">{label}</span>
    </div>
  )
}

function Gauge() {
  return (
    <svg viewBox="0 0 120 64" className="w-[120px]" aria-hidden="true">
      <path
        d="M10 60a50 50 0 0 1 100 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        className="text-phone-line"
      />
      <path
        d="M10 60a50 50 0 0 1 100 0"
        fill="none"
        stroke="var(--brand)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray="157"
        strokeDashoffset="52"
      />
      <text
        x="60"
        y="56"
        textAnchor="middle"
        className="fill-current text-[13px] font-semibold"
      >
        $4.2k
      </text>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Send money                                                           */
/* ------------------------------------------------------------------ */

const steps = ["Amount", "Recipient", "Review", "Done"]

export function TransferScreen() {
  return (
    <>
      <ScreenHeader title="Send money" />
      <div className="mx-4 mt-2">
        <div className="relative flex justify-between">
          <span className="absolute top-[7px] right-4 left-4 h-px bg-phone-line" />
          <span className="absolute top-[7px] left-4 h-px w-[60%] bg-brand" />
          {steps.map((step, i) => (
            <div
              key={step}
              className="relative flex flex-col items-center gap-1"
            >
              <span
                className={cn(
                  "grid size-[15px] place-items-center rounded-full border-2",
                  i < 3
                    ? "border-brand bg-brand text-white"
                    : "border-phone-line bg-phone-screen"
                )}
              >
                {i < 2 && <Check className="size-2" strokeWidth={4} />}
              </span>
              <span
                className={cn(
                  "text-[8px]",
                  i < 3 ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-4 mt-5 border-t border-phone-line pt-3">
        <div className="text-[10px] text-muted-foreground">Amount</div>
        <div className="mt-1 text-[26px] leading-none tracking-[-0.03em]">
          $1,240<span className="text-muted-foreground/70">.00</span>
        </div>
      </div>
      <div className="mx-4 mt-5 text-[10px] text-muted-foreground">
        Recipient
      </div>
      <div className={cn(panel, "mx-3 mt-1.5 flex items-center gap-2.5 p-2.5")}>
        <Avatar name="Jessica Miller" />
        <div className="flex-1">
          <div className="font-medium">Jessica Miller</div>
          <div className="text-[9px] text-muted-foreground">
            Checking •••• 4021
          </div>
        </div>
        <ChevronRight className="size-3.5 text-muted-foreground" />
      </div>
      <div className="mx-4 mt-4 text-[10px] text-muted-foreground">Note</div>
      <div className={cn(panel, "mx-3 mt-1.5 p-2.5 text-muted-foreground")}>
        Dinner &amp; concert tickets
      </div>
      <div className="mx-3 mt-auto mb-7 rounded-xl bg-linear-to-b from-brand-from to-brand-to py-2.5 text-center text-[12px] font-medium text-white">
        Continue
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* AI chat                                                              */
/* ------------------------------------------------------------------ */

function ChatInput() {
  return (
    <div className="mx-3 mt-auto mb-7 flex items-center gap-2 rounded-full bg-phone-card py-1.5 pr-1.5 pl-3 shadow-[0_1px_2px_rgb(0_0_0/0.05)]">
      <Paperclip className="size-3.5 text-muted-foreground" />
      <span className="flex-1 text-muted-foreground">Ask anything…</span>
      <Mic className="size-3.5 text-muted-foreground" />
      <span className="grid size-6 place-items-center rounded-full bg-brand text-white">
        <SendHorizontal className="size-3" />
      </span>
    </div>
  )
}

const insights = [
  { label: "Groceries", value: "$412.80", delta: "-8%" },
  { label: "Restaurants", value: "$268.10", delta: "+12%" },
  { label: "Coffee", value: "$54.20", delta: "-3%" },
]

export function AIChatScreen() {
  return (
    <>
      <ScreenHeader title="AI Chat" />
      <div className="mx-3 mt-1 ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-brand px-3 py-2 text-white">
        Show me my food spending vs. last month
      </div>
      <div className="mx-3 mt-3 flex gap-2">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-phone-card">
          <Sparkles className="size-3 text-brand" />
        </span>
        <div className="flex-1">
          <p className="font-medium">
            Here&apos;s your food spending for October compared to September:
          </p>
          <div className={cn(panel, "mt-2 p-1")}>
            {insights.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b border-phone-line px-2 py-2 last:border-0"
              >
                <span>{row.label}</span>
                <span className="flex items-center gap-2">
                  <span className="font-medium tabular-nums">{row.value}</span>
                  <span
                    className={cn(
                      "text-[9px]",
                      row.delta.startsWith("-")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-500"
                    )}
                  >
                    {row.delta}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-muted-foreground">
            You&apos;re on track to save{" "}
            <span className="text-foreground">$86</span> more this month.
          </p>
        </div>
      </div>
      <ChatInput />
    </>
  )
}

const prompts = [
  "How much did I spend on food?",
  "Show my top 3 expenses",
  "Create a savings goal",
  "Split last night's dinner",
]

export function AssistantScreen() {
  return (
    <>
      <ScreenHeader title="AI Chat" />
      <div className="mt-8 flex flex-col items-center px-6 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-linear-to-b from-brand-from/25 to-brand-to/10">
          <LogoMark className="h-7" />
        </span>
        <p className="mt-3 text-[15px] leading-tight font-medium tracking-tight">
          Hi, I&apos;m your personal money assistant!
        </p>
      </div>
      <div className="mx-3 mt-6 space-y-1.5">
        {prompts.map((p) => (
          <div
            key={p}
            className={cn(panel, "flex items-center gap-2 px-3 py-2.5")}
          >
            <Sparkles className="size-3 text-brand" />
            <span className="flex-1">{p}</span>
            <ChevronRight className="size-3 text-muted-foreground" />
          </div>
        ))}
      </div>
      <ChatInput />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Bills                                                                */
/* ------------------------------------------------------------------ */

const bill = [
  { label: "Vegetables", value: "$47.10" },
  { label: "Fruits", value: "$28.30" },
  { label: "Dairy & cheese", value: "$22.70" },
]

export function BillsScreen() {
  return (
    <>
      <ScreenHeader title="Bills" />
      <div className="mx-4 space-y-3 opacity-40">
        {["Electricity", "Internet"].map((b) => (
          <div key={b} className="flex items-center gap-2.5">
            <span className="size-7 rounded-full bg-phone-line" />
            <span className="flex-1 font-medium">{b}</span>
            <span>$64.00</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 top-28 bg-black/10 dark:bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-phone-screen px-3 pt-2 pb-8 shadow-[0_-12px_30px_-12px_rgb(0_0_0/0.25)]">
        <span className="mx-auto block h-1 w-8 rounded-full bg-foreground/15" />
        <div className="mt-3 flex items-start justify-between px-1">
          <div>
            <div className="text-[13px] font-semibold">Groceries</div>
            <div className="text-[9px] text-muted-foreground">
              Paid on Oct 24
            </div>
          </div>
          <span className="grid size-5 place-items-center rounded-full bg-phone-card">
            <X className="size-3" />
          </span>
        </div>
        <div className={cn(panel, "mt-3 p-3")}>
          <div className="text-[9px] text-muted-foreground">Order summary</div>
          {bill.map((row) => (
            <div key={row.label} className="mt-2 flex justify-between">
              <span>{row.label}</span>
              <span className="tabular-nums">{row.value}</span>
            </div>
          ))}
          <div className="mt-4 text-[9px] text-muted-foreground">
            Payment method
          </div>
          <div className="mt-2 flex items-center gap-2">
            <BankCard className="h-[26px] w-[40px] rounded-[5px] p-0 [&>*]:hidden" />
            <div className="flex-1">
              <div className="font-medium">Debit card</div>
              <div className="text-[9px] text-muted-foreground">
                •••• 3792
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-between border-t border-phone-line pt-2.5 text-[9px] text-muted-foreground">
            <span>Fee</span>
            <span>$0.00</span>
          </div>
          <div className="mt-1.5 flex justify-between text-[13px] font-semibold">
            <span>Total</span>
            <span className="tabular-nums">$98.10</span>
          </div>
        </div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Budget / transactions                                                */
/* ------------------------------------------------------------------ */

const budget = [
  {
    day: "Today",
    rows: [
      { name: "Grocery shopping", meta: "Food", amount: "-$120.00", icon: ShoppingBag, tone: "out" },
      { name: "Direct deposit", meta: "Income", amount: "+$4,200.00", icon: ArrowDownLeft, tone: "in" },
      { name: "Salary transfer", meta: "Income", amount: "+$2,500.00", icon: Landmark, tone: "in" },
    ],
  },
  {
    day: "Yesterday, Oct 23",
    rows: [
      { name: "Gym membership", meta: "Health", amount: "-$45.00", icon: Dumbbell, tone: "out" },
      { name: "Freelance payout", meta: "Income", amount: "+$860.00", icon: ArrowDownLeft, tone: "in" },
    ],
  },
] as const

export function BudgetScreen() {
  return (
    <>
      <ScreenHeader
        title="Transactions"
        action={<Search className="size-3.5" />}
      />
      <div className="mx-3 mt-1 flex gap-1.5 text-[9px]">
        {["All", "Income", "Expenses"].map((f, i) => (
          <span
            key={f}
            className={cn(
              "rounded-full px-2.5 py-1",
              i === 0 ? "bg-foreground text-background" : "bg-phone-card"
            )}
          >
            {f}
          </span>
        ))}
      </div>
      {budget.map((group) => (
        <div key={group.day} className="mx-4 mt-3">
          <div className="text-[9px] text-muted-foreground">{group.day}</div>
          <ul>
            {group.rows.map(({ name, meta, amount, icon: Icon, tone }) => (
              <li
                key={name}
                className="flex items-center gap-2.5 border-b border-phone-line py-2.5 last:border-0"
              >
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full",
                    tone === "in"
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-500"
                  )}
                >
                  <Icon className="size-3.5" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{name}</span>
                  <span className="block text-[9px] text-muted-foreground">
                    {meta}
                  </span>
                </span>
                <span className="font-medium tabular-nums">{amount}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <TabBar />
    </>
  )
}

function TabBar() {
  return (
    <div className="mx-3 mt-auto mb-6 flex items-center justify-around rounded-full bg-phone-card px-2 py-1.5 shadow-[0_6px_20px_-8px_rgb(0_0_0/0.2)]">
      <House className="size-4" />
      <ChartNoAxesColumn className="size-4 text-muted-foreground" />
      <span className="grid size-9 place-items-center rounded-full bg-linear-to-b from-brand-from to-brand-to text-white shadow-[0_6px_14px_-4px_rgb(74_119_166/0.8)]">
        <Plus className="size-4" />
      </span>
      <CreditCard className="size-4 text-muted-foreground" />
      <Settings2 className="size-4 text-muted-foreground" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Add funds / integrations                                             */
/* ------------------------------------------------------------------ */

const fundOptions = [
  { label: "Link bank account", meta: "Instant & secure transfers", icon: Landmark },
  { label: "Debit or credit card", meta: "Fee-free top ups", icon: CreditCard },
  { label: "Request money", meta: "From friends & family", icon: ArrowDownLeft },
  { label: "Scan to pay", meta: "Pay in store with QR", icon: QrCode },
]

export function ConnectScreen() {
  return (
    <>
      <ScreenHeader title="Add funds" />
      <p className="mx-4 mt-3 font-serif text-[21px] leading-[1.15] tracking-tight">
        It&apos;s always good to have more money on you.
      </p>
      <span className="mx-4 mt-3 block h-0.5 w-6 rounded-full bg-brand" />
      <ul className="mx-3 mt-4 space-y-1.5">
        {fundOptions.map(({ label, meta, icon: Icon }, i) => (
          <li
            key={label}
            className={cn(
              panel,
              "flex items-center gap-2.5 p-2.5",
              i === fundOptions.length - 1 && "opacity-50"
            )}
          >
            <span className="grid size-7 place-items-center rounded-full bg-phone-screen">
              <Icon className="size-3.5" />
            </span>
            <span className="flex-1">
              <span className="block font-medium">{label}</span>
              <span className="block text-[9px] text-muted-foreground">
                {meta}
              </span>
            </span>
            <ChevronRight className="size-3.5 text-muted-foreground" />
          </li>
        ))}
      </ul>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Splash                                                               */
/* ------------------------------------------------------------------ */

export function SplashScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(80%_60%_at_50%_40%,#2b2f36_0%,#0b0b0b_70%)] text-white">
      <span className="grid size-16 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
        <LogoMark className="h-8" />
      </span>
      <span className="mt-4 text-[22px] font-medium tracking-tight">
        Belgrade
      </span>
      <span className="mt-1.5 max-w-[160px] text-center text-[11px] text-white/60">
        Smarter money, everywhere you go.
      </span>
      <span className="mt-8 flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-typing rounded-full bg-white"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </div>
  )
}
