import BrowseContent from './BrowseContent';

export const metadata = {
  title: 'Browse Korean Novels | idenwebstudio',
  description: 'Browse hundreds of Korean web novels and light novels. Filter by genre, status, and rating.',
  alternates: { canonical: 'https://idenwebstudio.online/browse' },
};

export default function BrowsePage() {
  return (
    <>
      {/* Static H1 + intro visible to crawlers before JS hydrates */}
      <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        <h1>Browse Korean Web Novels</h1>
        <p>Browse hundreds of Korean web novels and light novels. Filter by genre — fantasy, isekai, romance, action, martial arts and more — by status, and by rating. New chapters added daily.</p>
      </div>
      <BrowseContent />
    </>
  );
}
