'use client';

import { useRouter } from 'next/navigation'

const HomePage = () => {
  const router = useRouter()

  return (
    <div style={{ padding: '2rem' }}>
      <h1>TD Paid Media Suite</h1>
      <p>AI-powered campaign management platform</p>
      <button onClick={() => router.push('/campaign-hub')}>
        Go to Campaign Hub
      </button>
    </div>
  )
}

export default HomePage
