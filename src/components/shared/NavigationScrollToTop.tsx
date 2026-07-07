'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function NavigationScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Force immediate scroll to top on page load/change, overriding any CSS scroll-behavior
    window.scrollTo({ top: 0, behavior: 'auto' })
    if (typeof document !== 'undefined') {
      document.documentElement.scrollTo({ top: 0, behavior: 'auto' })
      document.body.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname])

  useEffect(() => {
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex);
      const targetId = hash.slice(1);
      if (!targetId) return;

      const currentPath = window.location.pathname;
      const hrefPath = href.slice(0, hashIndex);

      const isCurrentPage = 
        !hrefPath || 
        hrefPath === currentPath || 
        hrefPath === '.' || 
        hrefPath === './' || 
        new URL(href, window.location.href).pathname === currentPath;

      if (isCurrentPage) {
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          if (window.location.hash !== hash) {
            window.history.pushState(null, '', hash);
          }
        }
      }
    };

    document.addEventListener('click', handleHashClick);
    return () => {
      document.removeEventListener('click', handleHashClick);
    };
  }, []);

  return null
}
