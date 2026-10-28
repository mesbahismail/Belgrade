import * as React from "react"
import { Plus_Jakarta_Sans } from "next/font/google"

import { cn } from "@/lib/utils"
import { MotionProvider } from "@/components/belgrade/motion"
import { SiteFooter } from "@/components/belgrade/site-footer"
import { SiteHeader } from "@/components/belgrade/site-header"
import { ThemeScript, ThemeToggle } from "@/components/belgrade/theme"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
})

/** Header, footer, font, theme and motion settings shared by every page. */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        jakarta.variable,
        "belgrade relative isolate flex min-h-svh flex-col overflow-x-clip bg-background font-belgrade text-foreground antialiased"
      )}
    >
      <ThemeScript />
      <MotionProvider>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ThemeToggle />
      </MotionProvider>
    </div>
  )
}
