import type { Metadata } from "next"

import { LegalPage } from "@/components/belgrade/legal-page"
import { SiteShell } from "@/components/belgrade/site-shell"

export const metadata: Metadata = {
  title: "Privacy policy",
}

export default function PrivacyPage() {
  return (
    <SiteShell>
      <LegalPage title="Privacy policy" updated="October 2026" />
    </SiteShell>
  )
}
