import type { Metadata } from "next"
import { Mail } from "lucide-react"

import { SiteShell } from "@/components/belgrade/site-shell"
import { SplitCard, SplitItem } from "@/components/belgrade/split-card"
import { BrandButton, Pill } from "@/components/belgrade/ui"

export const metadata: Metadata = {
  title: "About us",
  description:
    "Belgrade is built by a small, focused team who believe finance should feel effortless.",
}

const story = [
  "We're a small, focused team of designers, developers, and problem-solvers who believe managing your money should feel empowering — not overwhelming. Belgrade was born from frustration with clunky banking apps, hidden fees, and fragmented tools.",
  "Our mission is simple: build a wallet that just works — beautifully, securely, and globally.",
  "We're independent, user-first, and obsessed with getting the details right. Every feature we build is designed to simplify your financial life, not complicate it.",
  "We're not backed by a big bank — we're backed by belief in better.",
]

export default function AboutPage() {
  return (
    <SiteShell>
      <SplitCard
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=80&auto=format&fit=crop"
        imageAlt="The Belgrade team working together around a table"
      >
        <SplitItem>
          <Pill size="lg">About us</Pill>
        </SplitItem>
        <SplitItem>
          <h1 className="mt-9 text-[clamp(1.75rem,3vw,2.15rem)] leading-[1.25] font-normal tracking-[-0.025em]">
            Built by People Who Believe Finance Should Feel Effortless
          </h1>
        </SplitItem>
        <SplitItem className="mt-5 space-y-1 text-[16px] leading-[1.65] font-light text-muted-foreground">
          {story.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </SplitItem>
        <SplitItem>
          <BrandButton href="/contact" className="mt-8 h-10 text-base">
            <Mail />
            Contact us
          </BrandButton>
        </SplitItem>
      </SplitCard>
    </SiteShell>
  )
}
