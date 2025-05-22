import { ShieldCheck, TrendingUp, Brain, Clock } from "lucide-react"
import AnimatedSection from "@/components/animated-section"

export default function WhyUseReflect() {
  const reasons = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: "Protect Your Capital",
      description: "Avoid emotional decisions that lead to unnecessary losses.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
      title: "Improve Win Rate",
      description: "Focus on strategies that actually work for you.",
    },
    {
      icon: <Brain className="w-6 h-6 text-amber-500" />,
      title: "Develop EQ",
      description: "Recognize and manage emotions that influence your trades.",
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      title: "Save Time",
      description: "Get real-time guidance when you need it most.",
    },
  ]

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <AnimatedSection animation="fade-up">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight text-zinc-900">Why Use Reflect?</h2>
            <p className="text-lg text-zinc-600 font-light leading-relaxed">
              Trading is as much about psychology as it is about strategy. Reflect gives you the edge that technical
              analysis alone can't provide.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 150}>
              <div className="p-8">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-medium mb-3 tracking-tight text-zinc-900">{reason.title}</h3>
                <p className="text-zinc-600 font-light">{reason.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
