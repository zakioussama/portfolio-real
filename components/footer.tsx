"use client"

import { motion } from "framer-motion"
import { ArrowUp, Sparkles } from "lucide-react"
import { useCallback, useRef, useState } from "react"

export default function Footer() {
  const [egg, setEgg] = useState(false)
  const clicks = useRef(0)
  const timer = useRef<number | undefined>(undefined)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const onCopyrightClick = useCallback(() => {
    window.clearTimeout(timer.current)
    clicks.current += 1
    if (clicks.current >= 3) {
      setEgg(true)
      clicks.current = 0
      window.setTimeout(() => setEgg(false), 4200)
    } else {
      timer.current = window.setTimeout(() => {
        clicks.current = 0
      }, 600)
    }
  }, [])

  return (
    <footer className="border-t border-orange-500/20 bg-card py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {egg && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 flex items-center justify-center gap-2 rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-center text-sm text-orange-200"
            role="status"
          >
            <Sparkles className="h-4 w-4 shrink-0" />
            You found it — thanks for exploring. Built with curiosity and too much coffee.
          </motion.div>
        )}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <button
              type="button"
              onClick={onCopyrightClick}
              className="text-center text-gray-400 transition hover:text-orange-300/90 sm:text-left"
              title="Try triple-click"
            >
              © 2026 Zaki Oussama. All rights reserved.
            </button>
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            type="button"
            onClick={scrollToTop}
            className="rounded-full border border-orange-500/30 bg-orange-500/20 p-2 transition-all duration-300 hover:border-orange-500/60 hover:shadow-lg hover:shadow-orange-500/20"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 text-orange-400" />
          </motion.button>
        </div>
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>
    </footer>
  )
}
