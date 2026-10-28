"use client"

import * as React from "react"
import { motion } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Phone } from "@/components/belgrade/phone"
import {
  AssistantScreen,
  BalanceScreen,
  BillsScreen,
  BudgetScreen,
  CardsScreen,
  ConnectScreen,
  TransferScreen,
} from "@/components/belgrade/screens"
import { Reveal } from "@/components/belgrade/motion"
import { SectionHeading } from "@/components/belgrade/ui"

const screens = [
  { label: "Send money", Screen: TransferScreen },
  { label: "AI assistant", Screen: AssistantScreen },
  { label: "My cards", Screen: CardsScreen },
  { label: "Bills", Screen: BillsScreen },
  { label: "Wallet", Screen: BalanceScreen },
  { label: "Transactions", Screen: BudgetScreen },
  { label: "Add funds", Screen: ConnectScreen },
]

const SPACING = 300

export function Showcase() {
  const [active, setActive] = React.useState(2)
  const [paused, setPaused] = React.useState(false)
  const count = screens.length

  const go = React.useCallback(
    (dir: number) => setActive((a) => (a + dir + count) % count),
    [count]
  )

  React.useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => go(1), 4500)
    return () => window.clearInterval(id)
  }, [paused, go])

  return (
    <section className="overflow-hidden py-24">
      <SectionHeading title="A Wallet That Looks as" accent="Good as It Works" />

      <Reveal delay={0.1}>
        <motion.div
          role="region"
          aria-roledescription="carousel"
          aria-label="App screens"
          onPanEnd={(_, info) => {
            if (info.offset.x < -40) go(1)
            else if (info.offset.x > 40) go(-1)
          }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          className="relative mt-10 h-[680px] cursor-grab touch-pan-y mask-[linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] [zoom:0.8] active:cursor-grabbing sm:[zoom:1]"
        >
          {screens.map(({ label, Screen }, i) => {
            let offset = i - active
            if (offset > count / 2) offset -= count
            if (offset < -count / 2) offset += count
            const distance = Math.abs(offset)

            return (
              <motion.div
                key={label}
                aria-hidden={offset !== 0}
                initial={false}
                animate={{
                  x: offset * SPACING,
                  scale: offset === 0 ? 1 : 0.92,
                  opacity: distance > 2 ? 0 : 1 - distance * 0.18,
                  zIndex: 10 - distance,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                onClick={() => setActive(i)}
                className="absolute top-6 left-1/2 -ml-[140px]"
              >
                <Phone>
                  <Screen />
                </Phone>
              </motion.div>
            )
          })}
        </motion.div>
      </Reveal>

      <div className="relative z-20 -mt-6 flex items-center justify-center gap-4">
        <span className="h-px w-24 bg-linear-to-l from-border to-transparent sm:w-48" />
        <div className="flex items-center gap-0.5 rounded-full border border-black/5 bg-card p-1 shadow-[0_8px_20px_-10px_rgb(0_0_0/0.35)] dark:border-white/10">
          <button
            type="button"
            aria-label="Previous screen"
            onClick={() => go(-1)}
            className="grid size-7 place-items-center rounded-full text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground active:scale-90"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next screen"
            onClick={() => go(1)}
            className="grid size-7 place-items-center rounded-full text-foreground/70 transition hover:bg-foreground/5 hover:text-foreground active:scale-90"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
        <span className="h-px w-24 bg-linear-to-r from-border to-transparent sm:w-48" />
      </div>
      <p className="sr-only" aria-live="polite">
        {screens[active].label}
      </p>
    </section>
  )
}
