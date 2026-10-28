import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Reveal } from "@/components/belgrade/motion"

const shine =
  "relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:-left-full before:w-full before:bg-linear-to-r before:from-transparent before:via-white/35 before:to-transparent before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[200%]"

const buttonBase =
  "inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3.5 text-[15px] whitespace-nowrap outline-none transition-[filter,background-color,box-shadow,translate] focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

const buttonVariants = {
  brand:
    "border border-brand-edge bg-linear-to-b from-brand-from to-brand-to text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-10px_rgb(74_119_166/0.9)] hover:brightness-110",
  soft: "border border-border bg-card text-foreground shadow-[0_4px_14px_-6px_rgb(0_0_0/0.18)] before:via-foreground/5 hover:bg-muted/60",
}

type ButtonProps = React.ComponentProps<"button"> & { href?: never }
type LinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string
}

function createButton(variant: keyof typeof buttonVariants) {
  return function BelgradeButton({ className, ...props }: ButtonProps | LinkProps) {
    const classes = cn(shine, buttonBase, buttonVariants[variant], className)
    if (typeof props.href === "string") {
      return <Link {...(props as LinkProps)} className={classes} />
    }
    return <button type="button" {...(props as ButtonProps)} className={classes} />
  }
}

/** Gradient call-to-action. Pass `href` to render a link. */
export const BrandButton = createButton("brand")

/** Neutral secondary action. Pass `href` to render a link. */
export const SoftButton = createButton("soft")

export function Pill({
  className,
  size = "sm",
  ...props
}: React.ComponentProps<"span"> & { size?: "sm" | "lg" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/5 bg-card text-foreground shadow-[0_6px_16px_-8px_rgb(0_0_0/0.3)] dark:border-white/10",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-[15px]",
        className
      )}
      {...props}
    />
  )
}

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1304px] px-4 sm:px-6", className)}
      {...props}
    />
  )
}

export function Divider({ className }: { className?: string }) {
  return (
    <Container>
      <div
        className={cn(
          "h-px w-full bg-linear-to-r from-transparent via-border to-transparent",
          className
        )}
      />
    </Container>
  )
}

export function SectionHeading({
  badge,
  title,
  accent,
  inline = false,
  description,
  className,
  as: Heading = "h2",
}: {
  badge?: string
  title: React.ReactNode
  accent?: React.ReactNode
  inline?: boolean
  description?: React.ReactNode
  className?: string
  as?: "h1" | "h2"
}) {
  return (
    <Reveal
      className={cn(
        "mx-auto flex max-w-2xl flex-col items-center text-center",
        className
      )}
    >
      {badge && <Pill className="mb-4">{badge}</Pill>}
      <Heading className="text-[clamp(1.6rem,3vw,2.1rem)] leading-[1.22] font-normal tracking-[-0.025em] text-balance">
        {title}
        {accent && (
          <>
            {inline ? " " : <br />}
            <span className="text-brand-soft">{accent}</span>
          </>
        )}
      </Heading>
      {description && (
        <p className="mt-4 max-w-[480px] text-[15px] leading-relaxed font-light text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  )
}
