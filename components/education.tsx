"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { GraduationCap, Calendar, MapPin, CheckCircle2, ExternalLink, Medal } from "lucide-react"

export default function Education() {
  const certifications = [
    {
      title: "Junior Cybersecurity Analyst",
      org: "Cisco",
      date: "April 2025",
      verified: true,
      url: "https://www.credly.com/badges/ac845942-acff-43bc-af2b-047484e3bc4d/public_url",
    },
    {
      title: "JavaScript Essentials 1",
      org: "Cisco",
      date: "January 2025",
      verified: true,
      url: "https://www.credly.com/badges/0c201ad8-6237-4398-a8c2-cda4489525ad/public_url",
    },
    {
      title: "Python Essentials 1",
      org: "Cisco",
      date: "January 2025",
      verified: true,
      url: "https://www.credly.com/badges/847b499e-38c8-4551-a01c-3ca3cce816be/public_url",
    },
    {
      title: "Introduction to Cybersecurity",
      org: "Cisco",
      date: "January 2025",
      verified: true,
      url: "https://www.credly.com/badges/f7684451-8226-419c-a4d1-efddf526defb/public_url",
    },
  ]

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Education & Certifications
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-background border border-orange-500/30 rounded-xl p-6 lg:p-8 hover:border-orange-500/60 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="size-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-700/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">IFIAG Casablanca</h3>
                <p className="text-gray-300 mt-1">
                  Institut de Formation aux Ingénieries Appliquées et de Gestion
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-3">
                  <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /> 2023 - 2025</span>
                  <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> Casablanca, Morocco</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white">Specialized Technician in Software Development</h4>
              <p className="text-gray-400 mt-3 leading-relaxed">
                Focused on object-oriented programming, web development, database management, and software engineering.
                Hands-on experience with C#, PHP, MySQL, Laravel, and modern frontend technologies.
              </p>
            </div>
          </motion.div>

          {/* Right: Certifications */}
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-background border border-orange-500/20 rounded-xl p-5 hover:border-orange-500/60 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-700/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                    <Medal className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h5 className="text-xl font-semibold text-white mr-2 truncate">{cert.title}</h5>
                      {cert.verified && (
                        <span className="inline-flex items-center gap-1 text-emerald-300/90 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-2 py-0.5 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {cert.org} · {cert.date}
                    </p>
                  </div>
                  <Button asChild variant="outline" className="gap-2 rounded-lg border-orange-500/30 hover:border-orange-500/60 text-gray-200">
                    <a href={cert.url} target="_blank" rel="noreferrer">
                      View Certificate <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
