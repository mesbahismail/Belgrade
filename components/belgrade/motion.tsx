"use client"

import * as React from "react"
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useMotionValue,
  useTransform,
  type HTMLMotionProps,
} from "motion/react"

import { cn } from "@/lib/utils"

export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

// Entrance animations only play on the first page load, not on every
// client-side navigation that remounts the shell.
let hasPlayedIntro = false

export function useIntro() {
  const [first] = React.useState(() => !hasPlayedIntro)
  React.useEffect(() => {
    hasPlayedIntro = true
  }, [])
  return first
}

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
  y?: number
  blur?: boolean
}

export function Reveal({
  delay = 0,
  y = 24,
  blur = true,
  children,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  stagger = 0.08,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

export function StaggerItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={staggerItem} {...props} />
}

/** Splits a string into words that blur-fade in one after another. */
export function WordsReveal({
  text,
  delay = 0,
  stagger = 0.06,
  className,
}: {
  text: string
  delay?: number
  stagger?: number
  className?: string
}) {
  const words = text.split(" ")
  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <motion.span
            className="inline-block will-change-transform"
            initial={{ opacity: 0, y: "0.35em", filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: EASE_OUT,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  )
}

/** Animated currency figure, e.g. $31,204.94 with muted cents. */
export function CountUp({
  value,
  prefix = "$",
  from = 0.86,
  duration = 1.8,
  className,
  centsClassName,
}: {
  value: number
  prefix?: string
  /** Start value as a fraction of `value`. */
  from?: number
  duration?: number
  className?: string
  centsClassName?: string
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const count = useMotionValue(value * from)

  const whole = useTransform(count, (v) => {
    const cents = Math.round(v * 100)
    return prefix + Math.floor(cents / 100).toLocaleString("en-US")
  })
  const fraction = useTransform(count, (v) => {
    const cents = Math.round(v * 100) % 100
    return "." + String(cents).padStart(2, "0")
  })

  React.useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration, ease: EASE_OUT })
    return () => controls.stop()
  }, [inView, count, value, duration])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <motion.span>{whole}</motion.span>
      <motion.span className={cn("text-muted-foreground/70", centsClassName)}>
        {fraction}
      </motion.span>
    </span>
  )
}
