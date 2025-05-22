export default function WhyItMatters() {
  const painPoints = [
    {
      title: "Overtrading and tilt",
      description: "Emotional reactions lead to excessive trading and poor decision-making.",
    },
    {
      title: "Emotional decision-making",
      description: "Fear and greed override rational analysis, resulting in costly mistakes.",
    },
    {
      title: "No system for reflection or feedback",
      description: "Without awareness of patterns, traders repeat the same errors.",
    },
  ]

  return (
    <section className="py-32 bg-[#f8d300]">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-8 tracking-tight">
          Most traders don't lose to the market — they lose to themselves.
        </h2>
        <p className="text-xl text-center text-black/70 mb-24 max-w-3xl mx-auto font-light leading-relaxed">
          Reflect helps you identify and overcome the emotional barriers that stand between you and consistent profits.
        </p>

        <div className="space-y-12">
          {painPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-6">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-medium">{index + 1}</span>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3 tracking-tight">{point.title}</h3>
                <p className="text-black/70 font-light">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
