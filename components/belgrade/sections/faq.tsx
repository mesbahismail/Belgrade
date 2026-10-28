"use client"

import * as React from "react"
import { AnimatePresence, motion, useInView } from "motion/react"

import { EASE_OUT } from "@/components/belgrade/motion"
import { Container, SectionHeading } from "@/components/belgrade/ui"

const faqs = [
  {
    q: "Is my money and data safe with this app?",
    a: "Absolutely. We use bank-level encryption and two-factor authentication to keep your funds and personal data secure at all times.",
  },
  {
    q: "What can I do with this wallet app?",
    a: "You can send and receive money, pay bills, track your spending, and manage multiple accounts — all in one place.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No hidden fees. You'll always see what you're being charged, and most basic features are completely free.",
  },
  {
    q: "Do I need a bank account to use the app?",
    a: "No. You can fund your wallet with cash top-ups, debit or credit cards, or by receiving money from other users — no bank account required.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-24">
      <SectionHeading
        badge="FAQ"
        title="Got Questions?"
        accent="We've Got Answers."
        inline
      />
      <Container>
        <div className="mx-auto mt-14 flex max-w-[790px] flex-col gap-6">
          {faqs.map((faq) => (
            <ChatPair key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </Container>
    </section>
  )
}

/** A question bubble, a brief typing indicator, then the answer. */
function ChatPair({ question, answer }: { question: string; answer: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -18% 0px" })
  const [answered, setAnswered] = React.useState(false)

  React.useEffect(() => {
    if (!inView) return
    const id = window.setTimeout(() => setAnswered(true), 1100)
    return () => window.clearTimeout(id)
  }, [inView])

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <motion.p
        initial={{ opacity: 0, y: 14, scale: 0.94 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="w-fit max-w-[85%] origin-bottom-left rounded-2xl border border-black/5 bg-card px-4 py-3 text-[13px] font-medium shadow-[0_10px_24px_-14px_rgb(0_0_0/0.4)] dark:border-white/10"
      >
        {question}
      </motion.p>

      <div className="flex min-h-11 justify-end">
        <AnimatePresence mode="wait" initial={false}>
          {inView && !answered && (
            <motion.div
              key="typing"
              aria-hidden
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.25, delay: 0.25 },
              }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
              className="flex h-11 origin-bottom-right items-center gap-1 rounded-2xl border border-border bg-card/50 px-4"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 animate-typing rounded-full bg-muted-foreground"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </motion.div>
          )}
          {answered && (
            <motion.p
              key="answer"
              initial={{ opacity: 0, y: 10, scale: 0.96, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="w-full max-w-[560px] origin-top-right rounded-2xl border border-border bg-foreground/[0.015] px-4 py-3 text-[13px] leading-relaxed font-light text-muted-foreground"
            >
              {answer}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
