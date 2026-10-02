"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"

const WEEKS = 10
const DAYS = 7

function contributionLevel(seed: number, week: number, day: number): number {
  const n = (seed * 17 + week * 3 + day * 11) % 100
  if (n < 18) return 0
  if (n < 40) return 1
  if (n < 65) return 2
  if (n < 88) return 3
  return 4
}

const levelClass: Record<number, string> = {
  0: "bg-white/[0.04]",
  1: "bg-orange-500/20",
  2: "bg-orange-500/40",
  3: "bg-orange-500/65",
  4: "bg-orange-500/90",
}

export default function CodeSection() {
  const reduceMotion = useReducedMotion()
  const codeSnippet = `const buildSolution = async () => {
  const innovation = await AI.integrate();
  const automation = await System.optimize();
  return {
    quality: "exceptional",
    impact: "transformative",
    status: "production-ready"
  };
};

buildSolution().then(result => {
  console.log("Building incredible things ✨");
});`

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(sectionRef, { amount: 0.3, once: true })

  const lines = codeSnippet.split("\n")
  const [revealedLines, setRevealedLines] = useState(0)

  const grid = useMemo(() => {
    const cells: { week: number; day: number; level: number }[] = []
    const seed = 9
    for (let w = 0; w < WEEKS; w++) {
      for (let d = 0; d < DAYS; d++) {
        cells.push({ week: w, day: d, level: contributionLevel(seed, w, d) })
      }
    }
    return cells
  }, [])

  useEffect(() => {
    if (!inView) return
    let cancelled = false
    let line = 0

    const tick = () => {
      if (cancelled) return
      line += 1
      setRevealedLines(line)
      if (line < lines.length) window.setTimeout(tick, 110)
    }

    const start = window.setTimeout(tick, 200)
    return () => {
      cancelled = true
      window.clearTimeout(start)
    }
  }, [inView, lines.length])

  return (
    <section id="code" className="relative overflow-hidden bg-card py-24 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-25" aria-hidden />

      <div ref={sectionRef} className="relative mx-auto max-w-5xl">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="mb-3 text-center text-4xl font-bold sm:text-5xl"
        >
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Watch me code
          </span>
        </motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center text-sm text-gray-400 sm:text-base"
        >
          A live-typed snippet paired with a lightweight activity pulse — storytelling without tanking performance.
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-orange-500/25 bg-background/60 p-5 shadow-inner shadow-orange-500/5 backdrop-blur-sm lg:col-span-2"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">Activity pulse</p>
            <p className="mt-2 text-sm text-gray-500">Stylized rhythm — not a live GitHub feed.</p>
            <div
              className="mt-4 grid w-full gap-1"
              style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}
              role="img"
              aria-label="Decorative contribution-style grid"
            >
              {Array.from({ length: WEEKS }).map((_, week) => (
                <div key={week} className="flex flex-col gap-1">
                  {Array.from({ length: DAYS }).map((__, day) => {
                    const cell = grid[week * DAYS + day]
                    return (
                      <motion.div
                        key={`${week}-${day}`}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (week * DAYS + day) * 0.008, duration: 0.2 }}
                        viewport={{ once: true }}
                        className={`aspect-square w-full rounded-sm ${levelClass[cell.level]}`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-xs text-gray-600">git log --oneline --since=&quot;2 weeks ago&quot;</p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-gray-950 to-black shadow-2xl shadow-orange-500/15 lg:col-span-3"
          >
            <div className="flex items-center gap-2 border-b border-orange-500/20 bg-black/40 px-5 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/90" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
              <span className="ml-3 font-mono text-xs text-gray-500">buildSolution.ts</span>
              <span className="ml-auto font-mono text-[10px] text-orange-500/60">● live typing</span>
            </div>

            <div className="overflow-x-auto p-6">
              <pre className="font-mono text-sm leading-relaxed text-gray-300">
                <code>
                  {lines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                      animate={{
                        opacity: index < revealedLines ? 1 : 0,
                        y: index < revealedLines ? 0 : 4,
                      }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-pre"
                    >
                      {line.length ? line : "\u00A0"}
                    </motion.div>
                  ))}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
