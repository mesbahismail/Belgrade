import {
  Atom,
  Clover,
  Feather,
  Hexagon,
  Infinity as InfinityIcon,
  Mountain,
  Orbit,
  Sun,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/belgrade/motion"
import { SectionHeading } from "@/components/belgrade/ui"

// Placeholder brands — swap in your partners' logos.
const partners: { name: string; icon: LucideIcon; className: string }[] = [
  { name: "Hexacore", icon: Hexagon, className: "font-semibold tracking-tight" },
  { name: "orbitly", icon: Orbit, className: "font-medium lowercase" },
  { name: "LUMEN", icon: Sun, className: "font-bold tracking-[0.22em]" },
  { name: "Quillby", icon: Feather, className: "font-serif italic" },
  { name: "Summit", icon: Mountain, className: "font-semibold" },
  { name: "NUCLEO", icon: Atom, className: "font-extrabold tracking-widest" },
  { name: "Loopway", icon: InfinityIcon, className: "font-medium" },
  { name: "Clover&Co", icon: Clover, className: "font-serif" },
]

export function Partners() {
  return (
    <section className="pt-12 pb-20 sm:pt-20">
      <SectionHeading
        title="Partnering with the World's Most"
        accent="Reliable Brands"
      />
      <Reveal
        delay={0.15}
        className="group relative mt-12 overflow-hidden mask-[linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
      >
        <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...partners, ...partners].map(({ name, icon: Icon, className }, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= partners.length}
              className={cn(
                "mx-10 flex items-center gap-2 text-[22px] text-foreground/35 transition-colors duration-300 hover:text-foreground/80 sm:mx-14",
                className
              )}
            >
              <Icon className="size-6" strokeWidth={1.75} />
              {name}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
