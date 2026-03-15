import { useEffect, useRef } from 'react';

/**
 * AdBanner — Google AdSense unit
 *
 * Slots:
 *   "8630276662"  → Top banner   (auto, full-width-responsive)
 *   "4207450966"  → Mid / Novel  (fluid, in-article)
 */
export default function AdBanner({ slot, style = {} }) {
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

  // Show placeholder in development
  if (import.meta.env.DEV) {
    return (
      <div style={{
        width: '100%', minHeight: '90px', background: 'rgba(139,92,246,0.04)',
        border: '1px dashed rgba(139,92,246,0.2)', borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem', ...style
      }}>
        AdSense — slot {slot}
      </div>
    );
  }

  // Mid / in-article format (slot 4207450966)
  if (slot === '4207450966') {
    return (
      <div style={{ width: '100%', overflow: 'hidden', ...style }}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-9481193991721439"
          data-ad-slot="4207450966"
        />
      </div>
    );
  }

  // Default / top banner format (slot 8630276662)
  return (
    <div style={{ width: '100%', overflow: 'hidden', ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9481193991721439"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
