export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect your wallet",
      description: "Securely link your Solana wallet with a single click. No private keys required.",
    },
    {
      number: "02",
      title: "AI analyzes your trading",
      description: "Our AI studies your patterns and emotional triggers to build your trading profile.",
    },
    {
      number: "03",
      title: "Get real-time guidance",
      description: "Receive timely interventions exactly when you need them most.",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-zinc-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-medium mb-6 tracking-tight text-zinc-900">How It Works</h2>
          <p className="text-lg text-zinc-600 font-light leading-relaxed">
            Reflect integrates seamlessly with your trading workflow, providing guidance without disruption.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-start gap-8 mb-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-[#f8d300] flex items-center justify-center flex-shrink-0">
                <span className="font-medium text-zinc-900">{step.number}</span>
              </div>
              <div className={`flex-1 ${index % 2 === 1 ? "text-right" : ""}`}>
                <h3 className="text-2xl font-medium mb-3 tracking-tight text-zinc-900">{step.title}</h3>
                <p className="text-zinc-600 font-light">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
