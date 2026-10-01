import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Blocks from '@/components/Blocks'
import { bookingHref, site } from '@/lib/site'
import { getCaseStudy, work } from '@/lib/work'

type Params = { params: { slug: string } }

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const cs = getCaseStudy(params.slug)
  if (!cs) return {}
  return {
    title: cs.title,
    description: cs.headline,
    openGraph: { title: `${cs.title} | ${site.name}`, description: cs.headline },
  }
}

export default function CaseStudyPage({ params }: Params) {
  const cs = getCaseStudy(params.slug)
  if (!cs) notFound()

  return (
    <article className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
      <p className="text-[15px] text-ink-2">
        <Link href="/work" className="link">
          Work
        </Link>
      </p>

      <header className="mt-4 grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h1 className="text-display font-medium">{cs.title}</h1>
          <p className="mt-3 text-[19px] text-ink-2">{cs.kicker}</p>
          <p className="mt-6 max-w-copy text-[19px] font-medium leading-relaxed">{cs.headline}</p>
        </div>
        <aside className="text-[15px] lg:col-span-4 lg:pt-3">
          <h2 className="font-semibold">Links</h2>
          <ul className="mt-2 space-y-1">
            {cs.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link" target="_blank" rel="noopener">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <h2 className="mt-6 font-semibold">Stack</h2>
          <p className="mt-2 text-ink-2">{cs.stack.join(', ')}</p>
        </aside>
      </header>

      <div className="mt-12">
        {cs.sections.map((s) => (
          <section
            key={s.heading}
            className={`grid gap-x-10 gap-y-3 border-t py-8 lg:grid-cols-12 ${
              s.tone === 'limits' ? 'border-red' : 'border-rule'
            }`}
          >
            <h2 className={`text-h3 font-semibold lg:col-span-4 ${s.tone === 'limits' ? 'text-red' : ''}`}>
              {s.heading}
            </h2>
            <div className="lg:col-span-8">
              <Blocks blocks={s.blocks} />
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-4 border-t border-ink pt-8">
        <p className="max-w-copy text-[19px] leading-relaxed">
          Have a data source or a document set like this?{' '}
          <a href={`mailto:${site.email}`} className="link">
            Write to me
          </a>{' '}
          or{' '}
          <a href={bookingHref()} className="link">
            book 20 minutes
          </a>
          . Every engagement starts with a paid pilot on your own sample.
        </p>
      </footer>
    </article>
  )
}
