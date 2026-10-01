import Link from 'next/link'
import CopyBlock from '@/components/CopyBlock'
import ProofBars from '@/components/ProofBars'
import Row from '@/components/Row'
import Section from '@/components/Section'
import { about, principles, services, tiers, tiersNote } from '@/lib/content'
import { bookingHref, site, upworkHref } from '@/lib/site'
import { work } from '@/lib/work'

const claudeConfig = `{
  "mcpServers": {
    "belex": {
      "command": "npx",
      "args": ["-y", "belex-mcp"]
    }
  }
}`

export default function Home() {
  return (
    <>
      {/* Hero: the claim on the left, a real result from a published project on the right. */}
      <section className="mx-auto grid max-w-content items-center gap-x-12 gap-y-10 px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="max-w-[18ch] text-display font-medium">
            LLMs connected to your data, with the numbers to prove it.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[19px] leading-relaxed text-ink-2">
            I build MCP servers, document assistants that cite their sources, and document-to-data
            pipelines for finance and operations teams. Every project is scoped and priced before it
            starts, and ships with an evaluation report.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#demos" className="btn-primary">
              See live demos
            </a>
            <a href={bookingHref()} className="btn-secondary">
              Book 20 minutes
            </a>
          </div>
        </div>
        <div className="lg:col-span-5">
          <ProofBars />
        </div>
      </section>

      <Section
        id="services"
        title="What I build"
        intro="Three things, each with a paid pilot on your data as the first step."
      >
        {services.map((s, i) => (
          <Row
            key={s.id}
            first={i === 0}
            label={<h3 className="text-h3 font-semibold">{s.title}</h3>}
          >
            <p className="text-ink-2">{s.lead}</p>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 marker:text-ink-2">
              {s.youGet.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className="mt-4">
              <span className="font-medium">Pilot:</span> {s.pilot}
            </p>
          </Row>
        ))}

        <div className="mt-6 border-t border-ink pt-8">
          <h3 className="text-h3 font-semibold">How engagements are sized</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[16px]">
              <thead>
                <tr className="border-b border-rule text-ink-2">
                  <th scope="col" className="py-2 pr-4 font-medium">Package</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Price</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Time</th>
                  <th scope="col" className="py-2 font-medium">You get</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.name} className="border-b border-rule align-top">
                    <td className="py-3 pr-4 font-medium">{t.name}</td>
                    <td className="num py-3 pr-4">{t.price}</td>
                    <td className="num py-3 pr-4 whitespace-nowrap">{t.days}</td>
                    <td className="py-3">{t.includes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-copy text-ink-2">{tiersNote}</p>
          <p className="mt-3 max-w-copy text-ink-2">
            The same packages are listed on{' '}
            <a href={upworkHref()} className="link" target="_blank" rel="noopener">
              Upwork
            </a>
            , with escrow and milestones, if you would rather start there.
          </p>
        </div>
      </Section>

      <Section id="demos" title="Live demos" intro="Things you can try before writing to me.">
        <Row
          first
          label={
            <div>
              <h3 className="text-h3 font-semibold">belex-mcp</h3>
              <p className="mt-1 text-[15px] text-ink-2">MCP server, on npm</p>
            </div>
          }
        >
          <p className="text-ink-2">
            Twelve tools over Belgrade Stock Exchange quotes, indices and National Bank of Serbia
            rates. Add it to Claude Desktop, then ask for yesterday&apos;s EUR/RSD mid-rate or the
            day&apos;s most traded shares.
          </p>
          <div className="mt-4">
            <CopyBlock code={claudeConfig} label="claude_desktop_config.json" />
          </div>
          {site.demos.mcpRemoteUrl ? (
            <p className="mt-4">
              No install: connect to{' '}
              <code className="rounded-[3px] bg-paper-2 px-1.5 py-0.5 font-mono text-[14px]">
                {site.demos.mcpRemoteUrl}
              </code>{' '}
              as a remote MCP server.
            </p>
          ) : null}
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
            <a href="https://www.npmjs.com/package/belex-mcp" className="link" target="_blank" rel="noopener">
              npm
            </a>
            <a href="https://github.com/filipovicfilip222/belex-mcp" className="link" target="_blank" rel="noopener">
              GitHub
            </a>
            <Link href="/work/belex-mcp" className="link">
              How it is built
            </Link>
          </p>
        </Row>

        {site.demos.invoiceSpace ? (
          <Row
            label={
              <div>
                <h3 className="text-h3 font-semibold">Invoice to JSON</h3>
                <p className="mt-1 text-[15px] text-ink-2">Runs in the browser</p>
              </div>
            }
          >
            <p className="text-ink-2">
              Upload a PDF invoice or bank statement and get validated JSON back: amount, date,
              counterparty, category. The accuracy table on 30 test documents is on the demo page.
            </p>
            <p className="mt-4">
              <Link href="/demo" className="btn-secondary">
                Open the demo
              </Link>
            </p>
          </Row>
        ) : null}
      </Section>

      <Section
        id="work"
        title="Work"
        intro="Four public projects. Each page lists what was built, the measured result and the limitations."
      >
        {work.map((w, i) => (
          <Row
            key={w.slug}
            first={i === 0}
            label={
              <div>
                <h3 className="text-h3 font-semibold">
                  <Link href={`/work/${w.slug}`} className="link decoration-transparent">
                    {w.title}
                  </Link>
                </h3>
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
      </Section>

      <Section id="how" title="How I work" intro="The six things every engagement has in common.">
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title}>
              <dt className="font-semibold">{p.title}</dt>
              <dd className="mt-1.5 text-ink-2">{p.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="about" title="About">
        <div className="copy max-w-copy">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <div className="max-w-copy">
          <p className="text-[19px] leading-relaxed">
            Write to{' '}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>{' '}
            with a sample of the documents or the data source you have in mind, and what a good
            result would look like. You will hear back within one working day.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={bookingHref()} className="btn-primary">
              Book 20 minutes
            </a>
            <a href={upworkHref()} className="btn-secondary" target="_blank" rel="noopener">
              Start on Upwork
            </a>
          </div>
          <p className="mt-6 text-[15px] text-ink-2">
            Upwork projects come with escrow and milestones, useful for a first engagement. Larger
            pilots can also run on a direct contract.
          </p>
        </div>
      </Section>
    </>
  )
}
