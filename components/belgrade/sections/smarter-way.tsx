"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { EASE_OUT } from "@/components/belgrade/motion"
import { Phone } from "@/components/belgrade/phone"
import { CardsScreen } from "@/components/belgrade/screens"
import { SectionHeading } from "@/components/belgrade/ui"

export function SmarterWay() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const rotateX = useTransform(scrollYProgress, [0, 0.55], [38, 16])
  const rotateZ = useTransform(scrollYProgress, [0, 0.55, 1], [-26, -14, -8])
  const y = useTransform(scrollYProgress, [0, 1], [70, -50])

  return (
    <section className="py-24">
      <SectionHeading
        title={
          <>
            A Smarter Way to{" "}
            <span className="text-brand-soft">Manage, Move,</span>
            <br />
            <span className="text-brand-soft">and Understand</span> Your Money
          </>
        }
        description="Belgrade is more than a wallet — it's your personal financial hub. Manage accounts, send and receive money, analyze spending, and generate smart reports with the help of AI."
      />

      <div
        ref={ref}
        className="relative mx-auto mt-8 h-[460px] max-w-[1100px] overflow-hidden mask-[linear-gradient(to_bottom,black_55%,transparent_92%)] perspective-[1400px] sm:h-[540px]"
      >
        <motion.div
          style={{ rotateX, rotateZ, y }}
          className="absolute top-10 left-1/2 -ml-[140px] [zoom:0.85] sm:[zoom:1]"
        >
          <Phone>
            <CardsScreen />
          </Phone>
        </motion.div>

        <Callout
          side="right"
          className="top-[70px] left-[calc(50%+150px)]"
          delay={0.2}
        >
          Add, edit and manage your cards
        </Callout>
        <Callout
          side="left"
          className="top-[270px] right-[calc(50%+120px)]"
          delay={0.45}
        >
          Track expenses in real time, anytime
        </Callout>
      </div>
    </section>
  )
}

function Callout({
  side,
  className,
  delay,
  children,
}: {
  side: "left" | "right"
  className?: string
  delay: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      className={cn(
        "absolute z-10 hidden items-center md:flex",
        side === "left" && "flex-row-reverse",
        className
      )}
    >
      <motion.span
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
        transition={{ duration: 0.8, delay, ease: EASE_OUT }}
        className={cn(
          "h-px w-[110px] from-transparent to-foreground/30 lg:w-[150px]",
          side === "right"
            ? "origin-left bg-linear-to-l"
            : "origin-right bg-linear-to-r"
        )}
      />
      <motion.span
        variants={{
          hidden: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
          show: { opacity: 1, scale: 1, filter: "blur(0px)" },
        }}
        transition={{ duration: 0.6, delay: delay + 0.5, ease: EASE_OUT }}
        className="rounded-full border border-black/5 bg-card px-3.5 py-2 text-xs whitespace-nowrap shadow-[0_8px_20px_-10px_rgb(0_0_0/0.35)] dark:border-white/10"
      >
        {children}
      </motion.span>
    </motion.div>
  )
}
