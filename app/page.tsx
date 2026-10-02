"use client"

import { useState } from "react"
import { LanguageProvider } from "@/components/language-provider"
import ExperienceShowcase from "@/components/experience-showcase"
import Hero from "@/components/hero"
import About from "@/components/about"
import Technologies from "@/components/technologies"
import CodeSection from "@/components/code-section"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Languages from "@/components/languages"
import BeyondCoding from "@/components/beyond-coding"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SiteNav from "@/components/site-nav"
import MiniTerminal from "@/components/mini-terminal"

export default function Home() {
  const [filter, setFilter] = useState("all")

  return (
    <LanguageProvider><main className="min-h-screen bg-background overflow-x-hidden">
      <SiteNav />
      <MiniTerminal />
      <Hero />
      <ExperienceShowcase />
      <About />
      <Technologies />
      <CodeSection />
      <Projects filter={filter} setFilter={setFilter}  />
      <Education />
      <Languages />
      <BeyondCoding />
      <Contact />
      <Footer />
    </main></LanguageProvider>
  )
}
