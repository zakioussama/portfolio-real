"use client"

import { motion } from "framer-motion"

export default function BeyondCoding() {
  const interests = [
    { title: "Sports", icon: "⚽", description: "Staying active and competitive" },
    { title: "Design", icon: "🎨", description: "Creating beautiful experiences" },
    { title: "Community Work", icon: "🤝", description: "Giving back to society" },
    { title: "Mentoring", icon: "👨‍🏫", description: "Sharing knowledge and experience" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center"
        >
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Beyond Coding
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((interest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-xl p-6 hover:border-orange-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 text-center"
            >
              <div className="text-4xl mb-4">{interest.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{interest.title}</h3>
              <p className="text-gray-400 text-sm">{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
