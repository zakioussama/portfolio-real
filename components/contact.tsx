"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { useState, type ChangeEvent, type FormEvent } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/zakioussama" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/oussama-zaki/" },
    { icon: Mail, label: "Email", href: "mailto:zakioussama002@gmail.com" },
    { icon: MessageCircle, label: "WhatsApp", href: "#" },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Let&apos;s Build Something Incredible
            </span>
          </h2>
          <p className="text-gray-300 text-lg">
            I&apos;m always excited to collaborate on new projects and ideas. Let&apos;s connect!
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-card border border-orange-500/20 rounded-xl p-8 mb-12 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
            />
            <Input
              placeholder="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
          <Textarea
            placeholder="Your Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 min-h-32"
          />
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-6 font-semibold">
            Send Message
          </Button>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {socials.map((social, idx) => {
            const Icon = social.icon
            return (
              <a
                key={idx}
                href={social.href}
                className="p-4 bg-card border border-orange-500/30 rounded-full hover:border-orange-500/60 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5 text-orange-400" />
              </a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
