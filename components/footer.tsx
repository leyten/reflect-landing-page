import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-8 bg-zinc-50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-8 md:mb-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LogoTransparant-EFMqjstaAL9FZb6V7FEbMIIXa9gFEu.png"
              alt="Reflect Logo"
              width={36}
              height={36}
              className="mr-3"
            />
            <span className="font-medium text-lg tracking-tight text-zinc-900">Reflect</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <nav className="flex gap-8 mb-8 md:mb-0">
              <Link href="#faq" className="text-zinc-600 hover:text-zinc-900 text-sm">
                FAQ
              </Link>
            </nav>

            <div className="flex items-center gap-4">

              <a
                href="https://x.com/use_reflect"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
                aria-label="Follow us on X (Twitter)"
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
                <span className="text-sm">Follow on X</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
