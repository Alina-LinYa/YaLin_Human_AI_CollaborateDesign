import { useEffect, useEffectEvent, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, Bot, Braces, Check, CircleUserRound, Expand, FlaskConical, Mail, MousePointer2, Palette, Pencil, Play, Search, Send, Sparkles, X } from 'lucide-react'
import './App.css'
import alinaPhoto from './assets/alina.jpg'

const SLIDE_COUNT = 15
const DECK_WIDTH = 1440
const DECK_HEIGHT = 828
const NAV_HEIGHT = 70

function DarkVeil() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    let frame = 0
    let animationId = 0
    const pointer = { x: .66, y: .35 }
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2)
      canvas.width = canvas.clientWidth * ratio
      canvas.height = canvas.clientHeight * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }
    const handlePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = (event.clientX - bounds.left) / bounds.width
      pointer.y = (event.clientY - bounds.top) / bounds.height
    }
    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      frame += .006
      context.fillStyle = '#7352ff'
      context.fillRect(0, 0, width, height)
      context.globalCompositeOperation = 'screen'
      ;[
        { color: 'rgba(93,223,206,.42)', phase: 0, scale: .78 },
        { color: 'rgba(243,77,221,.3)', phase: 2.1, scale: .62 },
        { color: 'rgba(255,201,54,.28)', phase: 4.2, scale: .5 },
      ].forEach((field, index) => {
        const x = width * (pointer.x * .22 + .38 + Math.sin(frame + field.phase) * .2)
        const y = height * (pointer.y * .12 + .34 + Math.cos(frame * .8 + field.phase) * .16)
        const radius = Math.max(width, height) * field.scale
        const glow = context.createRadialGradient(x, y, 0, x, y, radius)
        glow.addColorStop(0, field.color)
        glow.addColorStop(.42 + index * .06, field.color.replace(/\.[0-9]+\)/, '.07)'))
        glow.addColorStop(1, 'rgba(0,0,0,0)')
        context.fillStyle = glow
        context.fillRect(0, 0, width, height)
      })
      context.globalCompositeOperation = 'source-over'
      animationId = requestAnimationFrame(draw)
    }
    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', handlePointer)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', handlePointer)
    }
  }, [])

  return <canvas className="dark-veil" ref={canvasRef} aria-hidden="true" />
}

function SlideOne() {
  return <div className="slide slide-1">
    <DarkVeil />
    <div className="cover-lower">
      <div className="cover-pattern" aria-hidden="true">
        {Array.from({ length: 40 }, (_, index) => <i key={index} />)}
      </div>
      <p className="cover-message"><span>AI is not replacing designers.</span> It’s changing what we design.</p>
    </div>
    <div className="title-lockup">
      <div className="eyebrow light cover-eyebrow">A HUMAN-IN-THE-LOOP PERSPECTIVE <span>/&nbsp; Impulse 26</span></div>
      <h1>Designing Human-AI <span>Collaboration</span></h1>
      <div className="cover-byline"><img src={alinaPhoto} alt="Ya Lin" /><span>Ya Lin</span></div>
    </div>
    <div className="title-index">01 / 15</div>
  </div>
}

function SlideTwo() {
  return <div className="slide slide-2 paper-slide">
    <div className="eyebrow">THE FIRST ENCOUNTER</div>
    <h2>Remember the first time you met AI?</h2>
    <div className="emotion-stage" aria-label="Excited, amazed, uncertain">
      <span className="emotion excited">Excited.</span>
      <span className="emotion amazed">Amazed.</span>
      <span className="emotion uncertain">Uncertain.</span>
    </div>
    <p className="speaker-line">Sometimes all three at once.</p>
  </div>
}

const capabilities = [
  { title: 'UI', kicker: 'It composes', icon: Palette, className: 'ui' },
  { title: 'Code', kicker: 'It builds', icon: Braces, className: 'code' },
  { title: 'Research', kicker: 'It synthesizes', icon: Search, className: 'research' },
]

