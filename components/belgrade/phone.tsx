import * as React from "react"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A 280×580 device frame. Scale it with `[zoom:…]` utilities so the
 * screen content keeps its proportions.
 */
export function Phone({
  children,
  className,
  screenClassName,
  time = "9:41",
}: {
  children?: React.ReactNode
  className?: string
  screenClassName?: string
  time?: string
}) {
  return (
    <div
      className={cn(
        "relative h-[580px] w-[280px] shrink-0 rounded-[46px] bg-phone-frame p-[7px] text-foreground shadow-[0_0_0_1px_var(--phone-bezel),0_40px_80px_-30px_rgb(0_0_0/0.35)] select-none",
        className
      )}
    >
      <div
        className={cn(
          "relative flex h-full w-full flex-col overflow-hidden rounded-[39px] bg-phone-screen text-[11px] leading-snug",
          screenClassName
        )}
      >
        <StatusBar time={time} />
        {children}
        <div className="pointer-events-none absolute bottom-2 left-1/2 h-[4px] w-24 -translate-x-1/2 rounded-full bg-foreground/85" />
      </div>
    </div>
  )
}

/** iOS status bar: time and indicators sit centered beside the Dynamic Island. */
function StatusBar({ time }: { time: string }) {
  return (
    <div className="relative z-10 grid h-11 shrink-0 grid-cols-[1fr_88px_1fr] items-center pt-0.5">
      <span className="pl-2 text-center text-[12.5px] leading-none font-semibold tracking-[-0.01em]">
        {time}
      </span>
      <span className="h-[25px] w-[88px] rounded-full bg-black" />
      <span className="flex items-center justify-center gap-[5px] pr-2">
        <CellularIcon />
        <WifiIcon />
        <BatteryIcon />
      </span>
    </div>
  )
}

function CellularIcon() {
  return (
    <svg viewBox="0 0 17 11" className="h-[9px] w-auto" fill="currentColor" aria-hidden="true">
      <rect x="0" y="7" width="3" height="4" rx="0.9" />
      <rect x="4.6" y="4.7" width="3" height="6.3" rx="0.9" />
      <rect x="9.2" y="2.4" width="3" height="8.6" rx="0.9" />
      <rect x="13.8" y="0" width="3" height="11" rx="0.9" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 16 12"
      className="h-[9px] w-auto"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 11L5.67 8.67A3.3 3.3 0 0 1 10.33 8.67Z" />
      <path d="M3.19 6.19A6.8 6.8 0 0 1 12.81 6.19L11.25 7.75A4.6 4.6 0 0 0 4.75 7.75Z" />
      <path d="M0.72 3.72A10.3 10.3 0 0 1 15.28 3.72L13.73 5.27A8.1 8.1 0 0 0 2.27 5.27Z" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 27 13" className="h-[10px] w-auto" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="12"
        rx="3.6"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      <rect x="2" y="2" width="20" height="9" rx="2.2" fill="currentColor" />
      <path
        d="M25 4.4v4.2c.85-.36 1.45-1.17 1.45-2.1S25.85 4.76 25 4.4Z"
        fill="currentColor"
        fillOpacity="0.45"
      />
    </svg>
  )
}

export function ScreenHeader({
  title,
  action,
}: {
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex h-10 shrink-0 items-center justify-between px-4">
      <ChevronLeft className="size-4" />
      <span className="text-[12px] font-semibold">{title}</span>
      <span className="grid size-4 place-items-center">{action}</span>
    </div>
  )
}

const cardStyles = {
  violet:
    "bg-[radial-gradient(120%_140%_at_90%_10%,#f5d0fe_0%,#a78bfa_22%,#6d28d9_50%,#2e1065_100%)]",
  blue: "bg-[radial-gradient(120%_140%_at_90%_10%,#bfdbfe_0%,#60a5fa_25%,#1d4ed8_60%,#172554_100%)]",
  rose: "bg-[radial-gradient(120%_140%_at_90%_10%,#fed7aa_0%,#fb7185_30%,#e11d48_60%,#4c0519_100%)]",
} as const

export function BankCard({
  variant = "violet",
  className,
  shine = false,
}: {
  variant?: keyof typeof cardStyles
  className?: string
  shine?: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex h-[124px] w-[200px] shrink-0 flex-col justify-between overflow-hidden rounded-[14px] p-3 text-white shadow-[0_12px_24px_-12px_rgb(46_16_101/0.8)]",
        cardStyles[variant],
        className
      )}
    >
      {shine && (
        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 animate-card-shine bg-linear-to-r from-transparent via-white/40 to-transparent" />
      )}
      <div className="flex items-start justify-between">
        <span className="text-[9px] font-medium opacity-80">Debit card</span>
        <span className="flex">
          <span className="size-4 rounded-full bg-[#eb001b]/90" />
          <span className="-ml-1.5 size-4 rounded-full bg-[#f79e1b]/90 mix-blend-screen" />
        </span>
      </div>
      <div>
        <span className="mb-2 block h-[14px] w-[20px] rounded-[3px] bg-linear-to-br from-[#f4f1ea] to-[#b9b4a8] opacity-90" />
        <div className="text-[11px] font-medium tracking-[0.12em]">
          1204 3792 3684 3792
        </div>
        <div className="mt-1.5 flex justify-between text-[8px] opacity-80">
          <span>Alex Morgan</span>
          <span>09/29</span>
        </div>
      </div>
    </div>
  )
}

export function Avatar({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full bg-linear-to-br from-[#fde68a] to-[#f59e0b] text-[9px] font-semibold text-[#713f12]",
        className
      )}
    >
      {initials}
    </span>
  )
}
