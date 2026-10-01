// Case studies. Every number here appears in the project's public README or
// published evaluation report. If a number is not there yet, it is not here.

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'table'; caption?: string; head: string[]; rows: string[][]; highlightRow?: number }
  | { kind: 'code'; label?: string; code: string }

export type Section = { heading: string; blocks: Block[]; tone?: 'limits' }

export type CaseStudy = {
  slug: string
  title: string
  kicker: string
  summary: string
  headline: string
  stack: string[]
  links: { label: string; href: string }[]
  sections: Section[]
}

export const work: CaseStudy[] = [
  {
    slug: 'belex-mcp',
    title: 'belex-mcp',
    kicker: 'Open-source MCP server, on npm',
    summary:
      'Belgrade Stock Exchange quotes, indices and National Bank of Serbia rates as twelve typed tools that Claude, Cursor or any MCP client can call.',
    headline: 'Twelve typed tools over Belex and NBS data, installed with one npx line',
    stack: ['TypeScript', 'Node.js 20', 'MCP SDK', 'Zod', 'undici', 'vitest', 'GitHub Actions'],
    links: [
      { label: 'npm', href: 'https://www.npmjs.com/package/belex-mcp' },
      { label: 'GitHub', href: 'https://github.com/filipovicfilip222/belex-mcp' },
    ],
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            kind: 'p',
            text: 'Asking an LLM about Serbian markets meant one of two things: custom scraping written into each agent, or answers made up from stale training data. There was no standard way to hand Claude or Cursor the Belgrade Stock Exchange or the National Bank of Serbia figures.',
          },
        ],
      },
      {
        heading: 'What I built',
        blocks: [
          {
            kind: 'p',
            text: 'A Node.js and TypeScript MCP server that exposes Belex and NBS data as tools with Zod input schemas. Every tool returns JSON with ISO 8601 timestamps in Europe/Belgrade and prices in RSD unless noted.',
          },
          {
            kind: 'table',
            caption: 'Tools',
            head: ['Tool', 'What it returns'],
            rows: [
              ['belex_list_companies', 'Instruments listed on Belex'],
              ['belex_get_company_profile', 'Profile for one symbol'],
              ['belex_get_quote', 'Latest quote: last, OHLCV, change'],
              ['belex_get_historical_prices', 'Daily OHLCV bars across a date range'],
              ['belex_get_index', 'BELEX15 and BELEXline current value'],
              ['belex_get_index_constituents', 'Index members and weights'],
              ['belex_get_market_summary', 'End-of-day turnover, gainers, losers, most traded'],
              ['nbs_list_currencies', 'Currencies the NBS publishes'],
              ['nbs_get_exchange_rate', 'Mid, buy and sell rate for a date'],
              ['nbs_get_exchange_rate_series', 'Daily mid-rates across a date range'],
              ['nbs_get_reference_rate', 'NBS key policy rate'],
              ['nbs_get_inflation', 'Year-on-year and month-on-month CPI'],
            ],
          },
          {
            kind: 'ul',
            items: [
              'HTTP layer with retries, exponential backoff with jitter, an in-process LRU cache and a budget of one request per second per host, so the server is polite to the sources it scrapes',
              'A fixture-backed unit test for every tool, strict TypeScript, linting and CI on each push',
              'Architecture decisions recorded as ADRs in the repository',
              'MIT licence; published to npm, listed in public MCP registries',
            ],
          },
          {
            kind: 'code',
            label: 'Claude Desktop config',
            code: `{
  "mcpServers": {
    "belex": {
      "command": "npx",
      "args": ["-y", "belex-mcp"]
    }
  }
}`,
          },
        ],
      },
      {
        heading: 'Limitations',
        tone: 'limits',
        blocks: [
          {
            kind: 'ul',
            items: [
              'Data comes from public pages of belex.rs and nbs.rs, so a layout change upstream can break a tool until its fixtures are updated',
              'Informational use only. For trading or settlement, use the authoritative source directly',
              'Runs over stdio today. A hosted endpoint, so a client can connect by URL instead of installing, is the next step',
            ],
          },
        ],
      },
      {
        heading: 'What this means for your project',
        blocks: [
          {
            kind: 'p',
            text: 'The structure is the deliverable: typed tools, validation, caching, a test per tool and an install guide. A pilot MCP server over your PostgreSQL database, REST API or reporting tables follows the same shape.',
          },
        ],
      },
    ],
  },

  {
    slug: 'finagent',
    title: 'FinAgent',
    kicker: 'Multi-agent financial research with an evaluation harness',
    summary:
      'A LangGraph agent that decides which tools to call across SEC filings, web search, a sandboxed calculator and RAG, checks whether it has enough to answer, and returns a structured, cited result.',
    headline: '100% numerical accuracy on the 14 checkable answers of a 22-question evaluation, zero runtime errors',
    stack: ['Python', 'LangGraph', 'Anthropic API', 'OpenAI API', 'Pydantic', 'ChromaDB', 'FastAPI'],
    links: [{ label: 'GitHub', href: 'https://github.com/filipovicfilip222/FinAgent' }],
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            kind: 'p',
            text: 'A financial research question usually needs several sources, some arithmetic and the judgement to say "not enough yet". Most agent loops hide that control flow and declare success early, which makes their answers hard to trust and impossible to grade.',
          },
        ],
      },
      {
        heading: 'What I built',
        blocks: [
          {
            kind: 'p',
            text: 'An explicit state graph with four nodes. The planner reads the question and everything gathered so far and emits a typed decision: call one tool, with arguments and a stated reason, or finish. The tool executor runs it and records the call; failures are captured, never raised. The reflect node is deliberately sceptical and sends the planner back when information is missing, with a hard iteration cap. The finalize node forces the answer through a Pydantic schema with key numbers, citations and a confidence that drops on any tool error or forced stop.',
          },
          {
            kind: 'table',
            caption: 'Tools',
            head: ['Tool', 'What it does'],
            rows: [
              ['sec_edgar', 'Official figures from the SEC XBRL API, with concept aliasing and an on-disk fixture cache for reproducible runs'],
              ['calculator', 'Arithmetic through a sandboxed AST evaluator with an operator whitelist; no eval()'],
              ['web_search', 'News and context outside filings, with a stub for offline runs'],
              ['rag_retrieve', 'Passages from indexed 10-K PDFs in ChromaDB, returned with citations'],
            ],
          },
          {
            kind: 'ul',
            items: [
              'A provider abstraction (Anthropic, OpenAI, or a deterministic mock) so the whole graph, including the reflection loop, runs in CI with no API keys',
              'A FastAPI endpoint and a CLI',
              '30 offline unit and graph tests; CI runs lint, tests and the offline evaluation on every push',
            ],
          },
        ],
      },
      {
        heading: 'Results',
        blocks: [
          {
            kind: 'p',
            text: 'The evaluation set has 22 questions: single-tool lookups, multi-tool calculations, cross-company comparisons, RAG, web, and one deliberately ambiguous item. The run below used Claude.',
          },
          {
            kind: 'table',
            caption: '22 questions, real run',
            head: ['Metric', 'Value'],
            rows: [
              ['Numerical accuracy, within tolerance', '100% (14 of 14 checkable)'],
              ['Answer-content checks passed', '90% (n = 10)'],
              ['Reflection loop triggered', '54.5% (12 of 22)'],
              ['Reflection recall on questions designed to need it', '100% (n = 5)'],
              ['Tool selection, exact set match', '36.4%'],
              ['Tool selection, mean Jaccard', '0.674'],
              ['Planner iterations per question, average', '1.14'],
              ['Confidence distribution', '14 high, 3 medium, 5 low'],
              ['Runtime errors', '0'],
            ],
            highlightRow: 0,
          },
          {
            kind: 'p',
            text: 'On the ambiguous question, which of two companies is more profitable and by how much, the reflect node flagged that profitability needs a margin comparison and that one company\'s figures were missing, looped back four times across five SEC look-ups, answered with both readings, and reported low confidence because it had hit its step budget.',
          },
        ],
      },
      {
        heading: 'Limitations',
        tone: 'limits',
        blocks: [
          {
            kind: 'ul',
            items: [
              'Exact tool-set match is moderate at 36%: on easy derived values the model sometimes computes inline instead of calling the calculator, and RAG questions fall back to other tools when retrieval is unavailable. Mean Jaccard of 0.67 shows the primary tool is almost always right',
              'The ticker-to-CIK map is static and covers five companies, enough for the evaluation, not for production',
              'RAG runs locally only; in the sandboxed CI the embedding endpoints are network-gated',
              '22 questions is a smoke-test-sized set. It checks routing, arithmetic and the reflection loop, not long-horizon research',
            ],
          },
        ],
      },
      {
        heading: 'What this means for your project',
        blocks: [
          {
            kind: 'p',
            text: 'The harness is the part that transfers. For your assistant we write the question set and the pass criteria first, then build until it passes, and you keep the harness to re-run after every change.',
          },
        ],
      },
    ],
  },

  {
    slug: 'serbfin-sentiment',
    title: 'SerbFin-Sentiment',
    kicker: 'Fine-tuned Serbian financial-sentiment model, on Hugging Face',
    summary:
      'Llama 3.2 3B fine-tuned with QLoRA to classify Serbian financial headlines from an investor\'s point of view, scored against a human-labelled test set alongside two baselines.',
    headline: 'Macro-F1 0.74 against 0.64 zero-shot and 0.54 for translate-then-FinBERT, on 240 human-labelled headlines',
    stack: ['Python', 'PyTorch', 'Hugging Face PEFT', 'TRL', 'bitsandbytes', 'Llama 3.2 3B Instruct'],
    links: [
      { label: 'Model', href: 'https://huggingface.co/filipovicfilip222/serbfin-sentiment-llama-3.2-3b' },
      { label: 'Dataset', href: 'https://huggingface.co/datasets/filipovicfilip222/serbfin-sentiment' },
      { label: 'GitHub', href: 'https://github.com/filipovicfilip222/SerbFin-Sentiment' },
    ],
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            kind: 'p',
            text: 'There was no public model for Serbian financial sentiment. The task is investor-perspective sentiment, not emotion: a headline about cutting 5,000 jobs to protect margins is positive for the market. The usual workaround, translate to English and run FinBERT, loses exactly that nuance.',
          },
        ],
      },
      {
        heading: 'What I built',
        blocks: [
          {
            kind: 'ul',
            items: [
              'A headline corpus with an LLM-labelled training pool (351 train, 150 validation) and a 240-headline gold test set labelled by a human annotator, balanced across the three classes and held out from training',
              'A QLoRA fine-tune of Llama 3.2 3B Instruct: 4-bit NF4 quantisation with bf16 compute, LoRA rank 16, alpha 32, dropout 0.05 on all linear projections',
              'Training with TRL\'s SFTTrainer, loss on label tokens only, three epochs at learning rate 2e-4 with cosine decay, on a rented RTX A5000 in under 90 seconds',
              'An evaluation harness that scores the fine-tuned adapter and both baselines on the same gold set and writes macro-F1, per-class metrics, confusion matrices and the malformed-output rate',
              'Dataset (741 examples, CC BY 4.0) and adapter weights published on the Hugging Face Hub with a generated model card',
            ],
          },
        ],
      },
      {
        heading: 'Results',
        blocks: [
          {
            kind: 'table',
            caption: '240 human-labelled headlines, held out',
            head: ['System', 'Macro-F1', 'Accuracy', 'Malformed outputs'],
            rows: [
              ['Fine-tuned Llama 3.2 3B, QLoRA adapter', '0.74', '0.73', '0%'],
              ['Zero-shot Llama 3.2 3B Instruct', '0.64', '0.64', '0%'],
              ['Translate to English, then FinBERT', '0.54', '0.54', '0%'],
            ],
            highlightRow: 0,
          },
          {
            kind: 'p',
            text: 'Error analysis: 45 of the 64 mistakes are positive or negative headlines predicted as neutral. The training pool is 53% neutral while the test set is balanced, which points at the fix.',
          },
        ],
      },
      {
        heading: 'Limitations',
        tone: 'limits',
        blocks: [
          {
            kind: 'ul',
            items: [
              'The checkpoint was chosen by validation loss on LLM-labelled data, not by macro-F1 on the gold set',
              '240 test headlines is enough to rank the three systems, not to resolve differences of a point or two',
              'Short headlines only; longer texts were not evaluated',
            ],
          },
        ],
      },
      {
        heading: 'Next experiment',
        blocks: [
          {
            kind: 'p',
            text: 'Class-weighted loss or a rebalanced training pool, and checkpoint selection by validation macro-F1.',
          },
        ],
      },
      {
        heading: 'What this means for your project',
        blocks: [
          {
            kind: 'p',
            text: 'When an API model is too slow or too expensive for a classification you run thousands of times a day, a small fine-tuned model with a human-labelled test set is the business case. This project is the template: gold test set first, baselines second, fine-tune third, numbers published.',
          },
        ],
      },
    ],
  },

  {
    slug: 'finsight',
    title: 'FinSight',
    kicker: 'Question answering over financial reports, with page-level sources',
    summary:
      'A retrieval-augmented assistant over annual and quarterly report PDFs that answers in natural language and shows the pages it drew on.',
    headline: 'Answers over financial PDFs with the source page attached to each one',
    stack: ['Python', 'LangChain', 'OpenAI GPT-4', 'text-embedding-3-small', 'ChromaDB', 'pdfplumber'],
    links: [{ label: 'GitHub', href: 'https://github.com/filipovicfilip222/FinSight' }],
    sections: [
      {
        heading: 'The problem',
        blocks: [
          {
            kind: 'p',
            text: 'Annual reports and quarterly filings run to hundreds of pages. Analysts need the figure, the sentence it came from and the page number, not a summary they cannot verify.',
          },
        ],
      },
      {
        heading: 'What I built',
        blocks: [
          {
            kind: 'ul',
            items: [
              'Ingestion of report PDFs with PyPDF or pdfplumber for table-heavy pages, split into 1,000-character chunks with 200 characters of overlap',
              'Embeddings with text-embedding-3-small stored in a persistent ChromaDB collection with page metadata',
              'Top-five retrieval into GPT-4 at low temperature, answers returned with the source documents, page numbers and a preview of the passage used',
              'A CLI with an interactive mode, single-question mode, and preset revenue and strategy analyses',
            ],
          },
        ],
      },
      {
        heading: 'Results',
        blocks: [
          {
            kind: 'p',
            text: 'Evaluation pending. A twenty-question comparison of this retriever against a hybrid retriever (BM25 plus embeddings) with a cross-encoder reranker is being added. Until that table exists, no accuracy claim is made for this project.',
          },
        ],
      },
      {
        heading: 'Limitations',
        tone: 'limits',
        blocks: [
          {
            kind: 'ul',
            items: ['No published evaluation yet', 'Single embedding retriever, no reranking', 'Command-line interface only'],
          },
        ],
      },
      {
        heading: 'What this means for your project',
        blocks: [
          {
            kind: 'p',
            text: 'This is the baseline shape of the document assistant service. A pilot adds your documents, twenty of your questions and the scored table that this project is still missing.',
          },
        ],
      },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return work.find((w) => w.slug === slug)
}
