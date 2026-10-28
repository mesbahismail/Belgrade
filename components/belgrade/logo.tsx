import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  const id = React.useId()
  return (
    <svg
      viewBox="0 0 364 560"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-auto", className)}
    >
      <defs>
        <linearGradient
          id={`${id}-top`}
          x1="0"
          y1="0"
          x2="234"
          y2="265"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#b3cfee" />
          <stop offset="1" stopColor="#5a86b5" />
        </linearGradient>
        <linearGradient
          id={`${id}-mid`}
          x1="364"
          y1="244"
          x2="0"
          y2="429"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6b98c9" />
          <stop offset="1" stopColor="#2a4d78" />
        </linearGradient>
        <linearGradient
          id={`${id}-tail`}
          x1="174"
          y1="431"
          x2="34"
          y2="560"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3a6797" />
          <stop offset="1" stopColor="#1f3c5f" />
        </linearGradient>
      </defs>
      <path
        d="M233.853 212.121L176.361 265.344L0 104.904V0L233.853 212.121Z"
        fill={`url(#${id}-top)`}
      />
      <path
        d="M327.083 292.342L176.361 428.871L0 269.201V161.983L176.361 323.196L263.376 243.747H330.968C336.924 249.403 350.701 262.413 358.16 269.201C365.618 275.989 364.375 284.371 362.821 287.713L351.944 299.284C349.873 295.941 344.641 288.948 340.291 287.713C335.94 286.479 329.673 290.285 327.083 292.342Z"
        fill={`url(#${id}-mid)`}
      />
      <path
        d="M174.03 431.185H34.1844V560L174.03 431.185Z"
        fill={`url(#${id}-tail)`}
      />
    </svg>
  )
}

export function Logo({
  className,
  markClassName,
  href = "/",
}: {
  className?: string
  markClassName?: string
  href?: string
}) {
  return (
    <Link
      href={href}
      aria-label="Belgrade home"
      className={cn(
        "group/logo inline-flex items-center gap-1.5 text-xl font-medium tracking-tight text-foreground",
        className
      )}
    >
      <LogoMark
        className={cn(
          "transition-transform duration-500 ease-out group-hover/logo:-rotate-6 group-hover/logo:scale-105",
          markClassName
        )}
      />
      <span>Belgrade</span>
    </Link>
  )
}
