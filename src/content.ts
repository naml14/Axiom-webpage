export type LandingSection = {
  title: string
  body: string
  highlights?: string[]
}

export const hero = {
  eyebrow: 'Axiom Framework',
  title: 'The DOM is just the output screen.',
  body:
    'Axiom is a low-level web framework built around two-phase rendering: calculate in memory first, then write the DOM once. The hot path is arithmetic, not browser guesswork.',
}

export const metrics = [
  { value: '0', label: 'DOM reads in the hot path', hint: 'No getBoundingClientRect, no layout thrashing.' },
  { value: '3', label: 'Pipeline phases', hint: 'prepare → reflow → commit.' },
  { value: '1', label: 'Batched write', hint: 'The DOM is updated in one pass.' },
]

export const features: LandingSection[] = [
  {
    title: 'In-memory layout math',
    body: 'Structure is analyzed once, layout is recomputed cheaply, and the DOM is only written at the end.',
    highlights: ['prepare caches metrics', 'reflow uses pure arithmetic', 'commit applies batched writes'],
  },
  {
    title: 'Signals built in',
    body: 'State changes are reactive by default, so the framework can batch rapid updates into a single render cycle.',
    highlights: ['signal()', 'computed()', 'effect()'],
  },
  {
    title: 'SSR + hydration',
    body: 'Server rendering and client rehydration are part of the public story, with data-axiom markers for reuse.',
    highlights: ['renderToString()', 'createApp({ hydrate: true })', 'strictHydration mode'],
  },
]

export const pipelineStages = [
  {
    name: 'prepare()',
    title: 'Analyze structure',
    body: 'The tree is inspected once so metrics can be cached before layout work starts.',
    snippet: 'prepare() → analyze structure, cache metrics',
  },
  {
    name: 'reflow()',
    title: 'Compute positions',
    body: 'Layout is recalculated with pure arithmetic, without DOM reads or strings.',
    snippet: 'reflow() → positions, sizes, zero DOM reads',
  },
  {
    name: 'commit()',
    title: 'Write once',
    body: 'DOM nodes are updated in a single batch, minimizing layout churn.',
    snippet: 'commit() → removes, updates, inserts',
  },
]

export const installCommands = [
  'bun add axiom-framework',
  'npm install axiom-framework',
]

export const comparisonRows = [
  ['DOM reads in hot path', '0', 'Yes', 'Yes', 'Minimal'],
  ['Layout algorithm', 'In-memory arithmetic', 'Browser CSS', 'Browser CSS', 'Browser CSS'],
  ['Signals', 'Built-in', 'useState/Zustand', 'ref/reactive', 'Stores'],
]

export const ssrSnippets = {
  server: `import { renderToString } from 'axiom-framework'\n\nconst html = renderToString(MyComponent, {\n  width: 1200,\n  metadata: { title: 'My App', description: 'Built with axiom' },\n})`,
  client: `import { createApp } from 'axiom-framework'\n\nconst app = createApp(MyComponent, root, {\n  hydrate: true,\n  strictHydration: false,\n})\napp.mount()`,
}
