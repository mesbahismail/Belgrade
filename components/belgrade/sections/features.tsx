import { Sparkles, WalletCards, Zap } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/belgrade/motion"
import { Container, SectionHeading } from "@/components/belgrade/ui"

const features = [
  {
    title: "Unified Wallet",
    description:
      "Manage all your accounts, cards, and transactions in one sleek dashboard. No more switching between apps.",
    icon: WalletCards,
  },
  {
    title: "Instant Payments",
    description:
      "Send, receive, and pay bills in seconds — with complete transparency, real-time notifications, and bank-level security.",
    icon: Zap,
  },
  {
    title: "AI Reports & Insights",
    description:
      "Let Belgrade's AI break down your spending, generate custom reports, and forecast your cash flow — instantly.",
    icon: Sparkles,
  },
]

export function Features() {
  return (
    <section className="py-24">
      <SectionHeading
        title="Smarter Features for Total"
        accent="Financial Control"
      />
      <Container>
        <Stagger className="mx-auto mt-16 grid max-w-[1100px] gap-12 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <StaggerItem
              key={title}
              className="group flex flex-col items-center text-center"
            >
              <span className="grid size-14 place-items-center rounded-full border border-black/5 bg-card shadow-[0_10px_24px_-12px_rgb(0_0_0/0.35)] transition-transform duration-500 ease-out group-hover:-translate-y-1 dark:border-white/10">
                <Icon
                  className="size-5 text-foreground/80 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-12"
                  strokeWidth={1.75}
                />
              </span>
              <h3 className="mt-6 text-[17px] font-medium tracking-tight">
                {title}
              </h3>
              <p className="mt-3 max-w-[310px] text-sm leading-relaxed font-light text-muted-foreground">
                {description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
