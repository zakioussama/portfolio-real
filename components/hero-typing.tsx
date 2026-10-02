"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

const PHRASES = [
  "I build AI systems that solve real problems.",
  "I automate workflows so teams ship faster.",
  "I craft web experiences that feel alive.",
]

export default function HeroTyping() {
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState("")
  const timeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(PHRASES[0])
      return
    }

    let cancelled = false
    let phraseIndex = 0
    let forward = true
    let len = 0

    const schedule = (fn: () => void, ms: number) => {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => {
        if (!cancelled) fn()
      }, ms)
    }

    const step = () => {
      const full = PHRASES[phraseIndex]
      if (forward) {
        if (len < full.length) {
          len += 1
          setDisplay(full.slice(0, len))
          schedule(step, 46)
        } else {
          schedule(() => {
            forward = false
            step()
          }, 2100)
        }
      } else if (len > 0) {
        len -= 1
        setDisplay(full.slice(0, len))
        schedule(step, 28)
      } else {
        forward = true
        phraseIndex = (phraseIndex + 1) % PHRASES.length
        schedule(step, 420)
      }
    }

    step()
    return () => {
      cancelled = true
      window.clearTimeout(timeoutRef.current)
    }
  }, [reduceMotion])

  return (
    <p className="min-h-[3.5rem] sm:min-h-[4rem] text-lg sm:text-xl md:text-2xl font-medium text-gray-200">
      <span className="text-orange-400/95">{display}</span>
      {!reduceMotion && (
        <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-orange-500 align-middle" aria-hidden />
      )}
    </p>
  )
}
