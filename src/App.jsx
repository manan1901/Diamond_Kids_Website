import React from 'react';
// 1. Notice we removed BrowserRouter from the import
import { Routes, Route } from 'react-router-dom'; 

import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QualityFeaturesSection from './components/QualityFeaturesSection';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm'; 

function App() {
  return (
    // 2. We removed the <BrowserRouter> tags from here
    <div className="flex flex-col min-h-screen"> 
      
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
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
          <Route 
            path="/admissions" 
            element={<ContactForm />} 
          />
        </Routes>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;