"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CircleCheck, LoaderCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { EASE_OUT } from "@/components/belgrade/motion"
import { SplitItem } from "@/components/belgrade/split-card"
import { BrandButton } from "@/components/belgrade/ui"

const fields = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const

const control =
  "h-9 rounded-lg border-border bg-transparent px-3 text-[15px] font-light shadow-none placeholder:text-muted-foreground/70 focus-visible:border-brand focus-visible:ring-brand/20 md:text-[15px] dark:bg-transparent"

/**
 * Demo form: it validates and shows a success state, but does not send
 * anything. Wire `onSubmit` to a Server Action or API route.
 */
export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">(
    "idle"
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("sending")
    await new Promise((resolve) => setTimeout(resolve, 900))
    setStatus("sent")
  }

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mt-10 flex flex-col items-start gap-3"
          role="status"
        >
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            className="grid size-12 place-items-center rounded-full bg-brand/15 text-brand"
          >
            <CircleCheck className="size-6" />
          </motion.span>
          <p className="text-xl tracking-tight">Thanks — message received!</p>
          <p className="text-[15px] font-light text-muted-foreground">
            We usually reply within one business day.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-2 text-sm text-brand underline underline-offset-4"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-4"
        >
          {fields.map((field) => (
            <SplitItem key={field.name} className="flex flex-col gap-1.5">
              <Label
                htmlFor={field.name}
                className="gap-0.5 pl-1 text-xs font-light text-foreground/75"
              >
                {field.label}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder="Enter"
                required
                className={control}
              />
            </SplitItem>
          ))}
          <SplitItem className="flex flex-col gap-1.5">
            <Label
              htmlFor="message"
              className="gap-0.5 pl-1 text-xs font-light text-foreground/75"
            >
              Your message
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Enter"
              required
              rows={6}
              className={cn(control, "h-36 resize-none py-2")}
            />
          </SplitItem>
          <SplitItem className="mt-4 flex justify-end">
            <BrandButton
              type="submit"
              disabled={status === "sending"}
              className="h-10 px-4.5 text-base"
            >
              {status === "sending" && (
                <LoaderCircle className="animate-spin" />
              )}
              Send message
            </BrandButton>
          </SplitItem>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
