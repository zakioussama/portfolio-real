"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { frenchText } from "@/lib/translations"

export type Locale = "en" | "fr"
type LanguageContextValue = { locale: Locale; setLocale: (locale: Locale) => void }
const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")
  const originalText = useRef(new WeakMap<Text, string>())
  const originalAttributes = useRef(new WeakMap<Element, Map<string, string>>())
  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-locale")
    if (saved === "en" || saved === "fr") setLocale(saved)
  }, [])
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  useEffect(() => {
    const translate = (root: Node) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
      let node: Node | null
      while ((node = walker.nextNode())) {
        const text = node as Text
        if (text.parentElement?.closest("[data-no-translate]")) continue
        const original = originalText.current.get(text) ?? text.nodeValue ?? ""
        if (!originalText.current.has(text)) originalText.current.set(text, original)
        text.nodeValue = locale === "fr" ? frenchText[original] ?? original : original
      }
      const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll("[placeholder],[aria-label],[title]"))] : Array.from(document.querySelectorAll("[placeholder],[aria-label],[title]"))
      elements.forEach((element) => {
        ;["placeholder", "aria-label", "title"].forEach((attribute) => {
          const value = element.getAttribute(attribute); if (!value) return
          let values = originalAttributes.current.get(element); if (!values) { values = new Map(); originalAttributes.current.set(element, values) }
          const original = values.get(attribute) ?? value; values.set(attribute, original)
          element.setAttribute(attribute, locale === "fr" ? frenchText[original] ?? original : original)
        })
      })
    }
    translate(document.body)
    const observer = new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => translate(node))))
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [locale])
  const selectLocale = (next: Locale) => {
    window.localStorage.setItem("portfolio-locale", next)
    document.documentElement.lang = next
    setLocale(next)
  }
  return <LanguageContext.Provider value={{ locale, setLocale: selectLocale }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider")
  return context
}
