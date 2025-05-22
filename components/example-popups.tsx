export default function ExamplePopups() {
  const popups = [
    {
      message: "You've placed 14 trades in the last hour. Are you overtrading?",
      type: "warning",
    },
    {
      message: "This looks like a revenge trade. Pause before you execute.",
      type: "alert",
    },
    {
      message: "You're on a losing streak. Reflect recommends stepping away.",
      type: "danger",
    },
  ]

  return (
    <section className="py-32 bg-[#f8d300]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-24 tracking-tight">Real-time Guidance</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {popups.map((popup, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-black/5"
            >
              <div className="h-8 bg-gray-800 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-6">
                <div
                  className={`mb-4 p-4 rounded-lg ${
                    popup.type === "warning"
                      ? "bg-yellow-50 border-l-4 border-black"
                      : popup.type === "alert"
                        ? "bg-orange-50 border-l-4 border-orange-500"
                        : "bg-red-50 border-l-4 border-red-500"
                  }`}
                >
                  <p className="font-medium text-black/80">{popup.message}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded-full">Dismiss</button>
                  <button className="px-3 py-1 text-sm bg-black text-white rounded-full">Take Action</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
