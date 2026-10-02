"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage, type Locale } from "@/components/language-provider"

type ExperienceContent = {
  type: string; title: string; organization: string; date: string; project: string
  description: string; responsibilities: string[]; skills: string[]; image?: string;
}

export type ExperienceCardData = Record<Locale, ExperienceContent>

const experiences: ExperienceCardData[] = [
  {
    en: { type: "Web Developer Internship", title: "Web Developer", organization: "DOMCIT", date: "2026", project: "VistaBank Data Migration Tool", description: "Developed a web application dedicated to automated data migration for the Vista Data Migration Tool project.", responsibilities: ["Developed CSV file import features and validation for imported data.", "Designed the data-mapping system and processed CSV files to prepare migration operations.", "Implemented authentication, migration-operation tracking, and migration report generation."], skills: ["CSV import", "Data validation", "Data mapping", "Authentication", "Migration reporting"], image: "/vistabank.jpeg"},
    fr: { type: "Stage développeur web", title: "Développeur Web", organization: "DOMCIT", date: "2026", project: "VistaBank Data Migration Tool", description: "Développement d'une application web dédiée à la migration automatisée de données dans le cadre du projet Vista Data Migration Tool.", responsibilities: ["Développement des fonctionnalités d'importation de fichiers CSV et validation des données importées.", "Conception du système de mapping des données et traitement des fichiers CSV pour préparer les opérations de migration.", "Implémentation du module d'authentification, du suivi des opérations de migration et de la génération de rapports."], skills: ["Import CSV", "Validation des données", "Mapping de données", "Authentification", "Rapports de migration"], image: "/vistabank.jpeg"},
  },
  {
    en: { type: "Full-Stack Developer Internship", title: "Full-Stack Developer", organization: "MB-way", date: "2025", project: "School Management SaaS — MVP", description: "Designed and fully developed a school-management SaaS application as an MVP.", responsibilities: ["Designed and developed the application from end to end.", "Integrated secure authentication and managed access to the different features.", "Implemented management for classes, teachers, and subjects, then presented a functional MVP to an evaluation panel."], skills: ["Authentication", "Access management", "Class management", "Teacher management", "Subject management"], image: "/saas.jpeg"},
    fr: { type: "Stage développeur full stack", title: "Développeur Full Stack", organization: "MB-way", date: "2025", project: "SaaS de gestion scolaire — MVP", description: "Conception et développement complet d'une application SaaS de gestion scolaire dans le cadre du développement d'un MVP.", responsibilities: ["Conception et développement de l'application.", "Intégration d'un système d'authentification sécurisé et gestion des accès aux différentes fonctionnalités.", "Gestion des classes, des enseignants et des matières, puis présentation d'un MVP fonctionnel devant un jury d'évaluation."], skills: ["Authentification", "Gestion des accès", "Gestion des classes", "Gestion des enseignants", "Gestion des matières"], image: "/saas.jpeg"},
  },
  {
    en: { type: "Web Developer — Hackathon Project", title: "Web Developer", organization: "Fondation Abdelaouhed El Kadiri — MB-way", date: "2025", project: "Official Fondation Abdelaouhed El Kadiri Website", description: "Developed and launched the official Fondation Abdelaouhed El Kadiri website as part of a Hackathon project.", responsibilities: ["Developed and deployed the official website.", "Optimized search-engine visibility and improved the UX/UI.", "Monitored site performance and maintained the website."], skills: ["Deployment", "SEO", "UX/UI", "Performance monitoring", "Maintenance"], image: "/fondation%20aek.jpeg"},
    fr: { type: "Développeur Web — Projet Hackathon", title: "Développeur Web", organization: "Fondation Abdelaouhed El Kadiri — MB-way", date: "2025", project: "Site web officiel de la Fondation Abdelaouhed El Kadiri", description: "Développement et mise en ligne du site web officiel de la Fondation Abdelaouhed El Kadiri dans le cadre d'un projet Hackathon.", responsibilities: ["Développement et mise en ligne du site web officiel.", "Optimisation du référencement naturel et amélioration de l'expérience utilisateur (UX/UI).", "Suivi des performances du site et maintenance."], skills: ["Déploiement", "SEO", "UX/UI", "Suivi des performances", "Maintenance"], image: "/fondation%20aek.jpeg"},
  },
]

function ProductPreview({ index, project, image }: { index: number; project: string; image?: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/25 via-card to-black p-3 shadow-2xl shadow-orange-500/15"
      role="img"
      aria-label={`${project} preview`}
    >
      {image ? (
        <Image src={image} alt={`${project} preview`} width={1200} height={800} className="h-full w-full rounded-2xl object-cover" />
      ) : (
        <div className="rounded-2xl border border-white/10 bg-black/45 p-4">
          <div className="flex gap-2"><i className="h-2.5 w-2.5 rounded-full bg-orange-400" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" /><i className="h-2.5 w-2.5 rounded-full bg-white/25" /></div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className={`col-span-2 h-24 rounded-xl ${index === 1 ? "bg-orange-500/25" : "bg-white/[.08]"}`} />
            <div className="h-24 rounded-xl bg-orange-500/15" />
            {[1, 2, 3].map((item) => <div key={item} className="h-12 rounded-lg bg-white/[.07]" />)}
          </div>
        </div>
      )}
    </div>
  )
}

function ExperienceCard({ entry, index }: { entry: ExperienceContent; index: number }) {
  const reduceMotion = useReducedMotion(); const [open, setOpen] = useState(false)
  const french = useLanguage().locale === "fr"
  const visual = <motion.div initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}><ProductPreview index={index} project={entry.project} image={entry.image} /></motion.div>
  const content = <motion.article initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.08 }}><p className="text-xs font-semibold uppercase tracking-[.28em] text-orange-400/80">{entry.type}</p><h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{entry.title}</h3><p className="mt-2 text-sm font-medium text-orange-300">{entry.organization} <span className="text-gray-600">·</span> {entry.date}</p><p className="mt-5 text-lg font-medium text-gray-200">{entry.project}</p><p className="mt-3 leading-relaxed text-gray-400">{entry.description}</p><div className="mt-5 flex flex-wrap gap-2">{entry.skills.map((skill) => <span key={skill} className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs text-orange-100">{skill}</span>)}</div><button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-orange-300 transition hover:text-orange-100">{french ? (open ? "Masquer les détails" : "Voir les détails") : (open ? "Hide details" : "View details")}<ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} /></button><AnimatePresence>{open && <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-2 overflow-hidden border-l border-orange-500/35 pl-4 text-sm leading-relaxed text-gray-400">{entry.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</motion.ul>}</AnimatePresence></motion.article>
  return <div className="grid gap-10 lg:grid-cols-2 lg:items-center">{index % 2 ? <>{content}{visual}</> : <>{visual}{content}</>}</div>
}

export default function ExperienceShowcase() {
  const { locale } = useLanguage(); const french = locale === "fr"
  return <section id="experience" className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 lg:px-8"><div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" /><div className="relative mx-auto max-w-6xl"><p className="text-center text-xs font-semibold uppercase tracking-[.3em] text-orange-400/80">{french ? "Expérience" : "Experience"}</p><h2 className="mt-3 text-center text-4xl font-bold sm:text-5xl"><span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">{french ? "Des applications concrètes, conçues avec soin" : "Real applications, built with care"}</span></h2><div className="mt-16 space-y-24">{experiences.map((experience, index) => <ExperienceCard key={experience.en.project} entry={experience[locale]} index={index} />)}</div></div></section>
}
