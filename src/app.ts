import {
  computed,
  defineComponent,
  signal,
  createPortal,
} from "axiom-framework";
import {
  comparisonRows,
  features,
  hero,
  installCommands,
  metrics,
  pipelineStages,
  ssrSnippets,
} from "./content";
import { styles } from "./styles";

export const pipelineStep = signal(0);
export const activePipelineStage = computed(
  () => pipelineStages[pipelineStep.value],
);

export const setPipelineStep = (step: number) => {
  const total = pipelineStages.length;
  pipelineStep.value = ((step % total) + total) % total;
};

export const nextPipelineStep = () => setPipelineStep(pipelineStep.value + 1);
export const previousPipelineStep = () =>
  setPipelineStep(pipelineStep.value - 1);
export const resetPipelineStep = () => setPipelineStep(0);

const SectionHeading = defineComponent(
  "SectionHeading",
  (props: { eyebrow: string; title: string; body: string }) => ({
    type: "element" as const,
    tag: "div",
    classes: [styles.sectionHeader],
    children: [
      {
        type: "element" as const,
        tag: "span",
        classes: [styles.eyebrow],
        children: [{ type: "text" as const, content: props.eyebrow }],
      },
      {
        type: "element" as const,
        tag: "h2",
        children: [{ type: "text" as const, content: props.title }],
      },
      {
        type: "element" as const,
        tag: "p",
        children: [{ type: "text" as const, content: props.body }],
      },
    ],
  }),
);

const MetricCard = defineComponent(
  "MetricCard",
  (props: { value: string; label: string; hint: string }) => ({
    type: "element" as const,
    tag: "article",
    classes: [styles.metric],
    children: [
      {
        type: "element" as const,
        tag: "strong",
        children: [{ type: "text" as const, content: props.value }],
      },
      {
        type: "element" as const,
        tag: "div",
        children: [{ type: "text" as const, content: props.label }],
      },
      {
        type: "element" as const,
        tag: "span",
        children: [{ type: "text" as const, content: props.hint }],
      },
    ],
  }),
);

const FeatureCard = defineComponent(
  "FeatureCard",
  (props: { title: string; body: string; highlights: string[] }) => ({
    type: "element" as const,
    tag: "article",
    classes: [styles.card],
    children: [
      {
        type: "element" as const,
        tag: "h3",
        children: [{ type: "text" as const, content: props.title }],
      },
      {
        type: "element" as const,
        tag: "p",
        children: [{ type: "text" as const, content: props.body }],
      },
      {
        type: "element" as const,
        tag: "ul",
        children: props.highlights.map((item) => ({
          type: "element" as const,
          tag: "li",
          children: [{ type: "text" as const, content: item }],
        })),
      },
    ],
  }),
);

const CodeBlock = defineComponent("CodeBlock", (props: { code: string }) => ({
  type: "element" as const,
  tag: "pre",
  classes: [styles.codeBlock],
  children: [
    {
      type: "element" as const,
      tag: "code",
      children: [{ type: "text" as const, content: props.code }],
    },
  ],
}));

