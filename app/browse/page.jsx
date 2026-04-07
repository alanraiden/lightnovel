import BrowseContent from './BrowseContent';

export const metadata = {
  title: 'Browse Korean Novels | idenwebstudio',
  description: 'Browse hundreds of Korean web novels and light novels. Filter by genre, status, and rating.',
  alternates: { canonical: 'https://idenwebstudio.online/browse' },
};

export default function BrowsePage() {
  return (
    <>
      {/* Static SEO content — crawlable H1 and body text */}
      <noscript>
        <h1>Browse Korean Web Novels</h1>
        <p>
          Discover hundreds of Korean web novels and light novels, all free to read online.
          Filter by genre, completion status, and rating to find your next favorite story.
          New novels and chapters added daily.
        </p>
      </noscript>
      <BrowseContent />
    </>
  );
}
