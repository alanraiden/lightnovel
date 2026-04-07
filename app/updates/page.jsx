import UpdatesContent from './UpdatesContent';

export const metadata = {
  title: 'Latest Chapter Updates | idenwebstudio',
  description: 'The latest chapter updates for Korean web novels and light novels on idenwebstudio.',
  alternates: { canonical: 'https://idenwebstudio.online/updates' },
};

export default function UpdatesPage() {
  return (
    <>
      {/* Static SEO content — crawlable H1 and body text */}
      <noscript>
        <h1>Latest Korean Web Novel Chapter Updates</h1>
        <p>
          Stay up to date with the latest chapter releases for Korean web novels and light novels.
          New chapters are added daily across hundreds of series. Bookmark your favorites
          and never miss an update.
        </p>
      </noscript>
      <UpdatesContent />
    </>
  );
}
