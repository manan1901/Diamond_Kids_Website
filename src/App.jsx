import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QualityFeaturesSection from './components/QualityFeaturesSection';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm'; 
import Calendar  from './components/Calendar';

import FeePayment from './pages/FeePayment';
import NoticeBoard from './pages/NoticeBoard';
import Gallery from './pages/Gallery';

import ScrollProgress from './components/ui/ScrollProgress';
import ScrollToTop from './components/ui/ScrollToTop';
import CursorGlow from './components/ui/CursorGlow';
import PageTransition from './components/ui/PageTransition';

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen"> 
      <ScrollProgress />
      <ScrollToTop />
      <CursorGlow />

      <Navbar />
      
      <main className="flex-grow">
        {/* AnimatePresence + key={pathname}: page change par purana page fade-out, naya fade-in */}
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              {/* Route 1: The Home Page ("/") */}
              <Route 
                path="/" 
                element={
                  <>
                    <Hero />
                    <QualityFeaturesSection />
                  </>
                } 
              />

              {/* Route 2: The Admissions Page ("/admissions") */}
              <Route path="/admissions" element={<ContactForm />} />
              <Route path="/calendar" element={<Calendar />} />

              {/* New pages */}
              <Route path="/online-fee-payment" element={<FeePayment />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/notice-board" element={<NoticeBoard />} />

              {/* Purana link "/notice-board-events" kisi ne bookmark kiya ho to naye page par bhej do */}
              <Route path="/notice-board-events" element={<Navigate to="/notice-board" replace />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;
