import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import Hero3D from './components/Hero3D'
import { STATS, SEGMENTS, PHASES, REVENUE, FLYWHEEL, GTM, ROADMAP, COMPETE, MOAT } from './data'
import './App.css'

const ease = [0.22, 1, 0.36, 1]
const BASE = import.meta.env.BASE_URL

/* full-bleed AI-render frame with graceful placeholder */
function Frame({ src, alt, label }) {
  const [failed, setFailed] = useState(false)
  if (failed || !src) {
    return (
      <div className="frame-ph">
        <span className="frame-ph-flow" />
        <small>{label || 'AI render to follow'}</small>
      </div>
    )
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} />
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 56, filter: 'blur(7px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 1.0, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/* pinned, scroll-scrubbed frame sequence (Apple-style) — manual RAF, Lenis-proof */
function ScrollSequence({ count = 96, eyebrow, title }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const overlayRef = useRef(null)
  const imgs = useRef([])

  useEffect(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const im = new Image()
      im.src = `${BASE}assets/seq/f_${String(i).padStart(3, '0')}.jpg`
      arr.push(im)
    }
    imgs.current = arr
  }, [count])

  useEffect(() => {
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    let cur = -1, raf

    const draw = (idx) => {
      const img = imgs.current[idx] || imgs.current.find((m) => m && m.complete)
      if (!img || !img.complete || !img.naturalWidth) return
      const cw = cv.width, ch = cv.height
      const ir = img.naturalWidth / img.naturalHeight
      let dw, dh, dx, dy
      if (cw / ch > ir) { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2 }
      else { dh = ch; dw = ch * ir; dy = 0; dx = (cw - dw) / 2 }
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, dx, dy, dw, dh)
    }
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.floor(window.innerWidth * dpr)
      cv.height = Math.floor(window.innerHeight * dpr)
      cur = -1
    }
    const render = () => {
      const r = wrapRef.current.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
      const idx = Math.min(count - 1, Math.max(0, Math.round(p * (count - 1))))
      if (idx !== cur) { cur = idx; draw(idx) }
      const o = p < 0.12 ? p / 0.12 : (p > 0.82 ? Math.max(0, (1 - p) / 0.18) : 1)
      if (overlayRef.current) overlayRef.current.style.opacity = o
      raf = requestAnimationFrame(render)
    }
    resize()
    window.addEventListener('resize', resize)
    imgs.current.forEach((im) => { im.onload = () => { if (cur === 0) draw(0) } })
    raf = requestAnimationFrame(render)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [count])

  return (
    <section className="seq" ref={wrapRef}>
      <div className="seq-sticky">
        <canvas ref={canvasRef} className="seq-canvas" />
        <div className="seq-vign" />
        <div className="seq-overlay" ref={overlayRef}>
          <p className="eyebrow light">{eyebrow}</p>
          <h2 className="big">{title}</h2>
        </div>
      </div>
    </section>
  )
}

/* full-bleed frame with scroll parallax on the image */
function ParallaxFrame({ children, src, alt, label, reverse }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1])
  return (
    <section className={`frame-band ${reverse ? 'reverse' : ''}`} ref={ref}>
      <motion.div className="frame-media" style={{ y, scale }}>
        <Frame src={src} alt={alt} label={label} />
      </motion.div>
      <div className="frame-overlay">{children}</div>
    </section>
  )
}

/* animated circular flywheel */
function FlywheelCircle({ items }) {
  const where = ['flyc-top', 'flyc-right', 'flyc-bottom', 'flyc-left']
  return (
    <motion.div
      className="flyc"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease }}
    >
      <div className="flyc-ring" />
      <div className="flyc-ring flyc-ring2" />
      <div className="flyc-core"><span className="flyc-core-lbl">The</span><span className="flyc-core-mark">loop</span></div>
      {items.map((it, i) => (
        <div className={`flyc-node ${where[i]}`} key={it.k}>
          <div className="flyc-no flow-text">{String(i + 1).padStart(2, '0')}</div>
          <div className="flyc-k">{it.k}</div>
          <div className="flyc-v">{it.v}</div>
        </div>
      ))}
    </motion.div>
  )
}

