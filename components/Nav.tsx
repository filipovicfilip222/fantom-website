import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'Demos', href: '/#demos' },
  { label: 'How I work', href: '/#how' },
  { label: 'Contact', href: '/#contact' },
]

export default function Nav() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-ink">
          <Image src="/mark.png" alt="" width={40} height={32} priority className="h-8 w-auto" />
          <span className="font-medium">{site.name}</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link decoration-transparent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
