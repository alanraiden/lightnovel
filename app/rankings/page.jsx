import RankingsContent from './RankingsContent';

export const metadata = {
  title: 'Top Ranked Korean Novels | idenwebstudio',
  description: 'Discover the highest rated and most viewed Korean web novels and light novels on idenwebstudio.',
  alternates: { canonical: 'https://idenwebstudio.online/rankings' },
};

export default function RankingsPage() {
  return (
    <>
      {/* Static SEO content — crawlable H1 and body text */}
      <noscript>
        <h1>Top Ranked Korean Web Novels</h1>
        <p>
          Discover the highest-rated and most-read Korean web novels and light novels.
          Our rankings are updated weekly based on reader ratings, views, and engagement.
          Find the best novels to start reading today.
        </p>
      </noscript>
      <RankingsContent />
    </>
  );
}