export const LandingPage = defineComponent("LandingPage", () => {
  const stage = activePipelineStage.value;
  const activeIndex = pipelineStep.value;

  return createPortal(
    [
      {
        type: "element" as const,
        tag: "main",
        classes: [styles.page],
        children: [
          {
            type: "element" as const,
            tag: "header",
            classes: [styles.topbar],
            children: [
              {
                type: "element" as const,
                tag: "div",
                classes: [styles.brand],
                children: [
                  {
                    type: "element" as const,
                    tag: "img",
                    attrs: { src: "/favicon.ico" },
                    classes: [styles.mark],
                  },
                  {
                    type: "element" as const,
                    tag: "span",
                    children: [
                      { type: "text" as const, content: "axiom-framework" },
                    ],
                  },
                ],
              },
              {
                type: "element" as const,
                tag: "nav",
                classes: [styles.nav],
                children: [
                  {
                    type: "element" as const,
                    tag: "a",
                    attrs: { href: "#features" },
                    children: [{ type: "text" as const, content: "Features" }],
                  },
                  {
                    type: "element" as const,
                    tag: "a",
                    attrs: { href: "#demo" },
                    children: [{ type: "text" as const, content: "Demo" }],
                  },
                  {
                    type: "element" as const,
                    tag: "a",
                    attrs: { href: "#ssr" },
                    children: [{ type: "text" as const, content: "SSR" }],
                  },
                  {
                    type: "element" as const,
                    tag: "a",
                    attrs: { href: "#install" },
                    children: [{ type: "text" as const, content: "Install" }],
                  },
                ],
              },
            ],
          },
          {
            type: "element" as const,
            tag: "section",
            classes: [styles.hero],
            children: [
              {
                type: "element" as const,
                tag: "div",
                classes: [styles.heroCopy],
                children: [
                  {
                    type: "element" as const,
                    tag: "div",
                    classes: [styles.eyebrow],
                    children: [
                      { type: "text" as const, content: hero.eyebrow },
                    ],
                  },
                  {
                    type: "element" as const,
                    tag: "h1",
                    children: [{ type: "text" as const, content: hero.title }],
                  },
                  {
                    type: "element" as const,
                    tag: "p",
                    classes: [styles.lead],
                    children: [{ type: "text" as const, content: hero.body }],
                  },
                  {
                    type: "element" as const,
                    tag: "div",
                    classes: [styles.ctaRow],
                    children: [
                      {
                        type: "element" as const,
                        tag: "a",
                        classes: [styles.primaryButton],
                        attrs: { href: "#demo" },
                        children: [
                          {
                            type: "text" as const,
                            content: "See the pipeline",
                          },
                        ],
                      },
                      {
                        type: "element" as const,
                        tag: "a",
                        classes: [styles.secondaryButton],
                        attrs: { href: "#install" },
                        children: [
                          { type: "text" as const, content: "Install it" },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "element" as const,
                tag: "aside",
                classes: [styles.heroProof],
                children: [
                  {
                    type: "element" as const,
                    tag: "img",
                    attrs: {
                      src: "/final-logo-gif-656x400.webp",
                      alt: "Axiom Demo",
                      style:
                        "width: 100%; height: auto; border-radius: 20px; border: 1px solid var(--border); display: block;",
                    },
                  },
                  {
                    type: "element" as const,
                    tag: "div",
                    classes: [styles.metricGrid],
                    children: metrics.map((metric) => MetricCard(metric)),
                  },
                  {
                    type: "element" as const,
                    tag: "div",
                    classes: [styles.panel],
                    children: [
                      {
                        type: "element" as const,
                        tag: "span",
                        classes: [styles.eyebrow],
                        children: [
                          {
                            type: "text" as const,
                            content: "Performance story",
                          },
                        ],
                      },
                      {
                        type: "element" as const,
                        tag: "h3",
                        children: [
                          {
                            type: "text" as const,
                            content: "The hot path is numbers in, numbers out.",
                          },
                        ],
                      },
                      {
                        type: "element" as const,
                        tag: "p",
                        classes: [styles.lead],
                        children: [
                          {
                            type: "text" as const,
                            content:
                              "No DOM reads. No strings. No allocations. Just cached metrics and arithmetic.",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "element" as const,
            tag: "section",
            classes: [styles.section],
            attrs: { id: "features" },
            children: [
              SectionHeading({
                eyebrow: "Why it matters",
                title:
                  "Built for render work that should not become layout chaos.",
                body: "The framework separates expensive structural analysis from cheap viewport-driven recomputation.",
              }),
              {
                type: "element" as const,
                tag: "div",
                classes: [styles.featureGrid],
                children: features.map((feature) =>
                  FeatureCard({
                    title: feature.title,
                    body: feature.body,
                    highlights: feature.highlights ?? [],
                  }),
                ),
              },
            ],
          },
          {
            type: "element" as const,
            tag: "section",
            classes: [styles.section],
            attrs: { id: "demo" },
            children: [
              SectionHeading({
                eyebrow: "Interactive demo",
                title:
                  "Click through the pipeline and watch the active phase change.",
                body: "This section is intentionally simple: it proves the framework story with visible state, not marketing noise.",
              }),
              {
                type: "element" as const,
                tag: "div",
                classes: [styles.demoShell],
                children: [
                  {
                    type: "element" as const,
                    tag: "div",
                    classes: [styles.pipeline],
                    children: pipelineStages.map((step, index) => ({
                      type: "element" as const,
                      tag: "article",
                      key: `step-${index}-${index === activeIndex ? "active" : "inactive"}`,
                      classes: [
                        index === activeIndex
                          ? styles.pipelineStepActive
                          : styles.pipelineStep,
                      ],
                      children: [
                        {
                          type: "element" as const,
                          tag: "h3",
                          children: [
                            { type: "text" as const, content: step.name },
                          ],
                        },
                        {
                          type: "element" as const,
                          tag: "strong",
                          children: [
                            { type: "text" as const, content: step.title },
                          ],
                        },
                        {
                          type: "element" as const,
                          tag: "p",
                          children: [
                            { type: "text" as const, content: step.body },
                          ],
                        },
                      ],
                    })),
                  },
                  {
                    type: "element" as const,
                    tag: "div",
                    classes: [styles.demoControls],
                    children: [
                      {
                        type: "element" as const,
                        tag: "button",
                        classes: [styles.primaryButton],
                        attrs: {
                          type: "button",
                          id: "pipeline-prev",
                          "data-pipeline-action": "prev",
                        },
                        children: [
                          { type: "text" as const, content: "Previous" },
                        ],
                      },
                      {
                        type: "element" as const,
                        tag: "button",
                        classes: [styles.secondaryButton],
                        attrs: {
                          type: "button",
                          id: "pipeline-next",
                          "data-pipeline-action": "next",
                        },
                        children: [{ type: "text" as const, content: "Next" }],
                      },
                      {
                        type: "element" as const,
                        tag: "button",
                        classes: [styles.secondaryButton],
                        attrs: {
                          type: "button",
                          id: "pipeline-reset",
                          "data-pipeline-action": "reset",
                        },
                        children: [{ type: "text" as const, content: "Reset" }],
                      },
                    ],
                  },
                  {
                    type: "element" as const,
                    tag: "div",
                    classes: [styles.demoState],
                    children: [
                      {
                        type: "element" as const,
                        tag: "article",
                        classes: [styles.panel],
                        children: [
                          {
                            type: "element" as const,
                            tag: "span",
                            classes: [styles.eyebrow],
                            children: [
                              {
                                type: "text" as const,
                                content: "Current phase",
                              },
                            ],
                          },
                          {
                            type: "element" as const,
                            tag: "h3",
                            children: [
                              {
                                type: "text" as const,
                                content: `${stage.name} — ${stage.title}`,
                              },
                            ],
                          },
                          {
                            type: "element" as const,
                            tag: "p",
                            classes: [styles.lead],
                            children: [
                              { type: "text" as const, content: stage.body },
                            ],
                          },
                        ],
                      },
                      CodeBlock({ code: stage.snippet }),
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "element" as const,
            tag: "section",
            classes: [styles.section],
            attrs: { id: "ssr" },
            children: [
              SectionHeading({
                eyebrow: "SSR + hydration",
                title:
                  "Public API support for server rendering and client reuse.",
                body: "The landing page should show the public contract, not internal implementation details.",
              }),
              {
                type: "element" as const,
                tag: "div",
                classes: [styles.comparisonGrid],
                children: [
                  CodeBlock({ code: ssrSnippets.server }),
                  CodeBlock({ code: ssrSnippets.client }),
                ],
              },
            ],
          },
          {
            type: "element" as const,
            tag: "section",
            classes: [styles.section],
            attrs: { id: "comparison" },
            children: [
              SectionHeading({
                eyebrow: "Context",
                title: "How Axiom frames the tradeoff.",
                body: "The page should educate visitors on the model without pretending to be a full-stack replacement.",
              }),
              {
                type: "element" as const,
                tag: "div",
                classes: [styles.comparisonGrid],
                children: comparisonRows.map((row) => ({
                  type: "element" as const,
                  tag: "article",
                  classes: [styles.comparisonRow],
                  children: [
                    {
                      type: "element" as const,
                      tag: "h3",
                      children: [{ type: "text" as const, content: row[0] }],
                    },
                    {
                      type: "element" as const,
                      tag: "p",
                      children: [
                        { type: "text" as const, content: `Axiom: ${row[1]}` },
                      ],
                    },
                    {
                      type: "element" as const,
                      tag: "p",
                      children: [
                        { type: "text" as const, content: `React: ${row[2]}` },
                      ],
                    },
                    {
                      type: "element" as const,
                      tag: "p",
                      children: [
                        { type: "text" as const, content: `Vue: ${row[3]}` },
                      ],
                    },
                    {
                      type: "element" as const,
                      tag: "p",
                      children: [
                        { type: "text" as const, content: `Svelte: ${row[4]}` },
                      ],
                    },
                  ],
                })),
              },
            ],
          },
          {
            type: "element" as const,
            tag: "section",
            classes: [styles.section],
            attrs: { id: "install" },
            children: [
              SectionHeading({
                eyebrow: "Install",
                title: "Start with Bun or npm.",
                body: "The landing page should include the same public command documented in the README.",
              }),
              {
                type: "element" as const,
                tag: "div",
                classes: [styles.featureGrid],
                children: installCommands.map((command) =>
                  CodeBlock({ code: command }),
                ),
              },
            ],
          },
          {
            type: "element" as const,
            tag: "footer",
            classes: [styles.footer],
            children: [
              {
                type: "element" as const,
                tag: "span",
                children: [
                  {
                    type: "text" as const,
                    content: "Built with Axiom + Bun + TypeScript",
                  },
                ],
              },
              {
                type: "element" as const,
                tag: "span",
                children: [
                  {
                    type: "text" as const,
                    content: "Public README claims only",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    document.getElementById("app")!,
  );
});
