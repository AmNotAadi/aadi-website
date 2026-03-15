/**
 * Connect.jsx
 * ─────────────────────────────────────────────────────────────────
 * Uses the shared Navbar (extracted from Hero) and Footer components.
 * Full client-side validation — red borders + helper text on error.
 * Email format is validated with a regex before submit.
 */

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import Footer from './Footer'

/* ================================================================
   NAVBAR — same visual as Hero's nav, extracted here so Connect
   can use it without importing the whole Hero section.
   Props: onNavigate — the same router function passed everywhere.
   ================================================================ */
function Navbar({ onNavigate }) {
  return (
    <nav className="w-full flex items-center justify-between px-5 md:px-12 py-5 z-50 relative">

      {/* Left nav links */}
      <div className="hidden md:flex flex-col gap-0.5">
        {['Work', 'Services', 'Agency'].map(l => (
          <button
            key={l}
            onClick={() => onNavigate('home')}
            className="text-sm font-lemon-milk text-neutral-500 hover:text-bone transition-colors text-left cursor-target"
          >{l}</button>
        ))}
      </div>

      {/* Logo — centered */}
      <div className="font-don-graffiti text-3xl md:text-4xl font-extrabold text-cream tracking-tight mx-auto md:mx-0 cursor-target">
        <button onClick={() => onNavigate('home')}>aadi2005</button>
      </div>

      {/* CTA */}
      <button
        onClick={() => onNavigate('home')}
        className="hidden md:block font-lemon-milk text-sm text-white bg-brutal-red px-5 py-2 rounded hover:opacity-90 transition-opacity cursor-target"
      >
        Back Home
      </button>
    </nav>
  )
}

/* ================================================================
   FIELD CONFIG
   Each field definition drives both the form layout and validation.
   Add/remove fields here — the form renders automatically.
   ================================================================ */
const FIELDS = [
  {
    id: 'name',
    type: 'text',
    placeholder: 'Your Name *',
    required: true,
    validate: v => v.trim().length >= 2 ? null : 'Please enter your full name',
  },
  {
    id: 'email',
    type: 'email',
    placeholder: 'Email Address *',
    required: true,
    validate: v => {
      if (!v.trim()) return 'Email is required'
      // RFC-5322-ish regex — catches typos like missing @ or TLD
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
      return ok ? null : 'Please enter a valid email address'
    },
  },
  {
    id: 'company',
    type: 'text',
    placeholder: 'Company / Brand *',
    required: true,
    validate: v => v.trim().length >= 1 ? null : 'Please enter your company or brand name',
  },
  {
    id: 'phone',
    type: 'tel',
    placeholder: 'Phone Number *',
    required: true,
    validate: v => {
      const digits = v.replace(/\D/g, '')
      return digits.length >= 7 ? null : 'Please enter a valid phone number'
    },
  },
  {
    id: 'budget',
    type: 'text',
    placeholder: 'Estimated Budget *',
    required: true,
    validate: v => v.trim().length >= 1 ? null : 'Please enter your budget range',
  },
]

/* ================================================================
   CONNECT PAGE
   ================================================================ */
