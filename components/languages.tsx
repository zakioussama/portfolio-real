"use client"

import { motion } from "framer-motion"

export default function Languages() {
  const languages = [
    { name: "English", level: "Fluent", progress: 95 },
    { name: "French", level: "Advanced", progress: 75 },
    { name: "Arabic", level: "Native", progress: 100 },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Global Communication
          </span>
        </motion.h2>

        <div className="space-y-8">
          {languages.map((lang, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{lang.name}</h3>
                <span className="text-orange-400 font-medium">{lang.level}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.progress}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
