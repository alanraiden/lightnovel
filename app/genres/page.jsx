import GenresContent from './GenresContent';

export const metadata = {
  title: 'Novel Genres | idenwebstudio',
  description: 'Browse Korean web novels by genre — fantasy, romance, action, isekai, martial arts and more.',
  alternates: { canonical: 'https://idenwebstudio.online/genres' },
};

export default function GenresPage() {
  return (
    <>
      {/* Static SEO content — crawlable H1 and body text */}
      <noscript>
        <h1>Browse Korean Web Novels by Genre</h1>
        <p>
          Explore our full library of Korean web novels and light novels organized by genre.
          From action and fantasy to romance and isekai — find exactly the kind of story you want to read.
        </p>
      </noscript>
      <GenresContent />
    </>
  );
}
