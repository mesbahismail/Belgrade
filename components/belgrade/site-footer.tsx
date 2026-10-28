import Link from "next/link"

import {
  FacebookIcon,
  InstagramIcon,
  TikTokIcon,
  XIcon,
} from "@/components/belgrade/brand-icons"
import { Logo } from "@/components/belgrade/logo"
import { Reveal } from "@/components/belgrade/motion"
import { Container } from "@/components/belgrade/ui"

const links = [
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "About", href: "/about" },
  { label: "Contact us", href: "/contact" },
]

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", icon: TikTokIcon },
]

export function SiteFooter() {
  return (
    <footer className="pt-24 pb-20 sm:pb-12">
      <Container>
        <Reveal className="flex flex-col items-center">
          <Logo className="gap-2 text-[30px]" markClassName="h-11" />
          <nav aria-label="Footer" className="mt-14">
            <ul className="flex flex-wrap justify-center gap-x-12 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-[17px] text-foreground/75 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        <div className="mt-14 grid items-center gap-6 text-center text-[17px] font-light text-muted-foreground md:grid-cols-3 md:text-left">
          <p className="order-3 md:order-1">
            Designed with care by{" "}
            <a
              href="https://themefellas.com"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-brand"
            >
              ThemeFellas
            </a>
          </p>
          <ul className="order-1 flex justify-center gap-6 md:order-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="block text-foreground/65 transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
                >
                  <Icon className="size-[22px]" />
                </a>
              </li>
            ))}
          </ul>
          <p className="order-2 md:order-3 md:text-right">
            © 2026 Belgrade. All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  )
}
