import Link from 'next/link'
import { site } from '@/lib/site'

export default function Footer() {
  const links = [
    { label: 'GitHub', href: site.links.github },
    { label: 'Hugging Face', href: site.links.huggingface },
    { label: 'Upwork', href: site.links.upwork },
    ...(site.links.linkedin ? [{ label: 'LinkedIn', href: site.links.linkedin }] : []),
  ]
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-5 py-8 text-[15px] text-ink-2 md:flex-row md:items-start md:justify-between md:px-8">
        <div>
          <p>
            {site.owner}, {site.location}. © {new Date().getFullYear()} {site.name}.
          </p>
          <p className="mt-1">
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link" target="_blank" rel="noopener">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
