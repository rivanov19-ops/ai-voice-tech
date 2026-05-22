import { useState } from 'react'
import SplashScreen from './SplashScreen'
import LoginScreen from './LoginScreen'

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'login'>('splash')

  if (screen === 'login') return <LoginScreen onBack={() => setScreen('splash')} />
  return <SplashScreen onStart={() => setScreen('login')} />
}