export default function Connect({ onNavigate }) {
  const headingRef = useRef(null)
  const formRef    = useRef(null)
  const infoRef    = useRef(null)

  // Form state
  const [values,   setValues]   = useState({ name: '', email: '', company: '', phone: '', budget: '', message: '' })
  const [errors,   setErrors]   = useState({})
  const [touched,  setTouched]  = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [sending,  setSending]  = useState(false)

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
    tl.fromTo(headingRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, delay: 0.2 })
      .fromTo(formRef.current,    { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6')
      .fromTo(infoRef.current,    { x: 24, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.7')
  }, [])

  /* ── Validation helpers ── */
  const validateField = (id, value) => {
    const field = FIELDS.find(f => f.id === id)
    if (!field) return null
    return field.validate(value)
  }

  const validateAll = () => {
    const newErrors = {}
    FIELDS.forEach(f => {
      const err = f.validate(values[f.id] || '')
      if (err) newErrors[f.id] = err
    })
    return newErrors
  }

  /* ── Field change — validate on change if already touched ── */
  const handleChange = (id, value) => {
    setValues(prev => ({ ...prev, [id]: value }))
    if (touched[id]) {
      const err = validateField(id, value)
      setErrors(prev => ({ ...prev, [id]: err }))
    }
  }

  /* ── On blur — mark as touched and validate immediately ── */
  const handleBlur = (id) => {
    setTouched(prev => ({ ...prev, [id]: true }))
    const err = validateField(id, values[id] || '')
    setErrors(prev => ({ ...prev, [id]: err }))
  }

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault()

    // Touch all fields so errors show
    const allTouched = {}
    FIELDS.forEach(f => { allTouched[f.id] = true })
    setTouched(allTouched)

    const newErrors = validateAll()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      // Shake the first errored field for feedback
      const firstErrId = FIELDS.find(f => newErrors[f.id])?.id
      const el = document.getElementById(`field-${firstErrId}`)
      if (el) gsap.fromTo(el, { x: -8 }, { x: 0, duration: 0.4, ease: 'elastic.out(1,0.3)' })
      return
    }

    // All valid — simulate send
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 1200)
  }

  /* ── Field styles — red when errored ── */
  const fieldClass = (id) => {
    const hasError = touched[id] && errors[id]
    return [
      'w-full rounded-lg p-5 font-tt-fors text-bone placeholder-bone/30',
      'focus:outline-none transition-all duration-200',
      'bg-dark/20',
      hasError
        ? 'border border-brutal-red/70 bg-brutal-red/5 focus:border-brutal-red focus:bg-brutal-red/8'
        : 'border border-bone/10 focus:border-brutal-red/50 focus:bg-dark/40',
    ].join(' ')
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-ink text-bone flex flex-col">
        <Navbar onNavigate={onNavigate} />
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
          <div className="w-16 h-16 rounded-full bg-brutal-red/10 border border-brutal-red/30 flex items-center justify-center mb-2">
            <span style={{ fontSize: '2rem' }}>✓</span>
          </div>
          <h2 className="font-magazine text-bone" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            Message sent!
          </h2>
          <p className="font-tt-fors text-bone/50 max-w-sm" style={{ fontSize: '0.95rem' }}>
            Thanks for reaching out. I'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="font-lemon-milk text-sm text-white bg-brutal-red px-8 py-3 rounded hover:opacity-90 transition-opacity cursor-target mt-4 uppercase tracking-widest"
          >
            Back Home
          </button>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ink text-bone flex flex-col">

      {/* ── Shared Navbar ── */}
      <Navbar onNavigate={onNavigate} />

      {/* ── Main content ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-16 md:py-24">

        {/* Heading */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <p className="font-mono text-[10px] tracking-widest uppercase text-bone/35 mb-4">
            ◆&nbsp;&nbsp;LET'S WORK TOGETHER
          </p>
          <h1 className="font-magazine text-cream leading-tight" style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)' }}>
            New project?<br />
            We&apos;re easy<br />
            to reach.
          </h1>
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 mt-6 bg-brutal-red/10 border border-brutal-red/20 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-brutal-red animate-pulse" />
            <span className="font-lemon-milk text-[9px] text-brutal-red uppercase tracking-wider">
              Available for New Projects
            </span>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[1fr,320px] gap-12 lg:gap-20 items-start">

          {/* ── FORM ── */}
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {FIELDS.map(field => (
              <div key={field.id} id={`field-${field.id}`}>
                <input
                  id={field.id}
                  type={field.type}
                  value={values[field.id]}
                  placeholder={field.placeholder}
                  className={fieldClass(field.id)}
                  onChange={e => handleChange(field.id, e.target.value)}
                  onBlur={() => handleBlur(field.id)}
                  autoComplete={field.id === 'email' ? 'email' : 'off'}
                />
                {/* Error message — slides in under the field */}
                <div style={{
                  maxHeight: touched[field.id] && errors[field.id] ? 28 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.22s ease',
                }}>
                  <p className="font-mono text-brutal-red pt-1.5" style={{ fontSize: '0.65rem', letterSpacing: '0.04em' }}>
                    ✕ {errors[field.id]}
                  </p>
                </div>
              </div>
            ))}

            {/* Message textarea — no required validation */}
            <textarea
              id="message"
              rows={6}
              value={values.message}
              placeholder="Tell me about your project — the more detail the better :)"
              className="w-full rounded-lg p-5 font-tt-fors text-bone placeholder-bone/30 bg-dark/20 border border-bone/10 focus:outline-none focus:border-brutal-red/50 focus:bg-dark/40 transition-all duration-200 resize-none"
              onChange={e => handleChange('message', e.target.value)}
            />

            <button
              type="submit"
              disabled={sending}
              className="bg-brutal-red text-white font-lemon-milk px-10 py-5 rounded-lg text-[13px] uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all flex items-center gap-3 w-full md:w-auto justify-center cursor-target disabled:opacity-60"
            >
              {sending ? (
                <>Sending…<span className="animate-spin inline-block">◌</span></>
              ) : (
                <>Let&apos;s Connect! <ArrowRight size={17} /></>
              )}
            </button>

          </form>

          {/* ── SIDEBAR INFO ── */}
          <div ref={infoRef} className="flex flex-col gap-10 lg:pl-10 lg:border-l border-bone/8">

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <p className="font-mono text-[9px] tracking-widest uppercase text-bone/35 mb-1">Phone</p>
              <a href="tel:+18568166159" className="font-mono text-sm text-bone hover:text-brutal-red transition-colors cursor-target">
                +1 856 816 6159
              </a>
              <a href="tel:+16109521398" className="font-mono text-sm text-bone hover:text-brutal-red transition-colors cursor-target">
                +1 610 952 1398
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <p className="font-mono text-[9px] tracking-widest uppercase text-bone/35 mb-1">Email</p>
              <a href="mailto:hello@aadi2005.com" className="font-mono text-sm text-bone hover:text-brutal-red transition-colors cursor-target">
                hello@aadi2005.com
              </a>
            </div>

            {/* Socials */}
            <div className="flex flex-col gap-3">
              <p className="font-mono text-[9px] tracking-widest uppercase text-bone/35 mb-1">Socials</p>
              {[
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'X / Twitter', href: 'https://x.com' },
                { label: 'YouTube', href: 'https://youtube.com' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-bone hover:text-brutal-red transition-colors w-fit cursor-target"
                >
                  {s.label} →
                </a>
              ))}
            </div>

            {/* Response time note */}
            <div className="pt-6 border-t border-bone/8">
              <p className="font-mono text-[9px] tracking-widest uppercase text-bone/30 leading-relaxed">
                Typical response time:<br />
                <span className="text-bone/50">Within 24 hours</span>
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* ── Grain overlay ── */}
      <div
        className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")' }}
      />

      {/* ── Shared Footer ── */}
      <Footer onNavigate={onNavigate} />

    </div>
  )
}