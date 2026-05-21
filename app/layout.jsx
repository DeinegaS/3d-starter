import { Layout } from '@/components/dom/Layout'
import '@/global.css'

export const metadata = {
  title: 'Synkora — 3D Real Estate Web',
  description: 'Synkora Web Factory — 3D Tier starter for Real Estate.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='ru' className='antialiased'>
      <head />
      <body className='bg-synkora-bg text-synkora-ink antialiased'>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
