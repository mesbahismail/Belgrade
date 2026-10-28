import { SiteShell } from "@/components/belgrade/site-shell"
import { Bento } from "@/components/belgrade/sections/bento"
import { Benefits } from "@/components/belgrade/sections/benefits"
import { CallToAction } from "@/components/belgrade/sections/cta"
import { Faq } from "@/components/belgrade/sections/faq"
import { Features } from "@/components/belgrade/sections/features"
import { Hero } from "@/components/belgrade/sections/hero"
import { Integrations } from "@/components/belgrade/sections/integrations"
import { Partners } from "@/components/belgrade/sections/partners"
import { Reviews } from "@/components/belgrade/sections/reviews"
import { Showcase } from "@/components/belgrade/sections/showcase"
import { SmarterWay } from "@/components/belgrade/sections/smarter-way"
import { Divider } from "@/components/belgrade/ui"

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Partners />
      <Divider />
      <Features />
      <Divider />
      <Bento />
      <SmarterWay />
      <Divider />
      <Integrations />
      <Divider />
      <Reviews />
      <Divider />
      <Showcase />
      <Divider />
      <Benefits />
      <Divider />
      <Faq />
      <CallToAction />
    </SiteShell>
  )
}
