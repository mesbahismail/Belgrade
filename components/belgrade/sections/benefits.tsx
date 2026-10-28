"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/belgrade/motion"
import { Phone } from "@/components/belgrade/phone"
import {
  BalanceScreen,
  CardsScreen,
  TransferScreen,
} from "@/components/belgrade/screens"
import { SectionHeading } from "@/components/belgrade/ui"

const slides = [
  {
    title: "Smarter Card Management",
    body: [
      "Belgrade lets you link, freeze, and manage all your cards in one secure place. Set spending limits, get real-time alerts, and add new cards in seconds.",
      "Whether you're at home or abroad, your cards stay protected — with every transaction visible the moment it happens.",
    ],
    screen: <CardsScreen />,
  },
  {
    title: "Instant, Borderless Transfers",
    body: [
      "Send money to friends, family, or clients worldwide in seconds — with transparent fees and real-time exchange rates.",
      "Schedule recurring payments, split bills, and request money with a single tap.",
    ],
    screen: <TransferScreen />,
  },
  {
    title: "Insights That Actually Help",
    body: [
      "Belgrade's AI turns your transactions into clear, actionable insights so you always know where your money goes.",
      "Weekly summaries, smart savings goals, and forecasts keep you one step ahead.",
    ],
    screen: <BalanceScreen />,
  },
]

export function Benefits() {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const startX = React.useRef<number | null>(null)

  const go = (dir: number) =>
    setIndex((i) => (i + dir + slides.length) % slides.length)

  return (
    <section id="benefits" className="scroll-mt-24 overflow-hidden py-24">
      <SectionHeading
        badge="Benefits"
        title="Smarter Money. Less Hassle."
        accent="More Control."
      />

      <Reveal delay={0.1}>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Benefits"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return
            const dx = e.clientX - startX.current
            if (dx < -50) go(1)
            else if (dx > 50) go(-1)
            startX.current = null
          }}
          className="relative mt-14 touch-pan-y [--gap:24px] [--w:min(760px,88vw)]"
        >
          <div
            className="relative left-1/2 flex w-max gap-(--gap) transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(calc(var(--w) / -2 - ${index} * (var(--w) + var(--gap))))`,
            }}
          >
            {slides.map((slide, i) => {
              const current = i === index
              return (
                <article
                  key={slide.title}
                  aria-hidden={!current}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "grid h-[620px] w-(--w) shrink-0 grid-rows-[auto_1fr] overflow-hidden rounded-2xl border border-border bg-linear-to-br from-card/70 to-card/10 transition-[opacity,scale,filter] duration-700 md:h-[440px] md:grid-cols-[1.1fr_1fr] md:grid-rows-1",
                    current
                      ? "opacity-100"
                      : "scale-[0.96] cursor-pointer opacity-40 blur-[1px]"
                  )}
                >
                  <div className="flex flex-col justify-center px-8 pt-10 sm:px-12 md:py-12">
                    <h3 className="text-xl font-medium tracking-tight">
                      {slide.title}
                    </h3>
                    {slide.body.map((p) => (
                      <p
                        key={p}
                        className="mt-4 text-sm leading-relaxed font-light text-muted-foreground"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="relative overflow-hidden mask-[linear-gradient(to_bottom,black_75%,transparent)]">
                    <div className="absolute top-8 left-1/2 -ml-[140px] [zoom:0.9]">
                      <Phone>{slide.screen}</Phone>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Show ${slide.title}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "relative h-2 overflow-hidden rounded-full bg-foreground/15 transition-[width] duration-500",
              i === index ? "w-8" : "w-2 hover:bg-foreground/30"
            )}
          >
            {i === index && (
              <span
                key={index}
                onAnimationEnd={() => go(1)}
                className="absolute inset-0 origin-left animate-progress rounded-full bg-foreground/60"
                style={{ animationPlayState: paused ? "paused" : "running" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
