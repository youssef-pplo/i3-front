import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header(){
  const [open,setOpen] = useState(false)
  useEffect(()=>{ document.documentElement.setAttribute('dir','rtl') }, [])
  useEffect(()=>{
    document.body.style.overflow = open ? 'hidden' : ''
    return ()=>{ document.body.style.overflow = '' }
  },[open])
  function close(){ setOpen(false) }
  function goBack(){ setOpen(false) }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="nav-area">
          <button className="nav-toggle" aria-expanded={open} onClick={()=> setOpen(v=>!v)} aria-label="فتح القائمة"><span></span><span></span><span></span></button>
          <nav className={`site-nav ${open?'open':''}`} aria-label="التنقل الرئيسي">
            {open && (
              <button className="nav-back" onClick={goBack} aria-label="رجوع" title="رجوع">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M14.5 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <ul onClick={close}>
              <li><NavLink to="/" end reloadDocument>الرئيسية</NavLink></li>
              <li><NavLink to="/tool" reloadDocument className={()=>`ruqaa ruqaa-invert no-glow`} style={{fontSize:'20px'}}>أعربلي</NavLink></li>
              <li><NavLink to="/blog" reloadDocument>المدونة</NavLink></li>
              <li><NavLink to="/about" reloadDocument>من نحن</NavLink></li>
              <li><NavLink to="/contact" reloadDocument>اتصل بنا</NavLink></li>
            </ul>
          </nav>
        </div>
        <Link to="/" reloadDocument className="brand" aria-label="الانتقال إلى الرئيسية">
          <img src="/logo.png" alt="شعار أعربلي" className="logo" />
        </Link>
      </div>
      {open && <div className="backdrop" onClick={close} aria-hidden="true"></div>}
    </header>
  )
}
