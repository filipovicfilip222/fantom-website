import type { ReactNode } from 'react'

type Props = {
  id?: string
  title: string
  intro?: string
  children: ReactNode
}

// A ledger section: the heading sits in the left margin column, the entries on the right.
export default function Section({ id, title, intro, children }: Props) {
  return (
    <section id={id} className="scroll-mt-6 border-t border-rule">
      <div className="mx-auto grid max-w-content gap-x-10 gap-y-6 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 className="text-h2 font-semibold">{title}</h2>
          {intro ? <p className="mt-3 max-w-[38ch] text-ink-2">{intro}</p> : null}
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  )
}
