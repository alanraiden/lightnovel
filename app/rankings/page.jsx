import RankingsContent from './RankingsContent';

export const metadata = {
  title: 'Top Ranked Korean Novels | idenwebstudio',
  description: 'Discover the highest rated and most viewed Korean web novels and light novels on idenwebstudio.',
  alternates: { canonical: 'https://idenwebstudio.online/rankings' },
};

export default function RankingsPage() {
  return (
    <>
      {/* Static H1 visible to crawlers before JS hydrates */}
      <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        <h1>Top Ranked Korean Web Novels</h1>
        <p>Discover the highest rated and most viewed Korean web novels and light novels. Rankings updated daily based on reader ratings, views, and chapter counts.</p>
      </div>
      <RankingsContent />
    </>
  );
}