type SlideThreeProps = {
  active: number
  onActiveChange: (index: number) => void
}

function SlideThree({ active, onActiveChange }: SlideThreeProps) {
  return <div className="slide slide-3 dark-slide">
    <div className="slide-heading"><div className="eyebrow light">THEN THE NOVELTY BECAME CAPABILITY</div><h2>And then it started doing the work.</h2></div>
    <div className="capability-gallery">
      {capabilities.map((item, index) => {
        const Icon = item.icon
        return <button type="button" className={`capability-panel ${item.className} ${active === index ? 'active' : ''}`} onPointerEnter={() => onActiveChange(index)} onFocus={() => onActiveChange(index)} onClick={() => onActiveChange(index)} aria-current={active === index ? 'step' : undefined} key={item.title}>
          <div className="panel-number">0{index + 1}</div>
          <div className="panel-art" aria-hidden="true">
            {item.className === 'ui' && <div className="mock-ui"><i /><i /><i /><b /></div>}
            {item.className === 'code' && <div className="mock-code"><i /><i /><i /><i /></div>}
            {item.className === 'research' && <div className="mock-research"><i /><i /><i /></div>}
          </div>
          <div className="panel-label"><Icon size={19} /><span>{item.kicker}</span><strong>{item.title}</strong></div>
        </button>
      })}
    </div>
  </div>
}

function SlideFour() {
  return <div className="slide slide-4 paper-slide">
    <div className="question-orbit" aria-hidden="true"><span>?</span></div>
    <div className="question-copy"><div className="eyebrow">THE QUESTION UNDERNEATH IT ALL</div><h2>So what is left<br />for <em>designers</em> to do?</h2></div>
  </div>
}

function SlideFive() {
  return <div className="slide slide-5 dark-slide">
    <div className="slide-heading compact"><div className="eyebrow light">THE SURFACE AREA KEEPS EXPANDING</div><h2>Every few years,<br />the abstraction moves up.</h2></div>
    <div className="evolution-map">
      <div className="evolution-track">
        <div className="era muted tool-era"><span>1990s–2010s</span><strong>Interface tools</strong><div className="legacy-tools"><span>Photoshop</span><span>Illustrator</span><span>Axure</span><span>Sketch</span></div><small>Draw and prototype the interface</small></div><ArrowRight />
        <div className="era"><span>2016</span><strong>Figma</strong><small>Collaborate on it</small></div><ArrowRight />
        <div className="era glow"><span>NOW</span><strong>AI Generate</strong><small>Describe the outcome</small></div>
      </div>
      <div className="shift-line"><span>UI design</span><div><i /></div><strong>Prompt design</strong></div>
    </div>
  </div>
}

function SlideSix() {
  return <div className="slide slide-6 core-slide">
    <div className="core-ring" aria-hidden="true"><Sparkles /></div>
    <div className="core-copy"><div className="eyebrow light">THE CORE QUESTION</div><h2>If AI can design<br />the interface…</h2><p>what should <em>we</em> design?</p></div>
  </div>
}

