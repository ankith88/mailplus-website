'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, Suspense } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    fbq?: any
    _fbq?: any
  }
}

function FacebookPixelInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstLoad = useRef(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.fbq) return

    // Avoid duplicate PageView tracking on the very first load
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      return
    }

    window.fbq('track', 'PageView')
  }, [pathname, searchParams])

  useEffect(() => {
    const handlePhoneClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      if (anchor && anchor.href && anchor.href.startsWith('tel:')) {
        if (window.fbq) {
          window.fbq('track', 'Contact', { content_name: 'click_to_call' })
        }
      }
    }

    document.addEventListener('click', handlePhoneClick)
    return () => {
      document.removeEventListener('click', handlePhoneClick)
    }
  }, [])

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '198308968171638');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=198308968171638&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  )
}

export function FacebookPixel() {
  return (
    <Suspense fallback={null}>
      <FacebookPixelInner />
    </Suspense>
  )
}
