"use client"

import * as React from "react"
import { motion } from "motion/react"

import { EASE_OUT } from "@/components/belgrade/motion"
import { Container } from "@/components/belgrade/ui"

/** Bordered two-column card with copy on the left and a photo on the right. */
export function SplitCard({
  image,
  imageAlt,
  children,
}: {
  image: string
  imageAlt: string
  children: React.ReactNode
}) {
  return (
    <section className="pt-32 pb-8 sm:pt-40">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="grid overflow-hidden rounded-[20px] border border-border md:min-h-[656px] md:grid-cols-2"
        >
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
            className="flex flex-col justify-center px-6 py-12 sm:px-16 sm:py-16"
          >
            {children}
          </motion.div>

          <div className="relative min-h-[360px] overflow-hidden border-border max-md:order-first max-md:border-b md:border-l">
            <motion.img
              src={image}
              alt={imageAlt}
              initial={{ clipPath: "inset(0 0 0 100%)", scale: 1.15 }}
              animate={{ clipPath: "inset(0 0 0 0%)", scale: 1 }}
              transition={{ duration: 1.3, delay: 0.15, ease: EASE_OUT }}
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export const splitItem = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

export function SplitItem({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <motion.div variants={splitItem} className={className}>
      {children}
    </motion.div>
  )
}
