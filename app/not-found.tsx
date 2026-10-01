import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-5 py-20 md:px-8">
      <h1 className="text-h2 font-semibold">There is no page at this address</h1>
      <p className="mt-3 text-ink-2">
        The link may be old. The case studies live under{' '}
        <Link href="/work" className="link">
          /work
        </Link>
        , and everything else is on the{' '}
        <Link href="/" className="link">
          home page
        </Link>
        .
      </p>
    </div>
  )
}
