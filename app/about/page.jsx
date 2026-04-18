import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import '../privacy/PrivacyTerms.css';

export const metadata = {
  title: 'About Us — idenwebstudio',
  description:
    'Learn about idenwebstudio — a free Korean web novel reading platform built by fans, for fans. Discover our mission, story, and the team behind the site.',
};

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="pt-page">
        <div className="container">

          {/* Header */}
          <div className="pt-header">
            <div className="pt-badge">About Us</div>
            <h1 className="pt-title">Welcome to idenwebstudio</h1>
            <p className="pt-subtitle">Your home for Korean web novels — free, fast, and built by fans</p>
          </div>

          {/* Single-column content */}
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="pt-section">

              {/* Mission */}
              <h2>Our Mission</h2>
              <p>
                idenwebstudio was created with one simple goal: to make Korean web novels (KN)
                accessible to every reader around the world — without paywalls, without
                subscriptions, and without friction. We believe great stories deserve great
                audiences, and we are committed to building a platform that puts readers first.
              </p>
              <p>
                From high-octane action and system-powered regressions to slow-burn romance and
                deeply emotional dramas, Korean web novels represent one of the most creative and
                diverse storytelling traditions in the world today. idenwebstudio exists to
                celebrate that tradition and share it with as many people as possible.
              </p>

              {/* What We Offer */}
              <h2>What You Will Find Here</h2>
              <p>
                Our library spans a wide range of genres — Action, Romance, Fantasy, Isekai,
                Psychological, System, Martial Arts, and many more. Every novel page includes a
                synopsis, genre tags, reader ratings, and a full chapter list so you can jump
                straight into the story that catches your eye. Our reading interface is designed
                for long reading sessions, with adjustable font sizes, font families, dark and
                light modes, and a progress tracker so you never lose your place.
              </p>
              <p>
                We update our library regularly as new chapters become available, and our
                Latest Updates page makes it easy to keep track of ongoing series you are
                following. You can also bookmark your favourite novels and pick up right where
                you left off, even across devices.
              </p>

              {/* Why KN */}
              <h2>Why Korean Web Novels?</h2>
              <p>
                Korean web novels — often called KN or KWN — have exploded in global popularity
                over the past decade. Series like <em>Solo Leveling</em>, <em>Omniscient Reader's
                Viewpoint</em>, and <em>The Beginning After The End</em> have introduced millions
                of readers worldwide to a uniquely Korean blend of fast-paced plotting, richly
                built game-like worlds, and deeply human emotional cores.
              </p>
              <p>
                Unlike many other literary traditions, Korean web novels are written directly
                for online audiences — serialised chapter by chapter, responsive to reader
                feedback, and packed with unforgettable moments. idenwebstudio is the best place
                to dive into this world, whether you are a first-time reader or a long-time fan.
              </p>

              {/* Community */}
              <h2>Join Our Community</h2>
              <p>
                Reading is better together. Our comment sections let you discuss chapters with
                fellow readers, share theories, and react to the story as it unfolds. We also have
                an active Discord server where members recommend novels, debate rankings, and get
                early heads-up on new additions to the library.
              </p>
              <p>
                If you enjoy idenwebstudio and want to help keep it running, you can support us
                on Ko-fi. Every contribution directly helps with server costs and allows us to
                keep the site free for everyone.
              </p>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '32px' }}>
                <Link href="/browse" style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  background: 'var(--accent-purple)',
                  color: '#fff',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}>
                  Browse Novels
                </Link>
                <a href="https://discord.gg/MJf9mUra" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  background: 'transparent',
                  color: 'var(--accent-purple)',
                  border: '1px solid var(--accent-purple)',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}>
                  Join Discord
                </a>
                <Link href="/contact" style={{
                  display: 'inline-block',
                  padding: '10px 24px',
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}>
                  Contact Us
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
}
