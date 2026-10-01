// Home-page copy. Rule for every line here: promise only what a demo or a
// published project already shows. Numbers come from lib/work.ts.

export type Service = {
  id: string
  title: string
  lead: string
  youGet: string[]
  pilot: string
}

export const services: Service[] = [
  {
    id: 'mcp',
    title: 'An MCP server for your data',
    lead:
      'Claude, ChatGPT or Cursor get safe, typed access to your database, API or reporting tables, so people ask a question instead of filing a lookup request.',
    youGet: [
      'Typed tools with validated inputs, read-only unless you decide otherwise',
      'Caching, retries and rate limits, so one bad query cannot take a source down',
      'Install guide for Claude Desktop, Cursor or your own agent',
      'A test per tool, runnable without live credentials',
    ],
    pilot: 'Two or three tools over one data source. $200, five days.',
  },
  {
    id: 'rag',
    title: 'An assistant that answers from your documents, with sources',
    lead:
      'A chat assistant over your PDFs, policies, contracts and manuals that cites the page it used, so every answer can be checked.',
    youGet: [
      'Ingestion for your document set, including PDFs with tables',
      'Retrieval tuned on your own questions, not a generic benchmark',
      'Page-level citations on every answer',
      'A question set with scored answer accuracy that you can re-run after changes',
    ],
    pilot: 'One document set, twenty of your questions scored. $200, five days.',
  },
  {
    id: 'extract',
    title: 'Documents into structured data',
    lead:
      'Invoices, bank statements and contracts into validated JSON or Excel, with an accuracy table on your own sample before anything goes live.',
    youGet: [
      'Extraction against a schema you approve first',
      'Field-level validation: totals reconcile, dates parse, identifiers check out',
      'An accuracy table per field on your documents',
      'Export to JSON, Excel or straight into your system',
    ],
    pilot: 'Twenty of your documents extracted and scored. $200, five days.',
  },
]

export type Tier = {
  name: string
  price: string
  days: string
  includes: string
}

export const tiers: Tier[] = [
  {
    name: 'Pilot',
    price: '$200',
    days: '5 days',
    includes: 'Proof on your sample and a short report with the numbers.',
  },
  {
    name: 'Working version',
    price: '$500',
    days: '10 days',
    includes: 'A runnable script or API with documentation, ready for your team to use.',
  },
  {
    name: 'Integration',
    price: '$1,500',
    days: '21 days',
    includes: 'Deployed in your stack, with an evaluation suite and a handover session.',
  },
]

export const tiersNote =
  'Larger pilots, such as document intake or transaction categorisation across a whole department, run two to four weeks and are scoped separately.'

export type Principle = { title: string; text: string }

export const principles: Principle[] = [
  {
    title: 'Start on your sample',
    text: 'Anonymised documents or a read-only copy are enough for a pilot. NDA on request.',
  },
  {
    title: 'No production access',
    text: 'I work on a copy. You deploy, or we deploy together inside your own cloud account.',
  },
  {
    title: 'Data can stay in the EU',
    text: 'When it has to, models run through AWS Bedrock in an EU region rather than a US API.',
  },
  {
    title: 'Fixed scope, fixed price',
    text: 'Written down before work starts. A change in scope is re-quoted, not absorbed into surprises.',
  },
  {
    title: 'Numbers with every delivery',
    text: 'An evaluation set and a one-page report: accuracy, latency and cost per request.',
  },
  {
    title: 'A small first step',
    text: 'Every engagement starts with a paid pilot on your data, so you see the result before committing further.',
  },
]

// Current employer deliberately not named until the employment contract's
// clauses on side work and public profiles have been checked.
export const about = [
  'Fantom Systems is the independent practice of Filip Filipović. I studied software engineering at the University of Belgrade (ETF, 2022–2026), specialising in AI, cloud engineering and FinTech.',
  'As an AI and cloud engineering intern at Levi9 I shipped a production scheduling assistant on AWS Bedrock (Claude, Lambda, API Gateway, DynamoDB, Cognito) and built MCP servers that exposed PostgreSQL and REST data to Claude and GPT-4 as validated tools, replacing manual lookups.',
  'In the open: belex-mcp on npm, the first MCP server for the Serbian financial market, and SerbFin-Sentiment on Hugging Face, the first public Serbian financial-sentiment model.',
]
