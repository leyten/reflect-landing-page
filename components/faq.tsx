"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"
import AnimatedSection from "@/components/animated-section"

interface FAQItemProps {
  question: string
  answer: string
  index: number
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AnimatedSection animation="fade-up" delay={index * 100}>
      <div className="border border-zinc-200 rounded-xl mb-4 overflow-hidden">
        <button
          className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-xl font-medium text-zinc-900">{question}</span>
          <ChevronDown
            className={`w-6 h-6 text-zinc-500 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-6 pt-0 text-zinc-600 font-light">{answer}</div>
        </div>
      </div>
    </AnimatedSection>
  )
}

export default function FAQ() {
  const faqs = [
    {
      question: "Does Reflect have access to my funds?",
      answer:
        "No. Reflect only reads your trading activity to provide insights. It never has access to your private keys or the ability to execute trades on your behalf.",
    },
    {
      question: "Is this a trading bot?",
      answer:
        "No — Reflect doesn't trade for you. It helps you trade better by providing real-time insights and emotional guidance when you need it most.",
    },
    {
      question: "Is my data private?",
      answer:
        "Yes. Your behavioral data stays local unless you opt in to sharing. We take privacy seriously and give you complete control over your information.",
    },
    {
      question: "What chains does it support?",
      answer:
        "Solana first. More chains coming soon. We're starting with Solana due to its degen nature and amount of emotional traders.",
    },
  ]

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-4">
          <AnimatedSection animation="fade-up">
            <span className="text-[#f8d300] font-medium">FAQ</span>
          </AnimatedSection>
        </div>
        <AnimatedSection animation="fade-up" delay={100}>
          <h2 className="text-5xl md:text-6xl font-medium text-center mb-16 tracking-tight text-zinc-900">
            Frequently Asked Questions
          </h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
