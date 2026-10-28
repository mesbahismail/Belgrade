"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { EASE_OUT } from "@/components/belgrade/motion"
import { Container, SectionHeading } from "@/components/belgrade/ui"

const reviews = [
  {
    quote:
      "This wallet app has transformed the way I manage my finances. It's user-friendly and keeps everything organized.",
    name: "Maya Thompson",
    role: "Small Business Owner",
  },
  {
    quote:
      "I love how easy it is to track my spending with this wallet app. Highly recommend it to anyone looking for financial clarity!",
    name: "Liam Carter",
    role: "Software Engineer",
  },
  {
    quote:
      "I can't believe how much easier my finances feel since I started using this wallet app. It's a game changer!",
    name: "Olivia Martin",
    role: "Content Creator",
  },
  {
    quote:
      "Finally, a wallet app that simplifies my budgeting! The features are intuitive and really help me stay on top of my expenses.",
    name: "Daniel Reynolds",
    role: "Freelance Designer",
  },
  {
    quote:
      "This app has made managing my money a breeze. The interface is clean and the tools are incredibly helpful.",
    name: "Ethan Brooks",
    role: "Graduate Student",
  },
  {
    quote:
      "The best wallet app I've ever used! It offers great insights into my spending habits and helps me save more.",
    name: "Noah Davis",
    role: "Photographer",
  },
  {
    quote:
      "This wallet app is fantastic! It keeps my finances in check and I love the budgeting features it offers.",
    name: "Sara Johnson",
    role: "Marketing Manager",
  },
  {
    quote:
      "I highly recommend this wallet app. It's made tracking my expenses so much simpler and more efficient.",
    name: "Lucas White",
    role: "Product Manager",
  },
  {
    quote:
      "What a find! This is the wallet app that actually works. It's user-friendly and has helped me reach my savings goals.",
    name: "Isabella Lee",
    role: "Startup Founder",
  },
]

const columns = [reviews.slice(0, 3), reviews.slice(3, 6), reviews.slice(6, 9)]

function useIsDesktop() {
  return React.useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(min-width: 768px)")
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => false
  )
}

export function Reviews() {
  const ref = React.useRef<HTMLDivElement>(null)
  const desktop = useIsDesktop()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const outer = useTransform(scrollYProgress, [0, 1], [30, -30])
  const middle = useTransform(scrollYProgress, [0, 1], [-20, 40])

  return (
    <section id="reviews" className="scroll-mt-24 py-24">
      <SectionHeading
        badge="Reviews"
        title="Loved by Users."
        accent="Trusted by Pros."
        inline
      />
      <Container>
        <div
          ref={ref}
          className="mx-auto mt-14 grid max-w-[1272px] gap-4 md:grid-cols-3"
        >
          {columns.map((column, ci) => (
            <motion.div
              key={ci}
              style={desktop ? { y: ci === 1 ? middle : outer } : undefined}
              className={cn("flex flex-col gap-4", ci === 1 && "md:mt-6")}
            >
              {column.map((review, ri) => (
                <motion.figure
                  key={review.name}
                  initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{
                    duration: 0.7,
                    delay: ci * 0.08 + ri * 0.05,
                    ease: EASE_OUT,
                  }}
                  className="rounded-xl border border-black/5 bg-card p-6 shadow-[0_12px_32px_-20px_rgb(0_0_0/0.4)] transition-[translate,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgb(0_0_0/0.45)] dark:border-white/[0.06]"
                >
                  <blockquote className="text-sm leading-relaxed text-foreground/85">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <div className="mt-5 flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </div>
                  <figcaption className="mt-5">
                    <div className="text-sm font-medium">{review.name}</div>
                    <div className="mt-0.5 text-xs font-light text-muted-foreground">
                      {review.role}
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
