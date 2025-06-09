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
                href="https://discord.gg/usereflect"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
                aria-label="Join our Discord server"
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
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="15" cy="12" r="1" />
                  <path d="M7.5 7.2c3.5-1 5.5-1 9 0" />
                  <path d="M7.5 16.8c3.5 1 5.5 1 9 0" />
                  <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5" />
                  <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.476-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5" />
                </svg>
                <span className="text-sm">Join Discord</span>
              </a>

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
