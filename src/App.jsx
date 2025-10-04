import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ToolPage from './pages/Tool.jsx'
import BlogPage from './pages/Blog.jsx'
import BlogPostPage from './pages/BlogPost.jsx'
import AboutPage from './pages/About.jsx'
import ContactPage from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
 
export default function App(){
  // parallax
  useEffect(()=>{
    const onScroll = () => {
      document.documentElement.style.setProperty('--scrollY', String(window.scrollY))
    }
    window.addEventListener('scroll', onScroll,{passive:true})
    onScroll()
    return ()=> window.removeEventListener('scroll', onScroll)
  }, [])

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, [])
  return (
    <div className="app-root">
      <div className="bg-animated" aria-hidden="true">
        <div className="blob one"></div>
        <div className="blob two"></div>
      </div>
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tool" element={<ToolPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
