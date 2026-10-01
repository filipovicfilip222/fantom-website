'use client'

import { useState } from 'react'

type Props = { code: string; label?: string }

export default function CopyBlock({ code, label }: Props) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setState('copied')
    } catch {
      setState('failed')
    }
    setTimeout(() => setState('idle'), 1800)
  }

  return (
    <div className="overflow-hidden rounded-[4px] border border-rule bg-paper-2">
      <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-2 text-[14px] text-ink-2">
        <span>{label ?? 'Code'}</span>
        <button
          type="button"
          onClick={copy}
          className="rounded-[3px] px-2 py-1 font-medium text-ink hover:text-green"
          aria-live="polite"
        >
          {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select and copy' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[14px] leading-relaxed text-ink">
        <code>{code}</code>
      </pre>
    </div>
  )
}
