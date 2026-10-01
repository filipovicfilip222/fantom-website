// Every external URL and feature switch lives here.
// An empty string means "not available yet"; components fall back gracefully
// (a missing booking link becomes a mailto, a missing demo URL hides the demo).

export const site = {
  name: 'Fantom Systems',
  owner: 'Filip Filipović',
  url: 'https://fantom.systems',
  email: 'filip@fantom.systems',
  location: 'Belgrade, Serbia',
  description:
    'MCP servers, document assistants with sources, and document-to-data pipelines for finance and operations teams. Fixed scope, fixed price, an evaluation report with every delivery.',

  links: {
    github: 'https://github.com/filipovicfilip222',
    huggingface: 'https://huggingface.co/filipovicfilip222',
    upwork: 'https://www.upwork.com/freelancers/~018dd1e316c4cb3fa0',
    // TODO: paste the public URL of the "MCP server that connects Claude or GPT to your data"
    // catalog project. Until then the Upwork buttons point at the profile above.
    upworkCatalog: '',
    // TODO: LinkedIn profile URL. Hidden while empty.
    linkedin: '',
    // TODO: cal.com (or similar) booking link. While empty, "Book 20 minutes" opens an email.
    booking: '',
  },

  demos: {
    // TODO: direct URL of the Hugging Face Space, e.g. https://filipovicfilip222-invoice-to-json.hf.space
    // The demo card on the home page and the /demo embed appear only when this is set.
    invoiceSpace: '',
    // TODO: remote MCP endpoint, e.g. https://mcp.fantom.systems/belex
    // When set, the belex-mcp demo shows a "paste this URL" option next to the npx install.
    mcpRemoteUrl: '',
  },
} as const

export function upworkHref(): string {
  return site.links.upworkCatalog || site.links.upwork
}

export function bookingHref(): string {
  return (
    site.links.booking ||
    `mailto:${site.email}?subject=${encodeURIComponent('20 minutes about a pilot')}`
  )
}
