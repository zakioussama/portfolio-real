"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

export interface ProjectDetailsData {
  id: number
  title: string
  description: string
  tags: string[]
  category: string
  image?: string
  video?: string
  url: string
  caseStudy: {
    problem: string
    solution: string
    result: string
  }
  techStack: string
}

interface ProjectDetailsProps {
  project: ProjectDetailsData | null
  isOpen: boolean
  onClose: () => void
}

function StudyBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">{label}</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-200 sm:text-base">{text}</p>
    </div>
  )
}

export default function ProjectDetails({ project, isOpen, onClose }: ProjectDetailsProps) {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/20 bg-white/[0.08] p-6 shadow-2xl shadow-orange-500/10 backdrop-blur-xl sm:p-8"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-details-title"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 id="project-details-title" className="text-2xl font-bold text-white sm:text-3xl">
                {project.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-orange-400/40 p-2 text-gray-200 transition hover:border-orange-400 hover:text-white"
                aria-label="Close project details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-6 grid gap-4">
              <StudyBlock label="Problem" text={project.caseStudy.problem} />
              <StudyBlock label="Solution" text={project.caseStudy.solution} />
              <StudyBlock label="Result" text={project.caseStudy.result} />
            </div>

            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              <span className="font-semibold text-orange-300/90">Tech stack · </span>
              {project.techStack}
            </p>

            <div className="overflow-hidden rounded-xl border border-orange-400/30 bg-gradient-to-br from-orange-500/15 via-black/40 to-black/70 p-3" role="img" aria-label={`${project.title} product preview`}>
              <div className="flex gap-2 px-3 pt-2"><span className="h-2.5 w-2.5 rounded-full bg-orange-400" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /><span className="h-2.5 w-2.5 rounded-full bg-white/20" /></div>
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-64 w-full object-cover sm:h-80"
                  />
                ) : project.image ? (
                  <Image src={project.image} alt={project.title} width={1200} height={800} className="h-64 w-full object-cover sm:h-80" />
                ) : (
                  <div className="flex h-64 items-center justify-center bg-black/30 text-sm text-gray-300 sm:h-80">
                    Preview unavailable
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
