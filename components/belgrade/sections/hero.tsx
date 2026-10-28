"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Play, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { AppleIcon } from "@/components/belgrade/brand-icons"
import { LogoMark } from "@/components/belgrade/logo"
import { EASE_OUT, WordsReveal } from "@/components/belgrade/motion"
import { Phone } from "@/components/belgrade/phone"
import {
  BalanceScreen,
  CardsScreen,
  TransferScreen,
} from "@/components/belgrade/screens"
import { BrandButton, Container } from "@/components/belgrade/ui"
import { VideoDialog } from "@/components/belgrade/video-dialog"

// Drop your video at public/videos/belgrade-ad.mp4 (or point this elsewhere).
const VIDEO_AD_SRC = "/videos/belgrade-ad.mp4"

/** Seeded star layer, so the server and client render identical positions. */
function makeStars(count: number, seed: number, near: boolean) {
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  return Array.from({ length: count }, () => {
    const bright = near && rand() > 0.8
    return {
      bright,
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(rand() * 100).toFixed(2)}%`,
      size: near ? (bright ? 2 : 1.5) : 1,
      opacity: bright
        ? 1
        : Number(((near ? 0.45 : 0.18) + rand() * (near ? 0.4 : 0.32)).toFixed(2)),
      delay: `-${(rand() * 8).toFixed(2)}s`,
      duration: `${(3 + rand() * 5).toFixed(2)}s`,
    }
  })
}

// Many faint, distant pinpricks plus a few brighter stars closer in.
const farStars = makeStars(200, 7, false)
const nearStars = makeStars(75, 11, true)

/** Static star dust on a 1600×1100 canvas: a scatter plus a Milky Way band. */
const skyDust = (() => {
  let seed = 23
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  const scatter = Array.from({ length: 260 }, () => ({
    x: rand() * 1600,
    y: rand() * 1100,
    r: 0.5 + rand() * 0.5,
    o: 0.12 + rand() * 0.38,
  }))
  // The band runs bottom-left to top-right through the center, tilted ~27°.
  const band = Array.from({ length: 240 }, () => {
    const along = rand() * 1900 - 950
    const across = ((rand() + rand() + rand() - 1.5) / 1.5) * 130
    return {
      x: 800 + along * 0.894 + across * 0.447,
      y: 550 - along * 0.447 + across * 0.894,
      r: 0.4 + rand() * 0.45,
      o: 0.1 + rand() * 0.32,
    }
  })
  return [...scatter, ...band].map((d) => ({
    cx: d.x.toFixed(1),
    cy: d.y.toFixed(1),
    r: d.r.toFixed(2),
    o: d.o.toFixed(2),
  }))
})()

function SkyDust() {
  const id = React.useId()
  return (
    <svg
      viewBox="0 0 1600 1100"
      preserveAspectRatio="xMidYMin slice"
      className="absolute inset-0 size-full text-brand-soft opacity-50 dark:text-white dark:opacity-100"
    >
      <defs>
        <radialGradient id={`${id}-band`}>
          <stop stopColor="currentColor" stopOpacity="0.04" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx="800"
        cy="550"
        rx="1050"
        ry="170"
        transform="rotate(-26.6 800 550)"
        fill={`url(#${id}-band)`}
      />
      <g fill="currentColor">
        {skyDust.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} opacity={d.o} />
        ))}
      </g>
    </svg>
  )
}

function Starfield({ stars }: { stars: ReturnType<typeof makeStars> }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, delay: 0.3 }}
      className="absolute inset-0 text-brand-soft dark:text-white"
    >
      {stars.map((star, i) => (
        <span
          key={i}
          className={cn(
            "absolute animate-twinkle rounded-full bg-current opacity-(--star-opacity)",
            star.bright && "shadow-[0_0_6px_1px_currentColor]"
          )}
          style={
            {
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              animationDuration: star.duration,
              "--star-opacity": star.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </motion.div>
  )
}

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
  // Farther layers lag the scroll more, which reads as depth.
  const driftFar = useTransform(scrollYProgress, [0, 1], [0, 240])
  const driftNear = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section ref={ref} id="top" className="relative pt-28 sm:pt-32">
      {/* Night sky: deep navy from the top with faint nebula haze. */}
      <motion.div
        aria-hidden
        style={{ y: driftFar }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1100px] bg-[radial-gradient(38%_32%_at_16%_22%,rgb(147_178_212/0.2),transparent_70%),radial-gradient(32%_28%_at_86%_14%,rgb(178_166_222/0.14),transparent_70%),radial-gradient(55%_38%_at_50%_70%,rgb(147_178_212/0.14),transparent_70%)] mask-[linear-gradient(to_bottom,black_55%,transparent)] dark:bg-[radial-gradient(38%_32%_at_16%_22%,rgb(70_105_170/0.11),transparent_70%),radial-gradient(32%_28%_at_86%_14%,rgb(112_86_182/0.08),transparent_70%),radial-gradient(55%_38%_at_50%_70%,rgb(55_95_160/0.08),transparent_70%),linear-gradient(to_bottom,rgb(13_20_40/0.5),rgb(10_15_30/0.35)_35%,transparent_80%)]"
      />
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1000px] bg-[radial-gradient(55%_45%_at_50%_42%,var(--hero-glow),transparent_72%)]"
      />
      <motion.div
        aria-hidden
        style={{ y: driftFar }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1100px] overflow-hidden mask-[radial-gradient(90%_78%_at_50%_30%,black_45%,transparent)]"
      >
        <SkyDust />
        <Starfield stars={farStars} />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: driftNear }}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] mask-[radial-gradient(55%_60%_at_50%_36%,black_30%,transparent)]"
      >
        <Starfield stars={nearStars} />
      </motion.div>

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
          <VideoDialog
            src={VIDEO_AD_SRC}
            title="Belgrade video ad"
            className="pl-2"
          >
            <span className="grid size-5 place-items-center rounded-full bg-foreground text-background">
              <Play className="ml-px size-2.5 fill-current" />
            </span>
            View video ad
          </VideoDialog>
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
        {/* Soft studio light behind the devices. */}
        <div
          aria-hidden
          className="absolute top-6 left-1/2 h-[560px] w-[min(920px,120vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(255_255_255/0.95),transparent)] dark:bg-[radial-gradient(closest-side,rgb(150_180_225/0.17),transparent)]"
        />
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
