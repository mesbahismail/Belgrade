"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"

import { AppleIcon } from "@/components/belgrade/brand-icons"
import { LogoMark } from "@/components/belgrade/logo"
import { Reveal } from "@/components/belgrade/motion"
import { Phone } from "@/components/belgrade/phone"
import { CardsScreen, SplashScreen } from "@/components/belgrade/screens"
import { BrandButton, Container } from "@/components/belgrade/ui"

export function CallToAction() {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), {
    stiffness: 120,
    damping: 18,
  })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 18,
  })

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section id="download" className="scroll-mt-24 py-12">
      <Container>
        <Reveal>
          <div
            onPointerMove={handleMove}
            onPointerLeave={() => {
              px.set(0)
              py.set(0)
            }}
            className="relative grid overflow-hidden rounded-2xl border border-border bg-linear-to-br from-card/80 via-card/30 to-transparent md:min-h-[400px] md:grid-cols-2"
          >
            <div className="relative z-10 flex flex-col justify-center px-8 pt-12 sm:px-14 md:py-14">
              <span className="flex items-center gap-1.5 text-[22px] font-medium tracking-tight">
                <LogoMark className="h-7" />
                Belgrade
              </span>
              <h2 className="mt-6 text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.22] font-normal tracking-[-0.025em]">
                Ready to Wallet Smarter?
                <br />
                <span className="text-brand-soft">Get Belgrade Now</span>
              </h2>
              <BrandButton href="#" className="mt-8 w-fit">
                <AppleIcon className="-mt-0.5" />
                Download
              </BrandButton>
            </div>

            <div className="relative h-[380px] overflow-hidden mask-[linear-gradient(to_bottom,black_60%,transparent)] perspective-[1200px] md:h-auto">
              <motion.div
                style={{ rotateX, rotateY }}
                className="absolute inset-0 transform-3d"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-14 left-[1%] rotate-[14deg] [zoom:0.85]"
                >
                  <Phone className="dark">
                    <SplashScreen />
                  </Phone>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  className="absolute top-4 left-[57%] rotate-[11deg] [zoom:0.85]"
                >
                  <Phone>
                    <CardsScreen />
                  </Phone>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
