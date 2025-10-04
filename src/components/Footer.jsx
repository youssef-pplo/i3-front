import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <p style={{margin:10,color:'var(--muted)',fontSize:'1.2rem'}}>
          <Link to="/about" reloadDocument style={{color:'var(--muted)'}}>About Us</Link> | <Link to="/blog" reloadDocument style={{color:'var(--muted)'}}>Blog</Link> | <Link to="/contact" reloadDocument style={{color:'var(--muted)'}}>Contact Us</Link> | <Link to="/privacy" reloadDocument style={{color:'var(--muted)'}}>Privacy Policy</Link> | <Link to="/terms" reloadDocument style={{color:'var(--muted)'}}>Terms & Conditions</Link>
        </p>
        <p style={{margin:10,color:'var(--muted)'}}>
          يمكن لـ <span className="neon-title no-glow ruqaa ruqaa-blue ruqaa-invert" style={{fontSize:'clamp(20px,6vw,30px)',color:'var(--neon)'}}>اعربلي</span> أن يخطئ، ليس دقيقاً بنسبة 100%
        </p>
        <p style={{margin:10,color:'var(--muted)'}}>
          تطوير <a className="neon-title no-glow ruqaa ruqaa-blue ruqaa-invert" href="https://pplo.dev" target="_blank" rel="noopener noreferrer" style={{fontSize:'clamp(20px,6vw,34px)', color:'var(--neon)'}}>يوسف ببلو</a>
        </p>
        <p style={{margin:10,color:'var(--muted)',fontSize:'0.9rem'}}>صنع في <span style={{color:'red'}}>م</span><span>ص</span><span style={{color:'black'}}>ر</span></p>
        <p style={{margin:0,color:'var(--muted)'}}>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
