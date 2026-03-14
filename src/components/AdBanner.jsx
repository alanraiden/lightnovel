import { useEffect, useRef } from 'react';

/**
 * AdBanner — reusable Google AdSense unit
 *
 * Props:
 *   slot      — your ad slot ID from AdSense (e.g. "1234567890")
 *   format    — "auto" | "rectangle" | "horizontal" | "vertical" (default: "auto")
 *   style     — optional inline style overrides
 *
 * Before this works:
 *   1. Replace ca-pub-XXXXXXXXXXXXXXXX in index.html with your real publisher ID
 *   2. Replace the slot prop with your real ad slot ID from AdSense dashboard
 *   3. Google must approve your site first (usually 1-3 days after applying)
 */
export default function AdBanner({ slot, format = 'auto', style = {} }) {
  const adRef  = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    if (!window.adsbygoogle) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.warn('AdSense error:', e);
    }
  }, []);

  // Don't render placeholder ads in development
  if (import.meta.env.DEV) {
    return (
      <div style={{
        width: '100%', minHeight: '90px', background: 'rgba(139,92,246,0.04)',
        border: '1px dashed rgba(139,92,246,0.2)', borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem', ...style
      }}>
        AdSense — {slot || 'no slot set'} ({format})
      </div>
    );
  }

  return (
    <div style={{ width: '100%', overflow: 'hidden', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9481193991721439"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
