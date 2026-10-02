"use client"

import { motion, useReducedMotion } from "framer-motion"

export default function About() {
  const reduceMotion = useReducedMotion()
  const cards = [
    { title: "AI-Powered Tools", icon: "🤖", blurb: "Models, data, and UX in one loop." },
    { title: "Automation & OCR", icon: "⚙️", blurb: "Repeatable systems, fewer bottlenecks." },
    { title: "Next-Gen Web Apps", icon: "🌐", blurb: "Interfaces that feel fast and intentional." },
  ]

  return (
    <section id="about" className="relative overflow-hidden bg-card py-24 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 rounded-full bg-orange-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="lg:col-span-6 lg:pt-4"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-orange-400/80">About me</p>
            <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                I build like a product thinker, code like an engineer.
              </span>
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-400">
              <p>
                I grew up fascinated by how software could remove friction from real life — not just ship features, but
                make days easier. That pulled me deep into{" "}
                <span className="text-gray-200">AI, automation, and modern web stacks</span>.
              </p>
              <p>
                Today I focus on end-to-end delivery: clarifying the problem, choosing pragmatic tech, and polishing the
                details until the experience feels inevitable. If it&apos;s clever but unmaintainable, I&apos;d rather
                simplify.
              </p>
              <p className="text-sm text-gray-500">
                Easter egg: the floating terminal accepts secret commands. Try being polite — or overly ambitious.
              </p>
            </div>
          </motion.div>

          <div className="relative lg:col-span-6">
            <div className="absolute -right-4 top-8 hidden h-full w-[1px] bg-gradient-to-b from-orange-500/40 via-orange-500/10 to-transparent lg:block" />

            <div className="space-y-5 lg:translate-x-4 lg:pl-6">
              {cards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={reduceMotion ? undefined : { scale: 1.02, x: 4 }}
                  className="group relative overflow-hidden rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/15 to-transparent p-6 shadow-lg shadow-orange-500/5 backdrop-blur-sm transition hover:border-orange-400/50 hover:shadow-orange-500/15"
                >
                  <div className="flex gap-4">
                    <div className="text-4xl transition group-hover:scale-110">{card.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-orange-300">{card.title}</h3>
                      <p className="mt-2 text-sm text-gray-400">{card.blurb}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
