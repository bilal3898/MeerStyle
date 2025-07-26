// lib/providers/AnalyticsProvider.jsx
import { useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

export const AnalyticsProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
          page_path: url,
        });
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `,
        }}
      />
      {children}
    </>
  );
};
