import ThemeSwitcher from './components/ThemeSwitcher'

import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <meta
        name="description"
        content="Rastgele ayet getiren next.js projesi."
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0,maximum-scale=1.0"
      />
      <meta name="theme-color" content="#121212" />
      <link rel="manifest" href="/manifest.json" />
      <body>
        {children}
        <ThemeSwitcher />
      </body>
    </html>
  )
}
