"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { AppleIcon } from "@/components/belgrade/brand-icons"
import { Logo } from "@/components/belgrade/logo"
import { EASE_OUT, useIntro } from "@/components/belgrade/motion"
import { BrandButton } from "@/components/belgrade/ui"

export const navLinks = [
  { label: "Benefits", href: "/#benefits" },
  { label: "Integrations", href: "/#integrations" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
]

export function SiteHeader() {
  const intro = useIntro()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = React.useState(false)
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24))

  return (
    <motion.header
      initial={intro ? { y: -32, opacity: 0 } : false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className="fixed inset-x-0 top-4 z-50 px-4 sm:top-5"
    >
      <div
        className={cn(
          "relative mx-auto max-w-[792px] rounded-2xl border border-black/[0.07] bg-surface backdrop-blur-2xl backdrop-saturate-150 transition-[box-shadow,background-color] duration-500 dark:border-white/10",
          scrolled
            ? "shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_18px_40px_-18px_rgb(0_0_0/0.45)]"
            : "shadow-[inset_0_1px_0_rgb(255_255_255/0.1),0_14px_30px_-20px_rgb(0_0_0/0.35)]"
        )}
      >
        {/* Glass edge: a soft highlight along the top rim. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 -top-px h-px bg-linear-to-r from-transparent via-white/70 to-transparent dark:via-white/35"
        />
        <div className="flex h-14 items-center justify-between pr-3 pl-4">
          <Logo className="text-[19px]" markClassName="h-6" />

          <nav
            aria-label="Main"
            className="hidden items-center md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative px-4 py-1.5 text-sm text-foreground/75 transition-colors hover:text-foreground"
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="belgrade-nav-hover"
                    className="absolute inset-0 rounded-lg bg-foreground/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <BrandButton href="/#download" className="h-8 px-3 text-sm">
              <AppleIcon className="-mt-0.5 size-3.5" />
              Download
            </BrandButton>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-8 place-items-center rounded-lg text-foreground/80 hover:bg-foreground/5 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="size-4" /> : <Menu className="size-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-1 border-t border-border p-3">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-foreground/5"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