const pastObjects = [
  { label: 'Interface', details: ['Screen', 'Layout', 'Component'] },
  { label: 'Interaction', details: ['Flow', 'Navigation', 'Feedback'] },
  { label: 'Control', details: ['Button', 'Input', 'State'] },
  { label: 'Response', details: ['Rules', 'Errors', 'Confirmation'] },
]
const futureObjects = [
  { label: 'Decision', details: ['Intent', 'Confidence', 'Trade-offs'] },
  { label: 'Responsibility', details: ['Ownership', 'Escalation'] },
  { label: 'Trust', details: ['Transparency', 'Consent'] },
  { label: 'Collaboration', details: ['Handoff', 'Feedback'] },
]
function SlideSeven() {
  return <div className="slide slide-7 paper-slide">
    <div className="slide-heading compact"><div className="eyebrow">THE REAL SHIFT</div><h2>AI isn’t just changing our tools.<br />It’s changing our <em>material.</em></h2></div>
    <div className="material-grid">
      <div className="material-column past"><span className="column-label">WE DESIGNED THE VISIBLE EXPERIENCE</span><div className="object-list grouped-object-list">{pastObjects.map((object) => <div className="object-group" key={object.label}><strong>{object.label}</strong><div>{object.details.map((detail) => <span key={detail}>{detail}</span>)}</div></div>)}</div><div className="simple-flow"><span>User clicks</span><ArrowRight /><span>System responds</span></div></div>
      <div className="material-divider"><ArrowRight /></div>
      <div className="material-column future"><span className="column-label">NOW WE DESIGN THE SYSTEM’S BEHAVIOR</span><div className="object-list grouped-object-list">{futureObjects.map((object) => <div className="object-group" key={object.label}><strong>{object.label}</strong><div>{object.details.map((detail) => <span key={detail}>{detail}</span>)}</div></div>)}</div><div className="agent-flow"><span><Bot />Think</span><i /><span><FlaskConical />Plan</span><i /><span><Play />Act</span><b><CircleUserRound />Human steps in</b></div></div>
    </div>
  </div>
}

const decisionWords = ['Context', 'Intent', 'Confidence', 'Trade-offs', 'Escalation', 'Consent']
function SlideEight() {
  return <div className="slide slide-8 dark-slide">
    <div className="decision-field" aria-hidden="true">{decisionWords.map((word, index) => <span style={{ '--index': index } as CSSProperties} key={word}>{word}</span>)}</div>
    <div className="decision-core"><div className="eyebrow light">A NEW DESIGN OBJECT APPEARS</div><h2>Decision<br /><em>making.</em></h2><p>Not just what the system does.<br />How it decides to do it.</p></div>
  </div>
}

function SlideNine() {
  return <div className="slide slide-9 finale-slide">
    <div className="final-copy"><div className="eyebrow light">THE NEXT DESIGN PRACTICE</div><h2>Human<br /><em>in the Loop</em></h2><p>isn’t an AI technique.</p><strong>It’s a design problem.</strong></div>
    <div className="loop-system" aria-label="A continuous loop between human judgment and AI agency">
      <svg viewBox="0 0 540 360" role="presentation"><defs><linearGradient id="loopGradient"><stop stopColor="#5ddfce" /><stop offset=".52" stopColor="#ffffff" /><stop offset="1" stopColor="#f34ddd" /></linearGradient></defs><path className="loop-path shadow" d="M130 180c0-88 280-88 280 0s-280 88-280 0Z" /><path className="loop-path energy" d="M130 180c0-88 280-88 280 0s-280 88-280 0Z" /></svg>
      <div className="loop-node human"><CircleUserRound /><span>Human</span><small>judgment</small></div><div className="loop-node ai"><Bot /><span>AI</span><small>agency</small></div><div className="loop-label top">GUIDE</div><div className="loop-label bottom">REVIEW</div>
    </div>
  </div>
}

const designerRoles = [
  { generation: '01', role: 'Interface Designer', object: 'UI', detail: 'Screens, controls, states' },
  { generation: '02', role: 'Experience Designer', object: 'User Journey', detail: 'Flows, touchpoints, outcomes' },
  { generation: '03', role: 'Human–AI Collaboration Designer', object: 'Decisions', detail: 'Agency, judgment, responsibility' },
]

type SlideTenProps = {
  active: number
  onActiveChange: (index: number) => void
}

