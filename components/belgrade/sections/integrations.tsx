"use client"

import * as React from "react"
import { motion } from "motion/react"
import {
  Bitcoin,
  Coins,
  CreditCard,
  Globe,
  Landmark,
  Nfc,
  PiggyBank,
  QrCode,
  Smartphone,
  Store,
  type LucideIcon,
} from "lucide-react"

import { EASE_OUT } from "@/components/belgrade/motion"
import { Phone } from "@/components/belgrade/phone"
import { BalanceScreen } from "@/components/belgrade/screens"
import { SectionHeading } from "@/components/belgrade/ui"

type Item = { label: string; icon: LucideIcon }

const inner: Item[] = [
  { label: "Banks", icon: Landmark },
  { label: "Cards", icon: CreditCard },
  { label: "QR payments", icon: QrCode },
  { label: "Contactless", icon: Nfc },
]

const outer: Item[] = [
  { label: "Crypto", icon: Bitcoin },
  { label: "Mobile pay", icon: Smartphone },
  { label: "Savings", icon: PiggyBank },
  { label: "Merchants", icon: Store },
  { label: "Global transfers", icon: Globe },
  { label: "Rewards", icon: Coins },
]

export function Integrations() {
  return (
    <section id="integrations" className="scroll-mt-24 py-24">
      <SectionHeading
        badge="Integrations"
        title="Seamlessly Connected to What"
        accent="You Already Use"
      />

      <div className="relative mx-auto mt-6 h-[520px] max-w-[1100px] overflow-hidden mask-[linear-gradient(to_bottom,black_62%,transparent_96%)] sm:h-[640px]">
        <div className="absolute top-[440px] left-1/2 [zoom:0.62] sm:top-[430px] sm:[zoom:1]">
          <Ring radius={500} items={[]} duration={0} />
          <Ring radius={385} items={outer} duration={120} />
          <Ring radius={250} items={inner} duration={80} reverse />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="absolute top-[170px] left-1/2 -ml-[140px] [zoom:0.8] sm:top-[200px] sm:[zoom:1]"
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-20 -z-10 mx-auto h-72 w-72 rounded-full bg-brand/25 blur-[90px]"
          />
          <Phone>
            <BalanceScreen />
          </Phone>
        </motion.div>
      </div>
    </section>
  )
}

function Ring({
  radius,
  items,
  duration,
  reverse = false,
}: {
  radius: number
  items: Item[]
  duration: number
  reverse?: boolean
}) {
  const spin = reverse ? -360 : 360
  const loop = { duration, ease: "linear" as const, repeat: Infinity }

  return (
    <motion.div
      className="absolute top-0 left-0"
      animate={duration ? { rotate: spin } : undefined}
      transition={loop}
    >
      <div
        className="absolute rounded-full border border-foreground/[0.08]"
        style={{
          width: radius * 2,
          height: radius * 2,
          left: -radius,
          top: -radius,
        }}
      />
      {items.map(({ label, icon: Icon }, i) => {
        const angle = (i / items.length) * 360
        return (
          <div
            key={label}
            className="absolute top-0 left-0"
            style={{
              transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`,
            }}
          >
            <motion.div
              animate={{ rotate: -spin }}
              transition={loop}
              className="-translate-x-1/2 -translate-y-1/2"
            >
              <div
                title={label}
                className="group grid size-14 place-items-center rounded-full border border-black/5 bg-card shadow-[0_10px_24px_-12px_rgb(0_0_0/0.4)] transition-transform duration-300 hover:scale-110 dark:border-white/10"
              >
                <Icon className="size-5 text-foreground/80" strokeWidth={1.75} />
                <span className="sr-only">{label}</span>
              </div>
            </motion.div>
          </div>
        )
      })}
    </motion.div>
  )
}
