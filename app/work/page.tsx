import type { Metadata } from 'next'
import Link from 'next/link'
import Row from '@/components/Row'
import { work } from '@/lib/work'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Four public projects: what was built, the measured result and the limitations.',
}

export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
      <h1 className="text-h2 font-semibold">Work</h1>
      <p className="mt-3 max-w-copy text-ink-2">
        Four public projects. Each page lists what was built, the measured result and the
        limitations, with links to the code and the published artefacts.
      </p>
      <div className="mt-8">
        {work.map((w, i) => (
          <Row
            key={w.slug}
            first={i === 0}
            label={
              <div>
                <h2 className="text-h3 font-semibold">
                  <Link href={`/work/${w.slug}`} className="link decoration-transparent">
                    {w.title}
                  </Link>
                </h2>
                <p className="mt-1 text-[15px] text-ink-2">{w.kicker}</p>
              </div>
            }
          >
            <p className="font-medium">{w.headline}</p>
            <p className="mt-2 text-ink-2">{w.summary}</p>
            <p className="mt-3 text-[15px]">
              <Link href={`/work/${w.slug}`} className="link">
                Read the case study
              </Link>
            </p>
          </Row>
        ))}
      </div>
    </div>
  )
}
