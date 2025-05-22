import { Button } from "@/components/ui/button"

export default function FinalCTA() {
  return (
    <section className="py-32 bg-[#f8d300]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-medium text-black mb-8 tracking-tight">Be your own edge.</h2>
        <p className="text-xl text-black/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Stop letting emotions dictate your trading results. Join the waitlist for early access.
        </p>
        <Button
          className="bg-black text-white hover:bg-black/90 px-8 py-6 text-base rounded-full transition-all duration-300 font-medium tracking-wide"
          asChild
        >
          <a
            href="https://x.com/use_reflect"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
            Follow for updates
          </a>
        </Button>
      </div>
    </section>
  )
}
