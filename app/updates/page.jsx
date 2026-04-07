import UpdatesContent from './UpdatesContent';

export const metadata = {
  title: 'Latest Chapter Updates | idenwebstudio',
  description: 'The latest chapter updates for Korean web novels and light novels on idenwebstudio. New chapters added daily.',
  alternates: { canonical: 'https://idenwebstudio.online/updates' },
};

export default function UpdatesPage() {
  return (
    <>
      {/* Static H1 visible to crawlers before JS hydrates */}
      <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        <h1>Latest Korean Web Novel Chapter Updates</h1>
        <p>Stay up to date with the latest chapter releases for Korean web novels and light novels. New chapters are added daily across hundreds of series. Bookmark your favorites and never miss an update.</p>
      </div>
      <UpdatesContent />
    </>
  );
}