function SlideTen({ active, onActiveChange }: SlideTenProps) {
  const aiStrengths = ['Rank', 'Recommend', 'Summarize', 'Retrieve', 'Generate options']
  const humanStrengths = ['Judge', 'Trade off', 'Own risk', 'Final approval']
  return <div className="slide slide-10 boundary-slide">
    <div className="slide-heading compact"><div className="eyebrow">ABOUT DECISION DESIGN</div><h2>“AI can do it” doesn’t mean<br /><em>“AI should do it.”</em></h2></div>
    <div className="decision-boundary">
      <button type="button" className={`strength-panel ai-strengths ${active === 0 ? 'active' : ''}`} onPointerEnter={() => onActiveChange(0)} onFocus={() => onActiveChange(0)} onClick={() => onActiveChange(0)} aria-current={active === 0 ? 'step' : undefined}>
        <div className="strength-heading"><Bot /><span><small>AI IS GOOD AT</small>Expanding the option space</span></div>
        <div className="strength-list">{aiStrengths.map((strength, index) => <span key={strength}><i>{String(index + 1).padStart(2, '0')}</i>{strength}</span>)}</div>
      </button>
      <div className="authority-divider"><span>CAN</span><strong>≠</strong><span>SHOULD</span></div>
      <button type="button" className={`strength-panel human-strengths ${active === 1 ? 'active' : ''}`} onPointerEnter={() => onActiveChange(1)} onFocus={() => onActiveChange(1)} onClick={() => onActiveChange(1)} aria-current={active === 1 ? 'step' : undefined}>
        <div className="strength-heading"><CircleUserRound /><span><small>PEOPLE ARE GOOD AT</small>Owning the consequences</span></div>
        <div className="strength-list">{humanStrengths.map((strength, index) => <span key={strength}><i>{String(index + 1).padStart(2, '0')}</i>{strength}</span>)}</div>
      </button>
    </div>
    <div className="boundary-takeaway"><strong>Capability is not authority.</strong><span>Decision design defines where AI assists—and where people remain accountable.</span></div>
  </div>
}

function SlideEleven() {
  return <div className="slide slide-11 role-slide">
    <div className="slide-heading compact"><div className="eyebrow">THE DESIGNER’S NEW ROLE</div><h2>When AI makes things,<br />designers design the <em>decision system.</em></h2></div>
    <div className="role-evolution">
      {designerRoles.map((role, index) => <div className={`role-generation generation-${index + 1}`} key={role.role}>
        <span className="role-number">{role.generation}</span>
        <div className="role-copy"><strong>{role.role}</strong><small>DESIGNS</small><b>{role.object}</b><p>{role.detail}</p></div>
      </div>)}
    </div>
  </div>
}

function SlideTwelve() {
  return <div className="slide slide-12 cases-slide">
    <div className="slide-heading compact"><div className="eyebrow">CASES</div><h2>The design value isn’t generation.<br />It’s where <em>judgment</em> enters.</h2></div>
    <div className="case-grid">
      <article className="case-card copilot-case">
        <div className="case-meta"><Braces /><span>GitHub Copilot</span><small>CODE SUGGESTION</small></div>
        <div className="code-suggestion" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="decision-actions"><span><Check />Accept</span><span><X />Reject</span><span><Pencil />Modify</span></div>
        <p>Its value isn’t that AI writes code. It gives people clear moments to decide.</p>
      </article>
      <article className="case-card message-case">
        <div className="case-meta"><Mail /><span>AI message draft</span><small>RESPONSIBLE ACTION</small></div>
        <div className="message-draft"><span>AI writes</span><ArrowRight /><span>Human reviews</span><ArrowRight /><strong><Send />Send</strong></div>
        <div className="responsibility-line"><i /><span>Human decision required</span></div>
        <p>Send creates responsibility. The human must keep the final decision.</p>
      </article>
    </div>
    <div className="case-takeaway"><strong>Our design question:</strong><span>When should a person enter, intervene, or decide?</span></div>
  </div>
}

const otherTriggerExamples = [
  { domain: 'Procure to Pay', signal: 'An invoice breaks the expected pattern' },
  { domain: 'Supply Chain', signal: 'A delay puts a commitment at risk' },
]

const crmFlow = [
  { label: 'Scan', detail: 'Email · meetings · orders', icon: Search },
  { label: 'Detect', detail: 'Human-defined signs', icon: Sparkles },
  { label: 'Identify', detail: 'Leads needing attention', icon: CircleUserRound },
  { label: 'Draft', detail: 'Contextual outreach', icon: Pencil },
  { label: 'Notify', detail: 'Bring the decision to a person', icon: Mail },
]

