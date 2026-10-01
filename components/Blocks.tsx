import CopyBlock from '@/components/CopyBlock'
import type { Block } from '@/lib/work'

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="copy max-w-copy">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'p':
            return <p key={i}>{b.text}</p>
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          case 'code':
            return (
              <div key={i} className="my-5">
                <CopyBlock code={b.code} label={b.label} />
              </div>
            )
          case 'table':
            return (
              <div key={i} className="my-5 overflow-x-auto">
                <table className="w-full border-collapse text-[15px]">
                  {b.caption ? <caption className="pb-2 text-left text-ink-2">{b.caption}</caption> : null}
                  <thead>
                    <tr className="border-b border-ink text-left">
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="py-2 pr-4 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr
                        key={r}
                        className={`border-b border-rule align-top ${b.highlightRow === r ? 'bg-paper-2 font-medium' : ''}`}
                      >
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={`num py-2 pr-4 ${c === 0 && b.caption === 'Tools' ? 'whitespace-nowrap font-mono text-[14px]' : ''}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        }
      })}
    </div>
  )
}
