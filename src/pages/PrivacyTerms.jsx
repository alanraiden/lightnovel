import { useState } from 'react';
import { Link } from 'react-router-dom';
import './PrivacyTerms.css';

const SECTIONS = [
  { id: 'terms',    label: 'Terms of Service' },
  { id: 'privacy',  label: 'Privacy Policy' },
  { id: 'external', label: 'External Links' },
  { id: 'dmca',     label: 'DMCA Compliance' },
  { id: 'cookies',  label: 'Cookies & Ads' },
];

export default function PrivacyTerms() {
  const [active, setActive] = useState('terms');

  return (
    <div className="pt-page">
      <div className="container">

        {/* Header */}
        <div className="pt-header">
          <div className="pt-badge">Legal</div>
          <h1 className="pt-title">Privacy &amp; Terms of Use</h1>
          <p className="pt-subtitle">Last updated: January 2025</p>
        </div>

        <div className="pt-layout">

          {/* Sidebar nav */}
          <aside className="pt-sidebar">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className={'pt-nav-btn' + (active === s.id ? ' active' : '')}
                onClick={() => setActive(s.id)}
              >
                {s.label}
              </button>
            ))}
            <div className="pt-contact-box">
              <div className="pt-contact-label">Contact Us</div>
              <a href="mailto:idenwebstudio@gmail.com" className="pt-contact-email">
                idenwebstudio@gmail.com
              </a>
            </div>
          </aside>

          {/* Content */}
          <main className="pt-content">

            {active === 'terms' && (
              <div className="pt-section">
                <h2>Terms of Service</h2>
                <p>
                  Welcome to idenwebstudio. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before using the site.
                </p>
                <h3>Content</h3>
                <p>
                  All content available on idenwebstudio ("Content") is collected from publicly available sources on the internet and is provided free of charge to all members and visitors for personal, non-commercial reading purposes.
                </p>
                <p>
                  If you wish to share or reproduce any Content from this site, you must provide a visible source link crediting idenwebstudio. If you intend to use the Content for any commercial or business purpose, you are solely responsible for researching and obtaining the appropriate original copyright permissions.
                </p>
                <p>
                  Any copyright violation in any form is the full legal responsibility of the party committing the violation. idenwebstudio assumes no liability for misuse of Content by third parties.
                </p>
                <h3>User Conduct</h3>
                <p>
                  Users agree not to post comments or content that is abusive, defamatory, obscene, hateful, or otherwise objectionable. idenwebstudio reserves the right to remove any content and suspend or terminate accounts that violate these terms without prior notice.
                </p>
                <h3>Disclaimer</h3>
                <p>
                  idenwebstudio makes no warranties, expressed or implied, regarding the accuracy, completeness, or reliability of any Content on this site. Your use of the site is at your own risk.
                </p>
              </div>
            )}

            {active === 'privacy' && (
              <div className="pt-section">
                <h2>Privacy Policy</h2>
                <p>
                  Your privacy is important to us. This policy explains what information idenwebstudio collects, how it is used, and the choices you have.
                </p>
                <h3>Information We Collect</h3>
                <p>
                  Like most website operators, idenwebstudio collects non-personally-identifying information that web browsers and servers typically make available, such as the browser type, language preference, referring site, pages visited, and the date and time of each request. This information helps us understand how visitors use the site and improve the experience.
                </p>
                <p>
                  When you create an account, we collect your name, email address, and profile picture provided via Google Sign-In or email registration. This information is used solely to identify you on the platform, provide account features such as bookmarks and reading history, and communicate with you about your account.
                </p>
                <h3>How We Use Your Information</h3>
                <p>
                  We use collected information to operate and improve the website, personalize your experience, respond to support requests, and from time to time publish aggregated, non-personally-identifying usage statistics.
                </p>
                <h3>Data Security</h3>
                <p>
                  We take reasonable measures to protect your personal information from unauthorized access. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.
                </p>
                <h3>Third Parties</h3>
                <p>
                  We do not sell, trade, or transfer your personal information to outside parties. We may share aggregate, non-personally-identifying data with trusted partners for analytical purposes.
                </p>
              </div>
            )}

            {active === 'external' && (
              <div className="pt-section">
                <h2>External Links</h2>
                <p>
                  idenwebstudio may contain links to external websites for informational or reference purposes. While we strive to include only quality, safe, and relevant external links, users should always exercise caution before clicking any external links.
                </p>
                <p>
                  The owners of idenwebstudio cannot guarantee or verify the contents of any externally linked website despite their best efforts. External sites are governed by their own privacy policies and terms of service, which we encourage you to review.
                </p>
                <p>
                  By clicking external links, you do so at your own risk. idenwebstudio and its owners cannot be held liable for any damages, losses, or implications caused by visiting any external links referenced on this site.
                </p>
              </div>
            )}

            {active === 'dmca' && (
              <div className="pt-section">
                <h2>DMCA Compliance</h2>
                <p>
                  idenwebstudio respects the intellectual property rights of others and expects its users to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and will respond promptly to valid takedown notices.
                </p>
                <h3>Reporting Infringing Content</h3>
                <p>
                  If you are the copyright owner of content that you believe is being used on idenwebstudio without your authorization, you may submit a DMCA takedown request by contacting us at the email address below. Please include the following in your request:
                </p>
                <ul>
                  <li>Your full name and contact information</li>
                  <li>A description of the copyrighted work you claim has been infringed</li>
                  <li>The specific URL(s) on idenwebstudio where the infringing content appears</li>
                  <li>A statement that you have a good faith belief that the use is unauthorized</li>
                  <li>A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on their behalf</li>
                  <li>Your electronic or physical signature</li>
                </ul>
                <p>
                  Upon receipt of a valid DMCA notice, we will act expeditiously to remove or disable access to the infringing content.
                </p>
                <h3>Counter Notices</h3>
                <p>
                  If you believe your content was removed in error, you may submit a counter notice. For more information about the DMCA process, you may consult the U.S. Copyright Office at copyright.gov.
                </p>
                <div className="pt-contact-inline">
                  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href="mailto:idenwebstudio@gmail.com">idenwebstudio@gmail.com</a>
                </div>
              </div>
            )}

            {active === 'cookies' && (
              <div className="pt-section">
                <h2>Cookies &amp; Third-Party Advertisements</h2>
                <h3>Cookies</h3>
                <p>
                  idenwebstudio uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences such as reading mode, font size, and login status.
                </p>
                <p>
                  By using this site, you consent to the use of cookies in accordance with this policy. You can choose to disable cookies in your browser settings, though this may affect certain features of the site.
                </p>
                <h3>Google AdSense</h3>
                <p>
                  idenwebstudio uses Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to this and other websites. You may opt out of personalized advertising by visiting{' '}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
                </p>
                <p>
                  Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the internet.
                </p>
                <h3>Google Analytics</h3>
                <p>
                  We may use Google Analytics to analyze traffic and usage patterns on idenwebstudio. Google Analytics collects data such as how often users visit the site, what pages they visit, and what other sites they visited prior to arriving. We use this data solely to improve the site experience. Google's ability to use and share information collected by Google Analytics is restricted by the Google Analytics Terms of Service and Privacy Policy.
                </p>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
