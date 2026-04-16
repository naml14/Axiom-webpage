import { createApp } from 'axiom-framework'
import { LandingPage, nextPipelineStep, previousPipelineStep, resetPipelineStep } from './app'

const root = document.getElementById('app')

if (!root) {
  throw new Error('Missing #app root element')
}

const app = createApp(LandingPage, root, {
  lineHeight: 22,
  font: '16px Inter, system-ui, sans-serif',
})

app.mount()

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? (event.target.closest('[data-pipeline-action]') as HTMLElement | null) : null

  if (!target) return

  switch (target.dataset.pipelineAction) {
    case 'prev':
      previousPipelineStep()
      break
    case 'next':
      nextPipelineStep()
      break
    case 'reset':
      resetPipelineStep()
      break
  }
})
