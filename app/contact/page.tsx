import type { Metadata } from "next"

import { ContactForm } from "@/components/belgrade/contact-form"
import { SiteShell } from "@/components/belgrade/site-shell"
import { SplitCard, SplitItem } from "@/components/belgrade/split-card"

export const metadata: Metadata = {
  title: "Contact us",
  description: "Questions, feedback or partnership ideas? Get in touch with the Belgrade team.",
}

export default function ContactPage() {
  return (
    <SiteShell>
      <SplitCard
        image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&auto=format&fit=crop"
        imageAlt="Two colleagues celebrating with a high five at their desk"
      >
        <SplitItem>
          <h1 className="text-[clamp(1.9rem,3vw,2.15rem)] leading-tight font-normal tracking-[-0.025em]">
            Contact us
          </h1>
        </SplitItem>
        <ContactForm />
      </SplitCard>
    </SiteShell>
  )
}
