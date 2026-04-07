import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script';


export const metadata = {
  title: 'idenwebstudio',
  description: 'Read the latest light novels, web novels and translated fiction for free on idenwebstudio. Regular chapter updates across fantasy, isekai, action, romance and more.',
  metadataBase: new URL('https://idenwebstudio.online'),
  openGraph: {
    siteName: 'idenwebstudio',
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
        {/* Google AdSense — loaded after page is interactive */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9481193991721439"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
