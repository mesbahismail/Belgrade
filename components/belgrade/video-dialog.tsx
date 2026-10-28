"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { SoftButton } from "@/components/belgrade/ui"

/**
 * A button that opens a video in a modal `<dialog>`. The native dialog traps
 * focus, closes on Escape and returns focus to the button. The video is only
 * fetched once the dialog opens.
 */
export function VideoDialog({
  src,
  poster,
  title = "Video",
  className,
  children,
}: {
  src: string
  poster?: string
  title?: string
  className?: string
  children: React.ReactNode
}) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = React.useState(false)

  function open() {
    dialogRef.current?.showModal()
    document.documentElement.style.overflow = "hidden"
    videoRef.current?.play().catch(() => {})
  }

  function handleClose() {
    videoRef.current?.pause()
    document.documentElement.style.overflow = ""
  }

  return (
    <>
      <SoftButton onClick={open} className={className}>
        {children}
      </SoftButton>

      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={handleClose}
        // Clicks on the backdrop land on the dialog itself.
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        className="m-auto w-[min(960px,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 opacity-0 transition-[opacity,scale,display,overlay] transition-discrete duration-300 ease-out scale-95 open:scale-100 open:opacity-100 starting:open:scale-95 starting:open:opacity-0 backdrop:bg-black/0 backdrop:transition-[background-color,display,overlay] backdrop:transition-discrete backdrop:duration-300 open:backdrop:bg-black/75 starting:open:backdrop:bg-black/0"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)]">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            playsInline
            preload="none"
            onError={() => setFailed(true)}
            className="aspect-video w-full bg-black"
          />
          {failed && (
            <p className="absolute inset-0 grid place-items-center text-sm text-white/60">
              Video unavailable
            </p>
          )}
          <button
            type="button"
            aria-label="Close video"
            onClick={() => dialogRef.current?.close()}
            className={cn(
              "absolute top-3 right-3 grid size-9 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/75",
              "outline-none focus-visible:ring-3 focus-visible:ring-white/40"
            )}
          >
            <X className="size-4" />
          </button>
        </div>
      </dialog>
    </>
  )
}
