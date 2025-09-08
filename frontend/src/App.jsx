
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './Home'
import About from './About'
import Tournaments from './Tournaments'
import Contact from './Contact'
import Rules from './Rules'
import FAQ from './FAQ'
import PrivacyPolicy from './PrivacyPolicy'
import TermsConditions from './TermsConditions'
import Admin from './Admin'

function NotFound() {
  return <div style={{ minHeight: '300px', padding: '3rem 1rem', textAlign: 'center' }}><h2>404 - Page Not Found</h2></div>
}

function App() {
  return (
    <>
   <div>
   <Router>
      <Navbar />
      <div className="body-navbar-offset">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rules/:id" element={<Rules />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
   </div>
    </>
  )
}

export default App
