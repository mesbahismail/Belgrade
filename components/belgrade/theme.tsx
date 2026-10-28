"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import { Moon, Sun } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useIntro } from "@/components/belgrade/motion"

type Theme = "light" | "dark"

// Same storage key and class strategy as next-themes, so both can coexist.
const STORAGE_KEY = "theme"

const themeScript = `(function(){var d=true;try{var s=localStorage.getItem("${STORAGE_KEY}");d=s==="system"?matchMedia("(prefers-color-scheme: dark)").matches:s!=="light"}catch(_){}var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light"})()`

/**
 * Applies the saved theme before first paint. Dark is the default until the
 * visitor picks light.
 * Renders as an inert `text/plain` script on the client to avoid React's
 * script-tag warning; the server-rendered copy is the one that executes.
 */
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  )
}

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light"

const getServerSnapshot = (): Theme | null => null

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {}
}

export function useTheme() {
  const theme = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )

  const setTheme = React.useCallback(
    (next: Theme, origin?: { x: number; y: number }) => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      if (!document.startViewTransition || reduced || !origin) {
        applyTheme(next)
        return
      }

      const { x, y } = origin
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      const transition = document.startViewTransition(() => {
        flushSync(() => applyTheme(next))
      })

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        )
      })
    },
    []
  )

  return { theme, setTheme }
}

const options = [
  { value: "dark", label: "Dark theme", icon: Moon },
  { value: "light", label: "Light theme", icon: Sun },
] as const

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const intro = useIntro()

  return (
    <motion.div
      role="radiogroup"
      aria-label="Color theme"
      initial={intro ? { opacity: 0, y: 16, scale: 0.9 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "fixed right-4 bottom-4 z-50 flex items-center gap-0.5 rounded-xl border border-border bg-surface p-1 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.25)] backdrop-blur-xl",
        className
      )}
    >
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={(event) =>
              setTheme(value, { x: event.clientX, y: event.clientY })
            }
            className={cn(
              "relative grid size-7 place-items-center rounded-lg transition-colors duration-300",
              active
                ? "text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId="belgrade-theme-thumb"
                className="absolute inset-0 rounded-lg bg-foreground"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <motion.span
              className="relative"
              animate={{ rotate: active ? 0 : -45, scale: active ? 1 : 0.85 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <Icon className="size-3.5" strokeWidth={2.25} />
            </motion.span>
          </button>
        )
      })}
    </motion.div>
  )
}