function SlideThirteen() {
  return <div className="slide slide-13 trigger-slide">
    <div className="trigger-heading">
      <div className="eyebrow">EXPANDING THE AI MESSAGE DRAFT</div>
      <h2>How do we design the moment people step in?</h2>
      <p>Before AI writes, define <strong>what should trigger the work</strong> and what evidence is enough to involve a person.</p>
    </div>
    <div className="trigger-content">
      <div className="trigger-library">
        <span className="section-label">THINK FROM HERE</span>
        <div className="primary-trigger">
          <strong>CRM</strong>
          <span>A high-value lead goes quiet</span>
        </div>
        <div className="other-triggers">
          <span className="section-label">OTHER SCENES</span>
          {otherTriggerExamples.map((trigger) => <div className="other-trigger" key={trigger.domain}>
            <strong>{trigger.domain}</strong>
            <span>{trigger.signal}</span>
          </div>)}
        </div>
      </div>
      <div className="crm-example">
        <div className="crm-title"><span>CRM EXAMPLE</span><strong>From background signals to a human decision</strong></div>
        <div className="goal-setting">
          <div><CircleUserRound /><span><small>HUMAN SETS THE DIRECTION</small><strong>Set the goal and define the signs to look for</strong></span></div>
          <ArrowRight />
          <span className="ai-execution-label"><Bot />AI begins execution</span>
        </div>
        <div className="crm-flow">
          {crmFlow.map((step, index) => {
            const Icon = step.icon
            return <div className="crm-flow-step" style={{ '--step': index } as CSSProperties} key={step.label}>
              <div><Icon /><span>{step.label}</span><small>{step.detail}</small></div>
              {index < crmFlow.length - 1 && <ArrowRight />}
            </div>
          })}
        </div>
        <div className="send-decision">
          <div><Send /><span><small>FINAL CONTROL POINT</small><strong>Send this message?</strong></span></div>
          <div className="send-options"><span>Review</span><span>Edit</span><strong>Send</strong></div>
        </div>
      </div>
    </div>
    <div className="trigger-takeaway"><strong>Design the trigger, not just the draft.</strong><span>AI monitors and prepares. A person decides when action creates responsibility.</span></div>
  </div>
}

function SlideFourteen() {
  return <div className="slide slide-14">
    <div className="beyond-words" aria-hidden="true"><span>DECISIONS</span><span>RESPONSIBILITY</span><span>TRUST</span></div>
    <h2><span>What we design</span><br />is no longer just<br />the <em>interface.</em></h2>
  </div>
}

function SlideFifteen() {
  return <div className="slide slide-15">
    <div className="finale-mark" aria-hidden="true"><CircleUserRound /><i /><Sparkles /></div>
    <h2><span className="finale-generation">The next generation of <strong>designers</strong></span><span className="finale-memory">will be remembered for the <em>decisions</em></span><span className="finale-human">they helped <b>humans</b> make.</span></h2>
  </div>
}

