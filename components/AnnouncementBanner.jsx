'use client';

import { useState, useEffect } from 'react';
import { getAnnouncement } from '@/services/api';
import './AnnouncementBanner.css';

const SESSION_KEY = 'ns_announcement_seen';

export default function AnnouncementBanner() {
  const [data,    setData]    = useState(null); // { message, type, id }
  const [visible, setVisible] = useState(false);
  const [hiding,  setHiding]  = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const ann = await getAnnouncement();
        if (!ann || !ann.active || !ann.message) return;

        // Only show once per session — use the announcement id so a new
        // announcement always shows even in the same session
        const seen = sessionStorage.getItem(SESSION_KEY);
        if (seen === String(ann._id || ann.message)) return;

        setData(ann);
        // Small delay so it slides in after page load
        setTimeout(() => setVisible(true), 800);
      } catch {
        // Silently fail — don't break the page if API is down
      }
    }
    load();
  }, []);

  function dismiss() {
    setHiding(true);
    if (data) sessionStorage.setItem(SESSION_KEY, String(data._id || data.message));
    setTimeout(() => { setVisible(false); setHiding(false); setData(null); }, 350);
  }

  if (!visible || !data) return null;

  const typeStyles = {
    info:        { accent: '#3b82f6', bg: 'rgba(59,130,246,0.1)',    icon: 'ℹ️' },
    warning:     { accent: '#f59e0b', bg: 'rgba(245,158,11,0.1)',    icon: '⚠️' },
    maintenance: { accent: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',    icon: '🔧' },
    success:     { accent: '#22c55e', bg: 'rgba(34,197,94,0.1)',     icon: '✅' },
    announcement:{ accent: '#ff6b2b', bg: 'rgba(255,107,43,0.1)',    icon: '📣' },
  };

  const style = typeStyles[data.type] || typeStyles.info;

  return (
    <div
      className={`ann-banner ${hiding ? 'ann-hiding' : 'ann-visible'}`}
      style={{ '--ann-accent': style.accent, '--ann-bg': style.bg }}
    >
      <div className="ann-inner">
        <span className="ann-icon">{style.icon}</span>
        <p className="ann-message">{data.message}</p>
        {data.link && (
          <a href={data.link} target="_blank" rel="noopener noreferrer" className="ann-link">
            Learn more →
          </a>
        )}
        <button className="ann-close" onClick={dismiss} aria-label="Dismiss">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
