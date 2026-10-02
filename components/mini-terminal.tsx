"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Terminal } from "lucide-react"

type Line = { type: "in" | "out"; text: string }

const WELCOME = [
  "ZO shell v0.1 — type `help` for commands.",
  "Tip: try `whoami`, `stack`, or `projects`.",
]

export default function MiniTerminal() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [lines, setLines] = useState<Line[]>(() => WELCOME.map((t) => ({ type: "out", text: t })))
  const bottomRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
  }, [lines, open, reduceMotion])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase()
    const push = (text: string) => setLines((prev) => [...prev, { type: "out", text }])

    if (!cmd) return

    setLines((prev) => [...prev, { type: "in", text: `> ${raw}` }])

    switch (cmd) {
      case "help":
        push("Commands: help · clear · whoami · stack · projects · contact · sudo make coffee")
        break
      case "clear":
        setLines([])
        return
      case "whoami":
        push("Zaki Oussama — software engineer (AI, automation, web).")
        break
      case "stack":
        push("React · TypeScript · Node · Python · OpenCV · TensorFlow · Docker · Git")
        break
      case "projects":
        push("Open the Work section — each card is a mini case study with a video preview.")
        break
      case "contact":
        push("Scroll to Contact or email: zakioussama002@gmail.com")
        break
      case "sudo make coffee":
        push("Permission denied: kettle not found. ☕ (nice try.)")
        break
      case "hello":
      case "hi":
        push("Hey! Thanks for poking around the terminal.")
        break
      default:
        push(`Unknown command: "${raw}". Type help.`)
    }
  }, [])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = input
    setInput("")
    runCommand(v)
  }

  return (
    <>
      <motion.button
        type="button"
        initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
        animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.35 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/40 bg-background/80 text-orange-400 shadow-lg shadow-orange-500/20 backdrop-blur-md transition hover:border-orange-400 hover:text-orange-300"
        aria-label={open ? "Close terminal" : "Open terminal"}
      >
        <Terminal className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-5 z-40 flex w-[min(100vw-2.5rem,22rem)] flex-col overflow-hidden rounded-2xl border border-orange-500/30 bg-black/75 shadow-2xl shadow-orange-500/15 backdrop-blur-xl"
            role="dialog"
            aria-label="Mini terminal"
          >
            <div className="flex items-center justify-between border-b border-orange-500/20 px-3 py-2">
              <span className="font-mono text-xs text-orange-300/90">zo@portfolio ~ %</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-xs text-gray-400 hover:bg-white/10 hover:text-white"
              >
                Esc
              </button>
            </div>
            <div className="max-h-56 overflow-y-auto p-3 font-mono text-xs leading-relaxed text-gray-300">
              {lines.map((line, i) => (
                <div
                  key={`${i}-${line.text.slice(0, 12)}`}
                  className={line.type === "in" ? "text-emerald-400/90" : "text-gray-400"}
                >
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form onSubmit={onSubmit} className="border-t border-orange-500/20 p-2">
              <label htmlFor="mini-term-input" className="sr-only">
                Terminal command
              </label>
              <input
                id="mini-term-input"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a command…"
                className="w-full rounded-lg border border-orange-500/20 bg-black/50 px-3 py-2 font-mono text-xs text-gray-100 placeholder:text-gray-600 focus:border-orange-500/50 focus:outline-none"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
