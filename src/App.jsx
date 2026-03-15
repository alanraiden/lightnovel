import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import NovelPage from './pages/NovelPage';
import ReadPage from './pages/ReadPage';
import Dashboard from './pages/Dashboard';
import Rankings from './pages/Rankings';
import Genres from './pages/Genres';
import Updates from './pages/Updates';
import PrivacyTerms from './pages/PrivacyTerms';

function Layout({ children, hideFooter = false }) {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/browse" element={<Layout><Browse /></Layout>} />
          <Route path="/novel/s/:slug" element={<Layout><NovelPage /></Layout>} />
          <Route path="/novel/:id" element={<Layout><NovelPage /></Layout>} />
          <Route path="/read/s/:slug/:chapterSlug" element={<ReadPage />} />
          <Route path="/read/:id/:chapterNum" element={<ReadPage />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/rankings" element={<Layout><Rankings /></Layout>} />
          <Route path="/genres" element={<Layout><Genres /></Layout>} />
          <Route path="/updates" element={<Layout><Updates /></Layout>} />
          <Route path="/privacy" element={<Layout><PrivacyTerms /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
