import type { ReactNode } from 'react'

type Props = {
  label: ReactNode
  children: ReactNode
  first?: boolean
}

// One entry in a section: label column on the left, body on the right, a rule above.
export default function Row({ label, children, first }: Props) {
  return (
    <div className={`grid gap-x-8 gap-y-3 py-7 md:grid-cols-12 ${first ? '' : 'border-t border-rule'}`}>
      <div className="md:col-span-4">{label}</div>
      <div className="md:col-span-8">{children}</div>
    </div>
  )
}
