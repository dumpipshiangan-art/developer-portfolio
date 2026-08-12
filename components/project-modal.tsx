"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import type { Project } from "@/components/project-card"

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const TAG_ICONS: Record<string, string> = {
    HTML: "/images/html.svg",
    CSS: "/images/css.svg",
    JS: "/images/javascript.svg",
    "C#": "/images/csharp.svg",
    VB: "/images/vbnet.svg",
    BS: "/images/bootstrap.svg",
    NODE: "/images/nodejs.svg",
    Node: "/images/nodejs.svg",
    NODEJS: "/images/nodejs.svg",
    EXP: "/images/expressjs.svg",
    EXPRESS: "/images/expressjs.svg",
    SB: "/images/supabase.svg",
    TS: "/images/typescript.svg",
    HS: "/images/heidisql.png",
  }
  const [slide, setSlide] = useState(0)

  const gallery = project?.gallery ?? []
  const count = gallery.length

  const go = useCallback(
    (dir: number) => {
      if (count === 0) return
      setSlide((s) => (s + dir + count) % count)
    },
    [count],
  )

  // reset to first slide whenever a new project opens
  useEffect(() => {
    setSlide(0)
  }, [project?.id])

  // keyboard: esc to close, arrows to navigate; lock body scroll
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [project, go, onClose])

  if (!project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* backdrop */}
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-sm"
      />

      {/* panel */}
      <div className="hero-rise hud-card relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-blood/30 bg-ink-soft/70 shadow-[0_0_60px_-12px_var(--blood)] backdrop-blur-xl">
        {/* red glow header wash */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blood/30 to-transparent"
        />
        {/* corner brackets */}
        <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-blood/70" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-blood/70" />

        {/* scrollable content */}
        <div className="relative overflow-y-auto p-6 sm:p-8">
          {/* close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-paper transition-all duration-300 hover:border-blood hover:bg-blood hover:text-paper"
          >
            <X className="h-5 w-5" />
          </button>

          {/* eyebrow */}
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-7 rounded-full bg-blood" />
            <span className="font-mono text-xs font-semibold tracking-[0.35em] text-paper-dim">
              PROJECT {project.index}
            </span>
          </div>

          {/* title + description */}
          <h3 className="pr-12 font-mono text-2xl font-bold leading-tight text-paper sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl font-mono text-sm leading-relaxed text-paper-dim">
            {project.description}
          </p>

          {/* carousel */}
          <div className="relative mt-6 overflow-hidden rounded-lg border border-white/10 bg-ink">
            {/* scanline sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-gradient-to-b from-blood/15 to-transparent"
              style={{ animation: "hero-scan 3s linear infinite" }}
            />
            <span className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-white/10" />

            {/* HUD readout corner */}
            <span className="absolute right-3 top-3 z-20 rounded border border-blood/40 bg-ink/70 px-2 py-0.5 font-mono text-[10px] tracking-widest text-blood">
              {String(slide + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>

            {/* slides track */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${slide * 100}%)` }}
            >
              {gallery.map((src, i) => (
                <div key={src} className="w-full flex-shrink-0">
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={900}
                    height={560}
                    className="w-full h-auto object-contain bg-ink/80"
                  />
                </div>
              ))}
            </div>

            {/* arrows */}
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-paper backdrop-blur transition-all duration-300 hover:border-blood hover:bg-blood"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-ink/70 text-paper backdrop-blur transition-all duration-300 hover:border-blood hover:bg-blood"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* dots */}
          {count > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  aria-label={`Go to image ${i + 1}`}
                  aria-current={i === slide}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === slide ? "w-6 bg-blood" : "w-2 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* footer: actions + tech badges */}
          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="group/btn flex items-center gap-2 rounded-md border border-blood/70 px-5 py-2.5 font-mono text-sm font-semibold tracking-widest text-blood transition-all duration-300 hover:bg-blood hover:text-paper hover:shadow-[0_0_24px_-6px_var(--blood)]"
              >
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                Live Preview
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-md border border-white/15 bg-ink/60 px-5 py-2.5 font-mono text-sm font-semibold tracking-widest text-paper transition-all duration-300 hover:border-paper/40"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </div>

            <ul className="flex flex-wrap gap-2.5">
              {project.tags.map((tag) => {
                const lookup = TAG_ICONS[tag] || TAG_ICONS[tag.toUpperCase()]
                return (
                  <li
                    key={tag}
                    className="relative flex h-11 w-11 items-center justify-center"
                  >
                    <span
                      className="absolute inset-0 bg-blood/40"
                      style={{ clipPath: hexClip }}
                    />
                    <span
                      className="absolute inset-[1.5px] bg-ink"
                      style={{ clipPath: hexClip }}
                    />
                    {lookup ? (
                      <div className="relative flex items-center justify-center">
                        <Image
                          src={lookup}
                          alt={tag}
                          width={28}
                          height={28}
                          className="relative h-6 w-6 object-contain"
                        />
                      </div>
                    ) : (
                      <span className="relative font-mono text-[10px] font-bold text-paper">
                        {tag}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
