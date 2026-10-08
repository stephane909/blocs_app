import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Login } from '../modules/login/Login'
import { SignIn } from '../modules/signIn/SignIn'

export const Route = createFileRoute('/')({
  component: Homepage,
})

type Tab = 'login' | 'signIn'

const tabs: { id: Tab; label: string }[] = [
  { id: 'login', label: 'Login' },
  { id: 'signIn', label: 'Sign in' },
]

export function Homepage() {
  const [activeTab, setActiveTab] = useState<Tab>('login')

  return (
    <div>
      <div role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === 'login' && <Login />}
        {activeTab === 'signIn' && <SignIn />}
      </div>
    </div>
  )
}
