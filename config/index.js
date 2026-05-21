// Stripe Configuration
export const stripeConfig = {
  publishableKey: process.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
}

// API Configuration
export const apiConfig = {
  baseUrl: process.env.VITE_API_URL || 'http://localhost:5173',
  paymentEndpoint: '/api/create-payment',
}

// App Configuration
export const appConfig = {
  name: 'Telemedicine Wellness LLC',
  description: 'Affordable telemedicine services',
  supportEmail: 'bukhari78615@gmail.com',
}

export default {
  stripeConfig,
  apiConfig,
  appConfig,
}
