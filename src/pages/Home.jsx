import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApi, API_CONFIG } from '../lib/api'
import AdComponent from '../components/AdComponent'

export default function Home(){
  const { request } = useApi()
  const [posts,setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(()=>{
    (async()=>{
      try {
        setLoading(true)
        setError('')
        const res = await request(API_CONFIG.endpoints.blog, { method:'GET' })
        if (res?.posts) {
          setPosts(res.posts.slice(0,10))
        } else {
          setPosts([])
        }
      } catch (err) {
        console.error('Failed to load blog posts:', err)
        setError('فشل في تحميل المقالات. حاول تحديث الصفحة.')
        setPosts([])
      } finally {
        setLoading(false)
      }
    })()
  },[])
  return (
    <section id="home" className="hero container">
      <h1 className="neon-title no-glow ruqaa ruqaa-blue" style={{fontSize:'clamp(120px,6vw,64px)',textAlign:'center'}}>
        <span className="ruqaa-invert">أعربلي</span>
      </h1>
      <p className="lead">حلّل الجمل العربية واحصل على إعراب دقيق خلال ثوانٍ.</p>
      <div style={{display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap'}}>
        <Link to="/tool" reloadDocument className="button primary glow">جرّب الأداة الآن</Link>
        <Link to="/blog" reloadDocument className="button ghost">من المدونة</Link>
      </div>
      <div className="card" style={{marginTop:20}}>
        <h2>ما هو موقع أعربلي؟</h2>
        <p style={{margin:'6px 0 0'}}>موقع "أعربلي" أداة متقدمة تساعد الطلاب والمتعلمين والمهتمين باللغة العربية على فهم قواعد النحو والإعراب بسهولة ودقة.</p>
      </div>
      
      {/* Ad Placement */}
      <AdComponent format="auto" responsive={true} />
      
      {loading && (
        <div className="card" style={{marginTop:24}}>
          <div className="loader-bar"><span></span></div>
        </div>
      )}
      
      {error && (
        <div className="card" style={{marginTop:24, textAlign:'center', color:'var(--muted)'}}>
          {error}
        </div>
      )}
      
      {!loading && posts.length > 0 && (
        <div className="grid grid-3" style={{marginTop:24}}>
          {posts.map(p=> (
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
      )}
    </section>
  )
}
