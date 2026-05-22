import { useState } from 'react'

interface Props {
  onBack: () => void
}

export default function LoginScreen({ onBack }: Props) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  return (
    <div style={{ minHeight: '100svh', width: '100%', display: 'flex', justifyContent: 'center', background: '#F5F4FA' }}>
      <div style={{
        width: '100%', maxWidth: 390, minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden', background: '#F5F4FA',
      }}>

        {/* Gradient header */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 220,
          background: 'linear-gradient(160deg, #DDD8F8 0%, #E8E4F8 40%, #F5F4FA 100%)',
          borderRadius: '0 0 40px 40px', zIndex: 0,
        }} />

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column',
          padding: '56px 24px 40px',
          minHeight: '100svh',
        }}>

          {/* Back button */}
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#7C5CFC', fontSize: 14, fontWeight: 600, padding: 0,
            marginBottom: 32, width: 'fit-content',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: 18, height: 18 }}>
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Назад
          </button>

          {/* Title */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5, color: '#1A1533', margin: 0 }}>
              Добро пожаловать
            </h1>
            <p style={{ marginTop: 8, fontSize: 14, color: '#8E8AAE' }}>
              Войдите, чтобы продолжить
            </p>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Phone / Email */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8E8AAE', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Телефон или email
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: '#B0ACCC',
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+7 999 000 00 00"
                  style={{
                    width: '100%', padding: '15px 14px 15px 44px',
                    borderRadius: 16, border: '1.5px solid #E0DCF5',
                    background: 'white', fontSize: 15, color: '#1A1533',
                    outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#8E8AAE', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Пароль
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: '#B0ACCC',
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '15px 44px 15px 44px',
                    borderRadius: 16, border: '1.5px solid #E0DCF5',
                    background: 'white', fontSize: 15, color: '#1A1533',
                    outline: 'none', boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  onClick={() => setShowPass(v => !v)}
                  style={{
                    position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#B0ACCC', padding: 0,
                  }}
                >
                  {showPass ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div style={{ textAlign: 'right', marginTop: -4 }}>
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#7C5CFC', fontSize: 13, fontWeight: 600, padding: 0,
              }}>
                Забыли пароль?
              </button>
            </div>

          </div>

          {/* CTA */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button style={{
              width: '100%', padding: '16px', borderRadius: 18, border: 'none',
              background: 'linear-gradient(135deg, #7C5CFC, #5B8EF5)',
              color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(124,92,252,0.35)',
              fontFamily: 'inherit',
            }}>
              Войти
            </button>
            <p style={{ textAlign: 'center', fontSize: 13, color: '#8E8AAE', margin: 0 }}>
              Нет аккаунта?{' '}
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#7C5CFC', fontSize: 13, fontWeight: 600, padding: 0,
                fontFamily: 'inherit',
              }}>
                Зарегистрироваться
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
