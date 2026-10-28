"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { EASE_OUT } from "@/components/belgrade/motion"
import { Phone } from "@/components/belgrade/phone"
import {
  AIChatScreen,
  BillsScreen,
  BudgetScreen,
  ConnectScreen,
} from "@/components/belgrade/screens"
import { Container, SectionHeading } from "@/components/belgrade/ui"

const cells: {
  title: string
  description: string
  screen: React.ReactNode
  align: "top" | "bottom"
}[] = [
  {
    title: "AI-Generated Reports",
    description:
      "Get insights that summarize your finances, trends, or spending by category.",
    screen: <AIChatScreen />,
    align: "top",
  },
  {
    title: "Bill Management",
    description:
      "View, schedule, and pay all your bills in one place — no missed deadlines.",
    screen: <BillsScreen />,
    align: "bottom",
  },
  {
    title: "Smart Budgeting",
    description:
      "Track spending, set limits, and stay on course with real-time budget insights.",
    screen: <BudgetScreen />,
    align: "bottom",
  },
  {
    title: "Seamless Integrations",
    description:
      "Connect your favorite services and tools effortlessly for a unified experience.",
    screen: <ConnectScreen />,
    align: "top",
  },
]

export function Bento() {
  return (
    <section id="features" className="scroll-mt-24 py-24">
      <SectionHeading
        badge="Features"
        title="Everything You Need."
        accent="Nothing You Don't."
      />
      <Container>
        <div className="mx-auto mt-14 grid overflow-hidden rounded-2xl border border-border md:grid-cols-2">
          {cells.map((cell, i) => (
            <motion.article
              key={cell.title}
              initial="hidden"
              whileInView="show"
              whileHover="hover"
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              className={cn(
                "group relative flex flex-col border-border",
                i < 2 && "border-b",
                i === 2 && "border-b md:border-b-0",
                i % 2 === 0 && "md:border-r"
              )}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="px-8 pt-10 sm:px-16 sm:pt-14"
              >
                <h3 className="text-[17px] font-medium tracking-tight">
                  {cell.title}
                </h3>
                <p className="mt-2 max-w-[300px] text-sm leading-relaxed font-light text-muted-foreground">
                  {cell.description}
                </p>
              </motion.div>

              <div
                className={cn(
                  "relative mt-8 h-[330px] overflow-hidden sm:h-[360px]",
                  cell.align === "top"
                    ? "mask-[linear-gradient(to_bottom,black_70%,transparent)]"
                    : "mask-[linear-gradient(to_top,black_70%,transparent)]"
                )}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: cell.align === "top" ? 90 : -90 },
                    show: { opacity: 1, y: 0 },
                    hover: { opacity: 1, y: cell.align === "top" ? -12 : 12 },
                  }}
                  transition={{ duration: 0.9, ease: EASE_OUT }}
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 [zoom:0.92]",
                    cell.align === "top" ? "top-0" : "bottom-6"
                  )}
                >
                  <Phone>{cell.screen}</Phone>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
