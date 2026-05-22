import { useEffect, useState } from 'react'

const connected = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
    label: 'Запись',
    desc: 'Авто-запись звонков',
    accent: '#7C5CFC',
    bg: '#F3EFFF',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M9 9v6M12 5v14M15 9v6M3 12h2M19 12h2" />
        <path d="M5 7c0 0 1.5 1.5 1.5 5S5 17 5 17M19 7c0 0-1.5 1.5-1.5 5s1.5 5 1.5 5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Шумоподавление',
    desc: 'Чистый звук в эфире',
    accent: '#3B82F6',
    bg: '#EFF6FF',
  },
]

const available = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    label: 'Защитник',
    desc: 'Фильтр спама и угроз',
    accent: '#0EA5E9',
    bg: '#F0FAFB',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    label: 'Ассистент',
    desc: 'AI рядом в звонке',
    accent: '#10B981',
    bg: '#ECFDF5',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    label: 'Секретарь',
    desc: 'Ответит за вас',
    accent: '#F43F5E',
    bg: '#FFF1F3',
  },
]

// Двухслойная нейросеть с импульсами данных
function AIIllustration() {
  const cx = 80, cy = 80
  const Router = 68, Rinner = 38
  const outerCount = 9
  const innerCount = 5

  const outerNodes = Array.from({ length: outerCount }, (_, i) => {
    const angle = (2 * Math.PI * i) / outerCount - Math.PI / 2
    return { x: cx + Router * Math.cos(angle), y: cy + Router * Math.sin(angle) }
  })
  const innerNodes = Array.from({ length: innerCount }, (_, i) => {
    const angle = (2 * Math.PI * i) / innerCount - Math.PI / 2 + 0.3
    return { x: cx + Rinner * Math.cos(angle), y: cy + Rinner * Math.sin(angle) }
  })

  // соединения inner → outer (каждый inner к 3 ближайшим outer)
  const crossLines: { a: typeof innerNodes[0]; b: typeof outerNodes[0]; key: string }[] = []
  innerNodes.forEach((inn, i) => {
    const baseIdx = Math.round((i / innerCount) * outerCount)
    for (let k = -1; k <= 1; k++) {
      const oi = (baseIdx + k + outerCount) % outerCount
      crossLines.push({ a: inn, b: outerNodes[oi], key: `${i}-${oi}` })
    }
  })

  // соединения внутри outer (соседи)
  const outerLines: { a: typeof outerNodes[0]; b: typeof outerNodes[0] }[] = []
  for (let i = 0; i < outerCount; i++) {
    outerLines.push({ a: outerNodes[i], b: outerNodes[(i + 1) % outerCount] })
  }

  return (
    <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto' }}>
      {/* мягкий glow на фоне */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,92,252,0.18) 0%, transparent 70%)',
        animation: 'glowPulse 4s ease-in-out infinite',
      }} />

      {/* расширяющиеся волны */}
      {[0, 1.3, 2.6].map((d, i) => (
        <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 60, height: 60, marginLeft: -30, marginTop: -30,
          borderRadius: '50%',
          border: '1.5px solid rgba(124,92,252,0.35)',
          animation: 'ripple 4s ease-out infinite',
          animationDelay: `${d}s`,
        }} />
      ))}

      {/* OUTER ring — вращается по часовой */}
      <svg viewBox="0 0 160 160" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        animation: 'rotateSlow 22s linear infinite',
        transformOrigin: '50% 50%',
      }}>
        {outerLines.map((l, i) => (
          <line key={i}
            x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y}
            stroke="rgba(124,92,252,0.4)" strokeWidth="0.7"
            style={{
              animation: `linePulse ${2 + (i % 3) * 0.4}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
        {outerNodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="6" fill="#7C5CFC" opacity="0.15"
              style={{ animation: `nodeFlash 3s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }} />
            <circle cx={n.x} cy={n.y} r="3.5" fill="#7C5CFC"
              style={{ animation: 'nodePulse 2.2s ease-in-out infinite alternate', animationDelay: `${i * 0.22}s` }} />
          </g>
        ))}
      </svg>

      {/* CROSS lines + INNER ring — вращается против часовой */}
      <svg viewBox="0 0 160 160" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        animation: 'rotateReverse 16s linear infinite',
        transformOrigin: '50% 50%',
      }}>
        {/* линии inner→outer */}
        {crossLines.map((l, i) => (
          <g key={l.key}>
            <line
              x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y}
              stroke="url(#lineGrad)" strokeWidth="0.6"
              style={{
                animation: `linePulse ${1.8 + (i % 4) * 0.3}s ease-in-out infinite alternate`,
                animationDelay: `${(i * 0.13) % 2.5}s`,
              }}
            />
            {/* бегущая частица данных по каждой 2-й линии */}
            {i % 2 === 0 && (
              <circle r="1.6" fill="#FFFFFF"
                style={{
                  filter: 'drop-shadow(0 0 3px #7C5CFC)',
                  animation: `flow-${i % 6} 2.4s linear infinite`,
                  animationDelay: `${(i * 0.4) % 2.4}s`,
                }}
              />
            )}
          </g>
        ))}
        {/* inner-узлы */}
        {innerNodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="5" fill="#5B8EF5" opacity="0.2"
              style={{ animation: `nodeFlash 2.5s ease-in-out infinite`, animationDelay: `${i * 0.3 + 0.5}s` }} />
            <circle cx={n.x} cy={n.y} r="2.5" fill="#5B8EF5"
              style={{ animation: 'nodePulse 1.8s ease-in-out infinite alternate', animationDelay: `${i * 0.18}s` }} />
          </g>
        ))}

        {/* анимация частиц — генерация ключевых кадров на основе уникальных пар */}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B8EF5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0.3" />
          </linearGradient>
          {crossLines.filter((_, i) => i % 2 === 0).map((l, i) => (
            <style key={i}>{`
              @keyframes flow-${i % 6} {
                0% { cx: ${l.a.x}; cy: ${l.a.y}; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { cx: ${l.b.x}; cy: ${l.b.y}; opacity: 0; }
              }
            `}</style>
          ))}
        </defs>
      </svg>

      {/* Центр */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 72, height: 72, borderRadius: '50%',
        background: 'linear-gradient(135deg, #7C5CFC, #5B8EF5)',
        boxShadow: '0 8px 32px rgba(124,92,252,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
        animation: 'breathe 3s ease-in-out infinite',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3.5 }}>
          {[12, 20, 28, 20, 12].map((h, i) => (
            <div key={i} style={{
              width: 4, height: h, borderRadius: 4,
              background: 'rgba(255,255,255,0.95)',
              animation: 'wavebar 1.1s ease-in-out infinite alternate',
              animationDelay: `${i * 0.13}s`,
            }} />
          ))}
        </div>
      </div>

      {[
        { label: 'Записываю...', top: 8, left: -20, color: '#7C5CFC' },
        { label: 'Готово ✓', bottom: 8, right: -12, color: '#10B981' },
      ].map((chip, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: chip.top, bottom: chip.bottom, left: chip.left, right: chip.right,
          background: 'white', borderRadius: 20, padding: '5px 11px',
          fontSize: 10, fontWeight: 600, color: chip.color,
          boxShadow: '0 4px 14px rgba(0,0,0,0.10)',
          display: 'flex', alignItems: 'center', gap: 5,
          zIndex: 10, whiteSpace: 'nowrap',
          animation: `floatChip 3.5s ease-in-out infinite`,
          animationDelay: `${i * 1.2}s`,
        }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%',
            background: chip.color, display: 'inline-block',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
          {chip.label}
        </div>
      ))}
    </div>
  )
}

