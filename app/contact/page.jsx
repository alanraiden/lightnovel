'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import '../privacy/PrivacyTerms.css';

const TOPICS = [
  { id: 'general',   label: '💬  General Question' },
  { id: 'dmca',      label: '⚖️  DMCA / Copyright' },
  { id: 'bug',       label: '🐛  Bug Report' },
  { id: 'suggest',   label: '📚  Novel Suggestion' },
  { id: 'business',  label: '🤝  Business / Partnership' },
];

export default function ContactPage() {
  const [topic, setTopic]     = useState('general');
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    const selected = TOPICS.find(t => t.id === topic);
    const subject  = encodeURIComponent(`[idenwebstudio] ${selected ? selected.label.replace(/^.+?\s{2}/, '') : 'Contact'} — ${name}`);
    const body     = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${selected?.label ?? topic}\n\n${message}`);
    window.location.href = `mailto:idenwebstudio@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body, inherit)',
    fontSize: '0.92rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  };

  return (
    <PageLayout>
      <div className="pt-page">
        <div className="container">

          {/* Header */}
          <div className="pt-header">
            <div className="pt-badge">Contact</div>
            <h1 className="pt-title">Get in Touch</h1>
            <p className="pt-subtitle">We read every message — usually respond within 48 hours</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '900px', margin: '0 auto', alignItems: 'start' }}>

            {/* Left: info cards */}
            <div className="pt-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ marginBottom: '4px' }}>Ways to reach us</h2>

              {[
                {
                  icon: '✉️',
                  title: 'Email',
                  desc: 'For DMCA takedowns, business enquiries, or anything else that needs a paper trail.',
                  link: 'mailto:idenwebstudio@gmail.com',
                  label: 'idenwebstudio@gmail.com',
                },
                {
                  icon: '💬',
                  title: 'Discord',
                  desc: 'The fastest way to get a response. Join our community server and ping us directly.',
                  link: 'https://discord.gg/MJf9mUra',
                  label: 'discord.gg/MJf9mUra',
                },
                {
                  icon: '☕',
                  title: 'Ko-fi',
                  desc: 'Want to support the site and leave a message? Drop us a note on Ko-fi.',
                  link: 'https://ko-fi.com/idenwebstudio',
                  label: 'ko-fi.com/idenwebstudio',
                },
              ].map(card => (
                <div key={card.title} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{card.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '6px', color: 'var(--text-primary)' }}>{card.title}</div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', margin: '0 0 10px' }}>{card.desc}</p>
                  <a href={card.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-purple)', textDecoration: 'none' }}>
                    {card.label} →
                  </a>
                </div>
              ))}
            </div>

            {/* Right: form */}
            <div className="pt-section">
              <h2 style={{ marginBottom: '24px' }}>Send a message</h2>

              {sent ? (
                <div style={{
                  background: 'rgba(139,92,246,0.08)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✅</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>Message opened in your mail app</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>Hit send in your mail app to deliver it. We will get back to you within 48 hours.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                  {/* Topic */}
                  <div>
                    <label style={labelStyle}>Topic</label>
                    <select value={topic} onChange={e => setTopic(e.target.value)} style={inputStyle}>
                      {TOPICS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
                    </select>
                  </div>

                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Alex"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-purple)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Your Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-purple)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent-purple)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!name.trim() || !email.trim() || !message.trim()}
                    style={{
                      padding: '12px 24px',
                      background: 'var(--accent-purple)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      opacity: (!name.trim() || !email.trim() || !message.trim()) ? 0.5 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    Open in Mail App →
                  </button>

                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                    This will open your default mail app pre-filled with your message.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
}
