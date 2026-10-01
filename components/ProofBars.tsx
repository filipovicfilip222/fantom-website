import Link from 'next/link'

const rows = [
  { label: 'Fine-tuned Llama 3.2 3B, QLoRA', value: 0.74, main: true },
  { label: 'Zero-shot Llama 3.2 3B', value: 0.64 },
  { label: 'Translate to English, then FinBERT', value: 0.54 },
]

// The hero's proof: a real result table from a published project, not a mock-up.
export default function ProofBars() {
  return (
    <figure className="rounded-[4px] border border-rule bg-paper-2 p-5 md:p-6">
      <figcaption className="text-[15px] leading-snug text-ink-2">
        Macro-F1 on 240 human-labelled Serbian financial headlines, held out from training
      </figcaption>
      <dl className="mt-5 space-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-baseline justify-between gap-4">
              <dt className={`text-[15px] ${r.main ? 'font-medium text-ink' : 'text-ink-2'}`}>{r.label}</dt>
              <dd className={`num text-[15px] ${r.main ? 'font-semibold text-ink' : 'text-ink-2'}`}>
                {r.value.toFixed(2)}
              </dd>
            </div>
            <div className="mt-1.5 h-2 w-full rounded-[2px] bg-paper" aria-hidden="true">
              <div
                className={`h-2 rounded-[2px] ${r.main ? 'bg-green' : 'bg-rule'}`}
                style={{ width: `${Math.round(r.value * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-[15px] text-ink-2">
        From{' '}
        <Link href="/work/serbfin-sentiment" className="link">
          SerbFin-Sentiment
        </Link>
        , published on Hugging Face with the dataset and the evaluation harness.
      </p>
    </figure>
  )
}
