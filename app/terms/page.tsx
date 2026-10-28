import type { Metadata } from "next"

import { LegalPage } from "@/components/belgrade/legal-page"
import { SiteShell } from "@/components/belgrade/site-shell"

export const metadata: Metadata = {
  title: "Terms of service",
}

export default function TermsPage() {
  return (
    <SiteShell>
      <LegalPage title="Terms of service" updated="October 2026" />
    </SiteShell>
  )
}
