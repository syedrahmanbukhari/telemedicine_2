import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import './index.css'
import App from './App.jsx'

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!publishableKey) {
  console.error('❌ Stripe publishable key is missing! Add VITE_STRIPE_PUBLISHABLE_KEY to your environment variables.')
}

const stripePromise = publishableKey ? loadStripe(publishableKey) : null

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {stripePromise ? (
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    ) : (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h2>⚠️ Configuration Error</h2>
        <p>Stripe publishable key is not configured. Please check your environment variables.</p>
      </div>
    )}
  </StrictMode>,
)
