"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

export default function Technologies() {
  const reduceMotion = useReducedMotion()
  const { locale } = useLanguage()
  const fr = locale === "fr"
  const categories = [
    {
      title: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      level: 95,
    },
    {
      title: "Backend",
      skills: ["Node.js", "Laravel", "Express"],
      level: 90,
    },
    {
      title: "AI & Automation",
      skills: ["Python", "OpenCV", "TensorFlow"],
      level: 88,
    },
    {
      title: fr ? "Outils" : "Tools",
      skills: ["Git", "Docker", "VS Code", "Figma"],
      level: 92,
    },
  ]

  return (
    <section id="technologies" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-16 text-center"
        >
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            {fr ? "Technologies maîtrisées" : "Technologies I Master"}
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={reduceMotion ? false : { opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
              className="bg-card border border-orange-500/20 rounded-xl p-6 transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <h3 className="text-2xl font-bold text-orange-500 mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm border border-orange-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${category.level}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                ></motion.div>
              </div>
              <p className="text-gray-400 text-sm mt-2">{category.level}% Proficiency</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
