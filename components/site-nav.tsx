"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const links = [
  { href: "#hero", label: "Home" },
  { href: "#experience", label: "Experience", fr: "Expérience" },
  { href: "#about", label: "About", fr: "À propos" },
  { href: "#technologies", label: "Stack", fr: "Stack" },
  { href: "#code", label: "Code", fr: "Code" },
  { href: "#projects", label: "Work", fr: "Projets" },
  { href: "#contact", label: "Contact", fr: "Contact" },
]

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const { locale, setLocale } = useLanguage()
  const [languageOpen, setLanguageOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setOpen(false)
    const id = href.replace("#", "")
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 pt-3 sm:pt-4 pointer-events-none">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`pointer-events-auto flex w-full max-w-4xl items-center justify-between gap-3 rounded-full border px-3 py-2 sm:px-5 sm:py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-orange-500/35 bg-background/75 shadow-lg shadow-orange-500/10 backdrop-blur-xl"
            : "border-white/10 bg-background/40 backdrop-blur-md"
        }`}
      >
        <button
          type="button"
          onClick={() => scrollTo("#hero")}
          className="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold tracking-tight text-orange-400 transition hover:text-orange-300"
        >
          ZO
        </button>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-1 lg:gap-2" aria-label="Primary">
          {links.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href)}
              className="rounded-full px-3 py-1.5 text-sm text-gray-300 transition hover:bg-orange-500/15 hover:text-white"
            >
              {locale === "fr" ? l.fr ?? l.label : l.label}
            </button>
          ))}
        </nav>

        <div data-no-translate className="relative hidden md:block">
          <button type="button" onClick={() => setLanguageOpen((value) => !value)} aria-haspopup="listbox" aria-expanded={languageOpen} className="flex items-center gap-1 rounded-full border border-orange-500/25 px-3 py-1.5 text-xs font-medium text-orange-100 transition hover:bg-orange-500/10">{locale === "en" ? "🇬🇧 EN" : "🇫🇷 FR"}<ChevronDown className="h-3 w-3" /></button>
          {languageOpen && <div role="listbox" className="absolute right-0 mt-2 w-36 rounded-xl border border-orange-500/25 bg-background/95 p-1 shadow-xl backdrop-blur-xl"><button role="option" aria-selected={locale === "en"} onClick={() => { setLocale("en"); setLanguageOpen(false) }} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-orange-500/10">🇬🇧 English</button><button role="option" aria-selected={locale === "fr"} onClick={() => { setLocale("fr"); setLanguageOpen(false) }} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-orange-500/10">🇫🇷 Français</button></div>}
        </div>
        <button
          type="button"
          className="md:hidden rounded-full border border-orange-500/30 p-2 text-orange-300 hover:bg-orange-500/10"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.div>

      {open && (
        <div className="pointer-events-auto fixed inset-x-3 top-[4.25rem] z-[100] md:hidden rounded-2xl border border-orange-500/25 bg-background/95 p-3 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                type="button"
                onClick={() => scrollTo(l.href)}
                className="rounded-xl px-4 py-3 text-left text-sm text-gray-200 hover:bg-orange-500/15 hover:text-white"
              >
                {locale === "fr" ? l.fr ?? l.label : l.label}
              </button>
            ))}
            <div className="mt-2 flex gap-2 border-t border-orange-500/20 pt-3"><button onClick={() => setLocale("en")} className={`flex-1 rounded-lg px-3 py-2 text-sm ${locale === "en" ? "bg-orange-500/15 text-orange-200" : "text-gray-300"}`}>🇬🇧 English</button><button onClick={() => setLocale("fr")} className={`flex-1 rounded-lg px-3 py-2 text-sm ${locale === "fr" ? "bg-orange-500/15 text-orange-200" : "text-gray-300"}`}>🇫🇷 Français</button></div>
          </div>
        </div>
      )}
    </header>
  )
}
