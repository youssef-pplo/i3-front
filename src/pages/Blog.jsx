import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi, API_CONFIG } from '../lib/api'
import AdComponent from '../components/AdComponent'

export default function Blog(){
  const { request } = useApi()
  const [posts,setPosts] = useState([])
  const [expanded,setExpanded] = useState(false)
  const [loading,setLoading] = useState(true)
  
  useEffect(()=>{
    (async()=>{ 
      setLoading(true)
      const res = await request(API_CONFIG.endpoints.blog, { method:'GET' }); 
      setPosts(res?.posts||[])
      setLoading(false)
    })()
  },[])
  
  if (loading) {
    return (
      <section id="blog" className="section">
        <div className="container">
          <div className="loader-bar"><span></span></div>
        </div>
      </section>
    )
  }
  
  return (
    <section id="blog" className="section">
      <div className="container">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <h2>من مدونتنا</h2>
        </div>
        <div className="grid grid-3" style={{transition:'grid-template-rows .4s ease'}}>
          {(expanded ? posts : posts.slice(0,6)).map(p=> (
            <div key={p.id} className="card">
              <h3 style={{color:'var(--neon)',margin:'0 0 8px'}}>{p.title}</h3>
              <p style={{margin:'0 0 12px',color:'var(--muted)'}}>{p.excerpt}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:'.9rem',color:'#8aa9b0'}}>{p.date}</div>
                <Link to={`/blog/${p.id}`} reloadDocument className="button">أقرأ المزيد</Link>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:12}}>
          <button className="button ghost" onClick={()=> setExpanded(v=>!v)}>{expanded?'إخفاء':'عرض جميع المقالات'}</button>
        </div>
        
        {/* Ad Placement */}
        <AdComponent format="auto" responsive={true} />
      </div>
    </section>
  )
}