function FeatureCard({ f }: { f: typeof connected[0] }) {
  return (
    <div style={{
      background: 'white', borderRadius: 18, padding: '14px',
      display: 'flex', alignItems: 'flex-start', gap: 10,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: f.bg, color: f.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {f.icon}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1533' }}>{f.label}</div>
        <div style={{ fontSize: 11, color: '#8E8AAE', marginTop: 2 }}>{f.desc}</div>
      </div>
    </div>
  )
}

function SectionLabel({ children, dot }: { children: string; dot: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, display: 'inline-block' }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: '#8E8AAE', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {children}
      </span>
    </div>
  )
}

// Animation stages: each element fades+slides in with a delay
function Animated({ delay, children }: { delay: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
    }}>
      {children}
    </div>
  )
}

export default function SplashScreen({ onStart }: { onStart?: () => void }) {
  return (
    <div style={{ minHeight: '100svh', width: '100%', display: 'flex', justifyContent: 'center', background: '#F5F4FA' }}>
      <div style={{
        width: '100%', maxWidth: 390, minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden', background: '#F5F4FA',
      }}>
        {/* Gradient header bg */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 340,
          background: 'linear-gradient(160deg, #DDD8F8 0%, #E8E4F8 40%, #F5F4FA 100%)',
          borderRadius: '0 0 40px 40px', zIndex: 0,
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          padding: '56px 20px 32px', minHeight: '100svh',
          gap: 0,
        }}>

          {/* Badge */}
          <Animated delay={100}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <span style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 14px', borderRadius: 999,
                background: 'rgba(124,92,252,0.12)', color: '#7C5CFC',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.02em',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C5CFC', animation: 'pulse 1.5s ease-in-out infinite' }} />
                Powered by AI
              </span>
            </div>
          </Animated>

          {/* Title */}
          <Animated delay={350}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <h1 style={{ fontSize: 38, fontWeight: 700, letterSpacing: -1, lineHeight: 1.15, color: '#1A1533', margin: 0 }}>
                AI Voice{' '}
                <span style={{ background: 'linear-gradient(90deg, #7C5CFC, #5B8EF5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tech
                </span>
              </h1>
              <p style={{ marginTop: 8, fontSize: 14, color: '#8E8AAE', lineHeight: 1.5 }}>
                Умный помощник для каждого звонка
              </p>
            </div>
          </Animated>

          {/* Illustration */}
          <Animated delay={600}>
            <AIIllustration />
          </Animated>

          {/* Connected section */}
          <Animated delay={850}>
            <div style={{ marginTop: 24, marginBottom: 16 }}>
              <SectionLabel dot="#10B981">Подключено</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {connected.map(f => <FeatureCard key={f.label} f={f} />)}
              </div>
            </div>
          </Animated>

          {/* Available section */}
          <Animated delay={1100}>
            <div style={{ marginBottom: 24 }}>
              <SectionLabel dot="#8E8AAE">Доступно</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {available.map(f => <FeatureCard key={f.label} f={f} />)}
                <div style={{
                  gridColumn: '1 / -1',
                  background: 'white', borderRadius: 18, padding: '12px 16px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#8E8AAE" strokeWidth="1.6" style={{ width: 16, height: 16, flexShrink: 0 }}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span style={{ fontSize: 13, color: '#8E8AAE' }}>Работает в фоне · Не требует внимания</span>
                </div>
              </div>
            </div>
          </Animated>

          {/* CTA */}
          <Animated delay={1350}>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={onStart} style={{
                width: '100%', padding: '16px', borderRadius: 18, border: 'none',
                background: 'linear-gradient(135deg, #7C5CFC, #5B8EF5)',
                color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(124,92,252,0.35)',
              }}>
                Начать
              </button>
              <button style={{
                width: '100%', padding: '14px', borderRadius: 18,
                border: '1.5px solid #E0DCF5', background: 'white',
                color: '#8E8AAE', fontSize: 14, fontWeight: 500, cursor: 'pointer',
              }}>
                Войти в аккаунт
              </button>
            </div>
          </Animated>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes wavebar {
          from { transform: scaleY(0.5); }
          to   { transform: scaleY(1); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 8px 32px rgba(124,92,252,0.4); }
          50%       { transform: translate(-50%, -50%) scale(1.06); box-shadow: 0 12px 40px rgba(124,92,252,0.55); }
        }
        @keyframes linePulse {
          from { opacity: 0.2; }
          to   { opacity: 0.7; }
        }
        @keyframes nodePulse {
          from { opacity: 0.5; r: 3; }
          to   { opacity: 1;   r: 4.5; }
        }
        @keyframes nodeFlash {
          0%, 90%, 100% { opacity: 0.15; transform: scale(1); transform-origin: center; }
          92%, 95% { opacity: 0.6; }
        }
        @keyframes rotateReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }
        @keyframes ripple {
          0% { transform: scale(0.4); opacity: 0.9; border-width: 1.5px; }
          100% { transform: scale(2.4); opacity: 0; border-width: 0.5px; }
        }
        @keyframes floatChip {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  )
}
