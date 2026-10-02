"use client"

import { useCallback, useState } from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, ArrowRight } from "lucide-react"
import HeroTyping from "@/components/hero-typing"

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 28, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 28, damping: 18 })
  const glowX = useMotionTemplate`${springX}%`
  const glowY = useMotionTemplate`${springY}%`

  const [glowOn, setGlowOn] = useState(false)

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion) return
      const r = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      mouseX.set(Math.min(100, Math.max(0, x)))
      mouseY.set(Math.min(100, Math.max(0, y)))
    },
    [mouseX, mouseY, reduceMotion],
  )

  const scrollToSection = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <section
      id="hero"
      onPointerMove={onMove}
      onPointerEnter={() => setGlowOn(true)}
      onPointerLeave={() => setGlowOn(false)}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-orange-500/[0.07] via-transparent to-background"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 cyber-scanline" aria-hidden />

      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-orange-500/20 blur-[100px]"
          style={{ left: glowOn ? glowX : "50%", top: glowOn ? glowY : "35%", x: "-50%", y: "-50%" }}
          animate={{ opacity: glowOn ? 0.95 : 0.55 }}
          transition={{ duration: 0.35 }}
        />
      )}
      <div className="pointer-events-none absolute bottom-10 right-[-4rem] h-72 w-72 rounded-full bg-orange-600/15 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 lg:items-center">
        <div className="text-center lg:col-span-7 lg:text-left">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-orange-400/80"
          >
            Available for ambitious builds
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="mb-4 text-5xl font-bold sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-600 bg-clip-text text-transparent animate-glow">
              Zaki Oussama
            </span>
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-6 text-xl font-semibold text-orange-500 sm:text-2xl"
          >
            Software engineer · AI · Automation · Web
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.55 }}
            className="mb-6"
          >
            <HeroTyping />
          </motion.div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.55 }}
            className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-gray-400 lg:mx-0"
          >
            I turn fuzzy ideas into shipped software — from intelligent pipelines to polished interfaces — with clarity,
            speed, and a bit of future-facing flair.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.55 }}
            className="mb-10 grid grid-cols-3 gap-3 sm:gap-6"
          >
            {[
              { label: "5+", desc: "Shipped projects" },
              { label: "AI", desc: "Systems & tools" },
              { label: "∞", desc: "Curiosity loops" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-orange-500/25 bg-white/[0.03] px-2 py-4 text-center backdrop-blur-sm sm:px-4"
              >
                <div className="text-2xl font-bold text-orange-400 sm:text-3xl">{stat.label}</div>
                <div className="mt-1 text-[10px] text-gray-500 sm:text-sm">{stat.desc}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.55 }}
            className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Button
              size="lg"
              className="rounded-full bg-orange-500 px-8 text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.02] hover:bg-orange-600 active:scale-[0.99]"
              onClick={scrollToSection}
            >
              View work <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-orange-500/50 bg-transparent px-8 text-orange-400 transition hover:scale-[1.02] hover:bg-orange-500/10 active:scale-[0.99]"
              asChild
            >
              <a href="/cv.pdf" target="_blank" rel="noreferrer">
                <Download className="h-4 w-4" /> Download CV
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.65 }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto max-w-md lg:ml-auto lg:mr-0">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-2xl border border-orange-500/30 bg-orange-500/10 blur-sm" />
            <div className="relative overflow-hidden rounded-3xl border border-orange-500/25 bg-gradient-to-br from-white/[0.08] to-transparent p-6 shadow-2xl shadow-orange-500/10 backdrop-blur-xl">
              <p className="font-mono text-xs text-orange-300/90">{"// signal"}</p>
              <p className="mt-3 text-lg font-semibold text-white">Systems that feel inevitable.</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Clean architecture, measurable outcomes, and interfaces people actually enjoy — without sacrificing
                performance.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "AI APIs", "Automation"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs text-orange-200/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-gray-600 lg:text-right">
              Psst: open the terminal in the corner — it&apos;s interactive.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