const slides = [SlideOne, SlideTwo, null, SlideFour, SlideFive, SlideSix, SlideSeven, SlideEight, SlideNine, null, SlideEleven, SlideTwelve, SlideThirteen, SlideFourteen, SlideFifteen]
function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'next' | 'previous'>('next')
  const [slideThreeCard, setSlideThreeCard] = useState(0)
  const [slideTenPanel, setSlideTenPanel] = useState(0)
  const [deckScale, setDeckScale] = useState(() => Math.min(window.innerWidth / DECK_WIDTH, (window.innerHeight - NAV_HEIGHT) / DECK_HEIGHT))
  const goTo = (next: number) => {
    const bounded = Math.max(0, Math.min(SLIDE_COUNT - 1, next))
    if (bounded === currentSlide) return
    if (bounded === 2) setSlideThreeCard(bounded > currentSlide ? 0 : capabilities.length - 1)
    if (bounded === 9) setSlideTenPanel(bounded > currentSlide ? 0 : 1)
    setDirection(bounded > currentSlide ? 'next' : 'previous')
    setCurrentSlide(bounded)
  }
  const goForward = () => {
    if (currentSlide === 2 && slideThreeCard < capabilities.length - 1) {
      setSlideThreeCard((card) => card + 1)
      return
    }
    if (currentSlide === 9 && slideTenPanel < 1) {
      setSlideTenPanel(1)
      return
    }
    goTo(currentSlide + 1)
  }
  const goBackward = () => {
    if (currentSlide === 2 && slideThreeCard > 0) {
      setSlideThreeCard((card) => card - 1)
      return
    }
    if (currentSlide === 9 && slideTenPanel > 0) {
      setSlideTenPanel(0)
      return
    }
    goTo(currentSlide - 1)
  }
  const navigateFromKey = useEffectEvent((action: 'forward' | 'backward' | number) => {
    if (action === 'forward') goForward()
    else if (action === 'backward') goBackward()
    else goTo(action)
  })
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(event.key)) { event.preventDefault(); navigateFromKey('forward') }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); navigateFromKey('backward') }
      if (event.key === 'Home') navigateFromKey(0)
      if (event.key === 'End') navigateFromKey(SLIDE_COUNT - 1)
      if (event.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  useEffect(() => {
    const resizeDeck = () => setDeckScale(Math.min(window.innerWidth / DECK_WIDTH, (window.innerHeight - NAV_HEIGHT) / DECK_HEIGHT))
    window.addEventListener('resize', resizeDeck)
    return () => window.removeEventListener('resize', resizeDeck)
  }, [])

  const activeSlide = currentSlide === 2
    ? <SlideThree active={slideThreeCard} onActiveChange={setSlideThreeCard} />
    : currentSlide === 9
      ? <SlideTen active={slideTenPanel} onActiveChange={setSlideTenPanel} />
    : (() => {
        const ActiveSlide = slides[currentSlide]
        return ActiveSlide ? <ActiveSlide /> : null
      })()

  const deckTop = (window.innerHeight - NAV_HEIGHT - DECK_HEIGHT * deckScale) / 2
  const viewportStyle = {
    '--deck-scale': deckScale,
    '--deck-top': `${deckTop}px`,
    '--cover-start': `${deckTop + 397.44 * deckScale}px`,
    '--slide-end': `${window.innerHeight - NAV_HEIGHT}px`,
  } as CSSProperties

  return <div className={`deck-viewport deck-slide-${currentSlide + 1}`} style={viewportStyle}>
    {currentSlide === 0 && <DarkVeil />}
    <main className="presentation">
      <section className={`slide-frame ${direction} ${currentSlide === 12 && direction === 'next' ? 'case-expansion' : ''}`} key={currentSlide} aria-live="polite">{activeSlide}</section>
      <div className="keyboard-hint"><MousePointer2 /> Use arrow keys to navigate</div>
    </main>
    <div className="progress-rail" aria-hidden="true"><span style={{ width: `${((currentSlide + 1) / SLIDE_COUNT) * 100}%` }} /></div>
    <nav className="deck-nav" aria-label="Presentation controls">
      <div className="slide-counter"><span>{String(currentSlide + 1).padStart(2, '0')}</span> / {String(SLIDE_COUNT).padStart(2, '0')}</div>
      <div className="slide-dots">{slides.map((_, index) => <button type="button" className={index === currentSlide ? 'active' : ''} onClick={() => goTo(index)} aria-label={`Go to slide ${index + 1}`} key={index} />)}</div>
      <div className="nav-actions"><button type="button" onClick={goBackward} disabled={currentSlide === 0} aria-label="Previous step"><ArrowLeft /></button><button type="button" onClick={goForward} disabled={currentSlide === SLIDE_COUNT - 1} aria-label="Next step"><ArrowRight /></button><button type="button" onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Enter fullscreen"><Expand /></button></div>
    </nav>
  </div>
}
export default App
