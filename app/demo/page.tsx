import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Invoice to JSON demo',
  description:
    'Upload a PDF invoice or bank statement and get validated JSON back, with an accuracy table on 30 test documents.',
}

export default function DemoPage() {
  const space = site.demos.invoiceSpace
  return (
    <div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-20">
      <h1 className="text-h2 font-semibold">Invoice to JSON</h1>
      <p className="mt-3 max-w-copy text-ink-2">
        Upload a PDF invoice or bank statement. The pipeline extracts a fixed set of fields (amount,
        date, counterparty, category), validates them, and returns JSON. The accuracy table inside the
        demo is measured on 30 test documents.
      </p>

      {space ? (
        <div className="mt-8 overflow-hidden rounded-[4px] border border-rule bg-paper-2">
          <iframe
            src={space}
            title="Invoice to JSON demo"
            className="h-[80vh] min-h-[640px] w-full"
            allow="clipboard-write"
          />
        </div>
      ) : (
        <div className="mt-8 rounded-[4px] border border-rule bg-paper-2 p-6">
          <p>
            The demo is being published. For a walkthrough on your own documents, write to{' '}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-8 max-w-copy text-[15px] text-ink-2">
        <h2 className="font-semibold text-ink">About the documents you upload</h2>
        <p className="mt-2">
          Files are processed in memory for the duration of the request and are not stored. Use sample
          or anonymised documents all the same; do not upload documents containing personal data.
        </p>
      </div>
    </div>
  )
}
