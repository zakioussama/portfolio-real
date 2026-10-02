"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"
import ProjectDetails, { type ProjectDetailsData } from "@/components/project-details"
import { useLanguage } from "@/components/language-provider"

interface ProjectsProps {
  filter: string
  setFilter: (value: string) => void
}

export default function Projects({ filter, setFilter }: ProjectsProps) {
  const reduceMotion = useReducedMotion()
  const { locale } = useLanguage()
  const fr = locale === "fr"

  const allProjects: ProjectDetailsData[] = [
    {
      id: 1,
      title: "reslide",
      description: "Innovative AI-powered solution",
      tags: ["AI", "Web App"],
      category: "ai",
      url: "https://github.com/zakioussama/reslide",
      techStack: "React, TypeScript, Node.js, charting, AI-assisted insights.",
      image: "/reslide.jpeg",
      caseStudy: {
        problem: "Teams were drowning in scattered metrics and slow feedback loops when deciding what to ship next.",
        solution:
          "A centralized dashboard that aggregates signals, surfaces anomalies, and pairs charts with lightweight AI prompts for interpretation.",
        result: "Faster alignment on priorities and fewer meetings spent reconciling numbers — decisions became evidence-led.",
      },
    },
    {
      id: 2,
      title: "vistaBank Data Migration Tool",
      description: "VistaBank Data Migration Tool",
      tags: ["Data mapping", "JavaScript", "Web App"],
      category: "web",
      url: "https://github.com/zakioussama/vista-bank",
      techStack: "JavaScript, Express, queues/workers, validation, structured logging.",
      image: "/vistabank.jpeg",
      caseStudy: {
        problem: "Legacy banking environments frequently struggle with data fragmentation, complex multi-format records, and the tedious, error-prone nature of transferring large-scale client or transactional records between disparate systems.",
        solution:
          "The Vista Data Migration Tool was engineered to automate and streamline the secure pipeline for extracting, transforming, and loading (ETL) banking data.",
        result: "Eliminated Manual Bottlenecks, Ensured Data Integrity, Production Readiness.",
      },
    },
    {
      id: 3,
      title: "Business Management System",
      description: "Business management web application",
      tags: ["Web App", "React"],
      category: "web",
      url: "https://github.com/zakioussama/business-management",
      techStack: "React, scalable UI architecture, API-driven modules, form-heavy workflows.",
      image: "/business%20managment.jpeg",
      video: "/business.mp4",
      caseStudy: {
        problem: "Day-to-day operations lived in spreadsheets and ad-hoc tools, making invoicing and customer follow-ups inconsistent.",
        solution:
          "A single web app with role-aware views, structured records, and flows for common business tasks.",
        result: "Clearer operational rhythm and less context switching — the team could see status at a glance.",
      },
    },
    {
      id: 4,
      title: "Clinic Pharmacy Management System",
      description: "Pharmacy management web application",
      tags: ["Web App", "TypeScript"],
      category: "web",
      url: "https://github.com/zakioussama/pharmacy",
      image: "/clinic%20and%20pharmacy.jpeg",
      video: "/clinic.mp4",
      techStack: "TypeScript, service-layer design, inventory domain modeling, printable reports.",
      caseStudy: {
        problem: "Stock discrepancies and prescription tracking were hard to monitor under daily store pressure.",
        solution:
          "Inventory-first workflows with search, alerts, and traceable orders tied to a clean domain model.",
        result: "Fewer stock surprises and quicker answers at the counter when timing really matters.",
      },
    },
    {
      id: 5,
      title: "Dirassati SAAS",
      description: "Full-stack web platform",
      tags: ["Web App", "Full Stack"],
      category: "web",
      image: "/saas.jpeg",
      url: "https://github.com/aminezaghi/Dirassati-SAAS",
      techStack: "React, server APIs, modular UI (tables, forms, navigation), subscription-ready layout.",
      caseStudy: {
        problem: "Learners needed structure and visibility into progress; admins needed tools that could scale with content growth.",
        solution:
          "A modular learning platform with course organization, profiles, and UI patterns that stay consistent as features expand.",
        result: "A clearer learning journey for students and a maintainable foundation for future product iterations.",
      },
    },
    {
      id: 6,
      title: "Food Funday",
      description: "Website",
      tags: ["Website", "Landing Page"],
      category: "web",
      image: "/food%20funday.jpeg",
      video: "/food%20funday.mp4",
      url: "https://github.com/zakioussama/food-funday",
      techStack: "Laravel,Landing page design, responsive layout, interactive elements, and smooth animations.",
      caseStudy: {
        problem: "Need for a visually appealing and functional landing page to promote the food delivery service.",
        solution:
          "A modern, responsive landing page with engaging visuals and smooth animations to capture user attention.",
        result: "Increased user engagement and a stronger brand presence for the food delivery service.",
      },
    },
  ]

  const [selectedProject, setSelectedProject] = useState<ProjectDetailsData | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filters = [
    { label: fr ? "Tous" : "All", value: "all" },
    { label: fr ? "Applications web" : "Web Apps", value: "web" },
    { label: "AI", value: "ai" },
    { label: fr ? "Automatisation" : "Automation", value: "automation" },
  ]

  const filteredProjects = filter === "all" ? allProjects : allProjects.filter((p) => p.category === filter)

  const toggleProjectDetails = (project: ProjectDetailsData) => {
    if (isDetailsOpen && selectedProject?.id === project.id) {
      setIsDetailsOpen(false)
      return
    }

    setSelectedProject(project)
    setIsDetailsOpen(true)
  }

  const closeProjectDetails = () => {
    setIsDetailsOpen(false)
  }

  useEffect(() => {
    if (!isDetailsOpen) return

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProjectDetails()
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isDetailsOpen])

  return (
    <section className="relative overflow-hidden bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl" id="projects">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="mb-4 text-center text-4xl font-bold sm:text-5xl"
        >
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            {fr ? "Des études de cas, pas seulement des cartes" : "Case studies, not just cards"}
          </span>
        </motion.h2>
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-2xl text-center text-gray-400"
        >
          Each project is framed as <span className="text-gray-200">problem → solution → result</span>. Hover for a
          live preview; open details for the full story.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-wrap justify-center gap-3"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                filter === f.value
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/40"
                  : "border border-orange-500/30 bg-card text-gray-300 hover:border-orange-500/60 hover:shadow-md hover:shadow-orange-500/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
              viewport={{ once: true }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-orange-500/20 bg-card/80 shadow-lg shadow-black/20 backdrop-blur-sm transition duration-300 hover:border-orange-500/50 hover:shadow-orange-500/20"
            >
              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-orange-500/30 via-zinc-900 to-black md:h-56">
                <div className="absolute inset-0">
                  {project.video ? (
                    <video
                      src={project.video}
                      poster={project.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : project.image ? (
                    <Image src={project.image} alt={project.title} width={1200} height={800} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                <div className="absolute left-0 right-0 bottom-0 translate-y-3 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-300/95">
                    Problem → Solution → Result
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-100">{project.caseStudy.problem}</p>
                </div>
              </div>

              <div className="relative z-[1] -mt-6 rounded-t-2xl border border-orange-500/15 bg-gradient-to-b from-background/95 to-card/95 p-6 pt-8 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-orange-500/30 bg-orange-500/15 px-2 py-0.5 text-xs text-orange-200/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button
                    type="button"
                    onClick={() => toggleProjectDetails(project)}
                    className="flex-1 gap-2 rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/25 transition hover:scale-[1.02] hover:bg-orange-600 active:scale-[0.99]"
                  >
                    {fr ? "Voir les détails" : "Check details"} <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 rounded-xl border-orange-500/35 text-gray-200 transition hover:scale-[1.02] hover:border-orange-500/60 active:scale-[0.99]"
                    asChild
                  >
                    <a href={project.url} target="_blank" rel="noreferrer">
                      <Github className="h-4 w-4" /> Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectDetails project={selectedProject} isOpen={isDetailsOpen} onClose={closeProjectDetails} />
    </section>
  )
}
