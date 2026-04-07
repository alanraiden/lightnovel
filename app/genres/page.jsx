import GenresContent from './GenresContent';

export const metadata = {
  title: 'Novel Genres | idenwebstudio',
  description: 'Browse Korean web novels by genre — fantasy, romance, action, isekai, martial arts and more.',
  alternates: { canonical: 'https://idenwebstudio.online/genres' },
};

export default function GenresPage() {
  return (
    <>
      {/* Static H1 crawlable before JS hydrates */}
      <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        <h1>Korean Web Novel Genres</h1>
        <p>Browse Korean web novels and light novels by genre. Choose from fantasy, isekai, romance, action, martial arts, psychological, horror, historical, system and many more genres.</p>
      </div>
      <GenresContent />
    </>
  );
}