/* kinetic marquee band — leans with scroll velocity */
function Marquee({ items }) {
  const row = [...items, ...items]
  const { scrollY } = useScroll()
  const vel = useVelocity(scrollY)
  const skew = useSpring(useTransform(vel, [-2500, 0, 2500], [7, 0, -7], { clamp: true }), { damping: 50, stiffness: 400 })
  return (
    <div className="marquee">
      <motion.div className="marquee-skew" style={{ skewX: skew }}>
        <motion.div
          className="marquee-row"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
        >
          {row.map((w, i) => (
            <span className="marquee-item" key={i}>{w}<span className="marquee-dot">✦</span></span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function App() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const { scrollYProgress: pageProgress } = useScroll()

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  // soft glowing cursor follower (desktop only)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const dot = document.createElement('div')
    dot.className = 'cursor-glow'
    document.body.appendChild(dot)
    let rx = innerWidth / 2, ry = innerHeight / 2, x = rx, y = ry, raf
    const move = (e) => { rx = e.clientX; ry = e.clientY }
    const sel = 'a,button,.seg,.phase,.road-col,.moat-card,.close-cta,.rev-row'
    const over = (e) => { if (e.target.closest(sel)) dot.classList.add('big') }
    const out = (e) => { if (e.target.closest(sel)) dot.classList.remove('big') }
    const loop = () => { x += (rx - x) * 0.2; y += (ry - y) * 0.2; dot.style.transform = `translate(${x}px,${y}px)`; raf = requestAnimationFrame(loop) }
    loop()
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); document.removeEventListener('mouseout', out); dot.remove() }
  }, [])

  return (
    <div className="page">
      <motion.div className="progress" style={{ scaleX: pageProgress }} />
      <div className="grain" aria-hidden />

      {/* NAV */}
      <nav className="nav">
        <a href="#top" className="nav-logo">FANGRAM</a>
        <div className="nav-links">
          <a href="#wedge">Opportunity</a>
          <a href="#who">Audience</a>
          <a href="#launch">Launch</a>
          <a href="#model">Model</a>
          <a href="#close">Vision</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="top" ref={heroRef}>
        <div className="hero-canvas"><Hero3D /></div>
        <motion.div className="hero-inner" style={{ y: heroTextY, opacity: heroFade }}>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
          >
            FanGram
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.5 }}
          >
            Turning influence into a business.
          </motion.p>
          <motion.p
            className="hero-line"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
          >
            The platform that helps India’s talent build the business around their craft.
          </motion.p>
        </motion.div>
        <div className="scroll-cue">SCROLL TO EXPLORE</div>
      </header>

      {/* THE SHIFT — scroll-scrubbed cinematic chapter */}
      <ScrollSequence
        count={64}
        eyebrow="The shift"
        title={<>Influence is everywhere.<br /><span className="muted">Monetisation isn’t.</span></>}
      />

      {/* THE SHIFT — supporting line */}
      <section className="band tight">
        <Reveal>
          <p className="lead big-lead">
            A generation has built real audiences and real culture. Almost none of them have built
            a business on top of it. <span className="white">That gap is the entire opportunity.</span>
          </p>
        </Reveal>
      </section>

      {/* THE INDIA WEDGE */}
      <section className="band" id="wedge">
        <Reveal><p className="eyebrow">The opportunity · India first</p></Reveal>
        <Reveal delay={0.05}>
          <h2 className="big">
            The biggest under-monetised<br />talent market on earth.
          </h2>
        </Reveal>
        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08} className="stat">
              <div className="stat-n flow-text">{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="lead wide">
            India has millions of creators, athletes, musicians and public figures with deeply engaged
            fans, and almost no infrastructure to turn that into income. Cameo, Patreon and the rest
            barely operate here. The shelf is empty. We take it before a funded copycat does.
          </p>
        </Reveal>
      </section>

      {/* WHAT FANGRAM IS */}
      <ParallaxFrame src={`${BASE}assets/render-connect.jpg`} alt="" label="Render: talent · fans · brands">
        <Reveal>
          <p className="eyebrow light">What FanGram is</p>
          <h2 className="big">
            The business engine<br />that sits around talent.
          </h2>
          <p className="lead">
            One platform connecting <b>talent, fans, and brands</b> through commerce, content,
            experiences, and partnerships. Talent keeps control of their services, their pricing,
            and their brand. We build and run the business so they can focus on the craft.
          </p>
        </Reveal>
      </ParallaxFrame>

      <Marquee items={['Athletes', 'Creators', 'Musicians', 'Entertainers', 'Public Figures', 'Fans', 'Brands']} />

      {/* WHO IT'S FOR — three-sided segmentation */}
      <section className="band" id="who">
        <Reveal><p className="eyebrow">Who it’s for · a three-sided market</p></Reveal>
        <Reveal delay={0.05}><h2 className="big">One platform, three sides,<br />one exchange of value.</h2></Reveal>
        <div className="segs">
          {SEGMENTS.map((s, i) => (
            <motion.div
              key={s.tag} className="seg" style={{ '--accent': s.accent }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease, delay: i * 0.12 }}
            >
              <div className="seg-tag"><span className="seg-dot" />{s.tag}</div>
              <h3 className="seg-lead">{s.lead}</h3>
              <p className="seg-body">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE PHASED LAUNCH */}
      <section className="band" id="launch">
        <Reveal><p className="eyebrow">The launch · built in phases</p></Reveal>
        <Reveal delay={0.05}><h2 className="big">Earn the right to the next layer.</h2></Reveal>
        <div className="phases">
          {PHASES.map((p, i) => (
            <motion.div
              key={p.no}
              className="phase"
              style={{ '--accent': p.accent }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease, delay: i * 0.12 }}
            >
              <div className="phase-top">
                <span className="phase-no">{p.no}</span>
                <span className="phase-dot" />
              </div>
              <h3 className="phase-name">{p.name}</h3>
              <p className="phase-tag">{p.tag}</p>
              <p className="phase-body">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT MAKES MONEY — revenue streams */}
      <section className="band" id="model">
        <Reveal><p className="eyebrow">The business model</p></Reveal>
        <Reveal delay={0.05}><h2 className="big">Five rails of revenue,<br />not one fragile one.</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="lead wide">
            Cameo lived and died on a single rail. FanGram earns across the whole relationship, so no
            one channel can sink it, and talent has every reason to stay.
          </p>
        </Reveal>
        <div className="rev">
          {REVENUE.map((r, i) => (
            <Reveal key={r.k} delay={i * 0.06} className="rev-row">
              <div className="rev-no flow-text">{String(i + 1).padStart(2, '0')}</div>
              <div className="rev-k">{r.k}</div>
              <div className="rev-v">{r.v}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* THE MODEL */}
      <ParallaxFrame src={`${BASE}assets/render-model.jpg`} alt="" label="Render: the 70/30 split" reverse>
        <Reveal>
          <p className="eyebrow light">The model</p>
          <h2 className="big"><span className="flow-text">70</span> to talent.<br /><span className="flow-text">30</span> to the engine.</h2>
          <p className="lead">
            Talent keeps the majority, always. Our 30% buys them something they can’t build alone:
            technology, fulfilment, brand deals, and a team running the operation. The take rate is
            only defensible if it earns its keep, so every point of it ships real value.
          </p>
        </Reveal>
      </ParallaxFrame>

      {/* WHERE WE SIT — competitive positioning */}
      <section className="band" id="field">
        <Reveal><p className="eyebrow">Where we sit · the field</p></Reveal>
        <Reveal delay={0.05}><h2 className="big">Built on what the<br />others left on the table.</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="cmp">
            <div className="cmp-head">
              <span>Platform</span><span>Model</span><span>Take</span><span>Repeat revenue</span><span>Revenue rails</span>
            </div>
            {COMPETE.map((c) => (
              <div className={`cmp-row ${c.us ? 'us' : ''}`} key={c.name}>
                <span className="cmp-name">{c.name}</span>
                <span>{c.model}</span>
                <span>{c.take}</span>
                <span>{c.repeat}</span>
                <span>{c.rails}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="lead wide" style={{ marginTop: '34px' }}>
            A higher take is only fair because we do more. And unlike Cameo, the whole model is built on
            <b> repeat purchase and many rails</b>, the two things a one-off novelty never had.
          </p>
        </Reveal>
      </section>

      {/* THE COLLABORATION FLYWHEEL */}
      <section className="band" id="flywheel">
        <Reveal><p className="eyebrow">Why it compounds · the flywheel</p></Reveal>
        <Reveal delay={0.05}><h2 className="big">Each side makes<br />the next one stronger.</h2></Reveal>
        <FlywheelCircle items={FLYWHEEL} />
        <Reveal delay={0.1}>
          <p className="lead wide fly-note">
            Spin it once and it doesn’t stop: more talent brings more fans, fan spend pulls brand
            budgets, budgets and tools keep talent. The loop is the moat.
          </p>
        </Reveal>
      </section>

      {/* GTM → SCALE */}
      <section className="band" id="scale">
        <Reveal><p className="eyebrow">From launch to scale</p></Reveal>
        <Reveal delay={0.05}><h2 className="big">How I’d actually build it.</h2></Reveal>
        <div className="gtm">
          {GTM.map((g, i) => (
            <Reveal key={g.k} delay={i * 0.08} className="gtm-row">
              <div className="gtm-no flow-text">{String(i + 1).padStart(2, '0')}</div>
              <div className="gtm-k">{g.k}</div>
              <div className="gtm-v">{g.v}</div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="cameo-note">
            <span className="cameo-dot" />
            <p>
              <b>The lesson I’m building against:</b> Cameo hit a billion-dollar valuation and collapsed
              because one-off shoutouts were a novelty, not a business. FanGram is built for repeat purchase
              and recurring relationships from day one. Merch first, relationships next, never a gimmick.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 90-DAY ROADMAP */}
      <section className="band" id="roadmap">
        <Reveal><p className="eyebrow">Execution · the first 90 days</p></Reveal>
        <Reveal delay={0.05}><h2 className="big">If I had the keys,<br />here’s month one to three.</h2></Reveal>
        <div className="road">
          {ROADMAP.map((r, i) => (
            <motion.div
              key={r.d} className="road-col"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease, delay: i * 0.12 }}
            >
              <div className="road-d flow-text">{r.d}</div>
              <h3 className="road-h">{r.h}</h3>
              <ul className="road-list">
                {r.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <div className="road-exit"><span>Exit</span>{r.exit}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE MOAT */}
      <section className="band">
        <Reveal><p className="eyebrow">Why it compounds</p></Reveal>
        <Reveal delay={0.05}><h2 className="big">The moat isn’t a feature.<br />It’s the whole stack.</h2></Reveal>
        <div className="moat">
          {MOAT.map((m, i) => (
            <Reveal key={m.k} delay={i * 0.1} className="moat-card">
              <div className="moat-k">{m.k}</div>
              <div className="moat-v">{m.v}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CLOSE */}
      <section className="band close" id="close">
        <Reveal>
          <p className="eyebrow">The vision</p>
          <h2 className="big">
            Build the layer where influence<br />becomes a <span className="flow-text">business</span>.
          </h2>
          <p className="lead">
            Start with India’s talent, prove the engine on the people the world ignored, then take it
            everywhere talent is rich and monetisation is thin. That’s the company I want to help build.
          </p>
          <a href="#top" className="close-cta">Take it from the top ↑</a>
          <p className="close-note">
            A first look, not a fixed plan. This is how I see it today, every line here is open to
            pivot as we get more context. The thinking is mine; the direction is ours to shape.
          </p>
          <div className="close-by">
            <span>A point of view by</span>
            <strong>Shaurya Pratap Singh</strong>
            <span>for the FanGram EIR role</span>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <span>FanGram</span>
        <span>Turning influence into a business</span>
      </footer>
    </div>
  )
}
