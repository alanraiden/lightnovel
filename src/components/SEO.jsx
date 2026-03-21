import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'idenwebstudio';
const SITE_URL  = 'https://www.idenwebstudio.online';
const DEFAULT_DESC = 'Read the latest light novels, web novels and translated fiction for free on idenwebstudio. Regular chapter updates across fantasy, isekai, action, romance and more.';
const DEFAULT_IMG  = `${SITE_URL}/og-image.jpg`;

/**
 * SEO — drop this into any page to set unique title, description, and OG tags.
 *
 * Props:
 *   title       — page title (without site name suffix)
 *   description — meta description (max ~160 chars)
 *   image       — OG image URL (defaults to site og-image)
 *   url         — canonical URL (defaults to current path)
 *   type        — OG type: 'website' | 'article' (default: 'website')
 *   noIndex     — true to add noindex (e.g. dashboard)
 */
export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;
  const desc      = description
    ? description.slice(0, 160)
    : DEFAULT_DESC;
  const img       = image || DEFAULT_IMG;
  const canonical = url ? `${SITE_URL}${url}` : undefined;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image"       content={img} />
      <meta property="og:type"        content={type} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image"       content={img} />
    </Helmet>
  );
}
