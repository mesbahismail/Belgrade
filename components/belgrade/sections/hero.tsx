"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { LayoutGrid, Star } from "lucide-react"

import { AppleIcon } from "@/components/belgrade/brand-icons"
import { LogoMark } from "@/components/belgrade/logo"
import { EASE_OUT, WordsReveal } from "@/components/belgrade/motion"
import { Phone } from "@/components/belgrade/phone"
import {
  BalanceScreen,
  CardsScreen,
  TransferScreen,
} from "@/components/belgrade/screens"
import { BrandButton, Container, SoftButton } from "@/components/belgrade/ui"

const avatars = [
  "photo-1494790108377-be9c29b29330",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1438761681033-6461ffad8d80",
  "photo-1500648767791-00dcc994a43e",
]

export function Hero() {
  const ref = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const spread = useTransform(scrollYProgress, [0, 1], [0, 90])
  const spreadLeft = useTransform(spread, (v) => -v)
  const tilt = useTransform(scrollYProgress, [0, 1], [0, 9])
  const tiltLeft = useTransform(tilt, (v) => -v)
  const lift = useTransform(scrollYProgress, [0, 1], [0, -80])
  const glow = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  return (
    <section ref={ref} id="top" className="relative pt-32 sm:pt-40">
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1000px] bg-[radial-gradient(55%_45%_at_50%_42%,var(--hero-glow),transparent_72%)]"
      />

      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="flex items-center gap-1.5 text-[22px] font-medium tracking-tight"
        >
          <LogoMark className="h-7" />
          Belgrade
        </motion.div>

        <h1 className="mt-4 max-w-[780px] text-[clamp(2rem,4.4vw,2.9rem)] leading-[1.15] font-normal tracking-[-0.03em]">
          <WordsReveal text="Your All-in-One Wallet for Smarter" delay={0.15} />
          <br />
          <WordsReveal
            text="Money Management"
            delay={0.55}
            className="text-brand-soft"
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: EASE_OUT }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <BrandButton href="#download">
            <AppleIcon className="-mt-0.5" />
            Download
          </BrandButton>
          <SoftButton href="#features">
            <LayoutGrid />
            Features
          </SoftButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: EASE_OUT }}
          className="mt-7 flex items-center gap-3"
        >
          <div className="flex -space-x-2.5">
            {avatars.map((id, i) => (
              <motion.img
                key={id}
                src={`https://images.unsplash.com/${id}?w=96&h=96&fit=crop&crop=faces&q=70&auto=format`}
                alt=""
                width={34}
                height={34}
                loading="eager"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + i * 0.08, ease: EASE_OUT }}
                className="size-[34px] rounded-full object-cover ring-2 ring-background"
              />
            ))}
          </div>
          <div className="text-left">
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-0.5 text-xs font-light text-muted-foreground">
              Loved by 10,000+ users worldwide
            </p>
          </div>
        </motion.div>
      </Container>

      <div className="relative mt-14 h-[400px] overflow-hidden mask-[linear-gradient(to_bottom,black_50%,transparent_95%)] sm:h-[460px] lg:h-[520px]">
        <div className="absolute top-0 left-1/2 flex -translate-x-1/2 items-start gap-6 [zoom:0.82] sm:gap-14 sm:[zoom:0.92] lg:[zoom:1.05]">
          <motion.div
            style={{ x: spreadLeft, rotate: tiltLeft }}
            className="mt-12 hidden sm:block"
          >
            <motion.div
              initial={{ opacity: 0, y: 160, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.75 }}
            >
              <Phone>
                <TransferScreen />
              </Phone>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: lift }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 160 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.55 }}
            >
              <Phone>
                <CardsScreen animated />
              </Phone>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ x: spread, rotate: tilt }}
            className="mt-12 hidden sm:block"
          >
            <motion.div
              initial={{ opacity: 0, y: 160, rotate: 8 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 16, delay: 0.9 }}
            >
              <Phone>
                <BalanceScreen animated />
              </Phone>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
