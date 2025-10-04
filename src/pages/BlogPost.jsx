import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApi, API_CONFIG } from '../lib/api'

export default function BlogPost(){
  const { request } = useApi()
  const { id } = useParams()
  const [post,setPost] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState('')
  const postId = Number(id)
  
  useEffect(()=>{
    (async()=>{ 
      setLoading(true)
      setError('')
      try {
        const res = await request(API_CONFIG.endpoints.blog, { method:'GET' }); 
        const all=res?.posts||[]; 
        const foundPost = all.find(x=>x.id===postId)||null
        if (!foundPost) {
          setError('المقال غير موجود')
        }
        setPost(foundPost)
      } catch (err) {
        setError('حدث خطأ في تحميل المقال')
        console.error('Blog post error:', err)
      }
      setLoading(false)
    })()
  },[postId])
  
  if (loading) return (<section className="section"><div className="container"><div className="loader-bar"><span></span></div></div></section>)
  if (error) return (<section className="section"><div className="container"><div style={{color:'red', textAlign:'center'}}>{error}</div></div></section>)
  if (!post) return (<section className="section"><div className="container"><div style={{color:'var(--muted)', textAlign:'center'}}>المقال غير موجود</div></div></section>)
  
  return (
    <section id="blog-post" className="section">
      <div className="container">
        <article className="card" style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <Link to="/blog" reloadDocument className="button">رجوع</Link>
          </div>
          <h1 className="ruqaa ruqaa-invert" style={{marginTop:0}}>{post.title}</h1>
          <div style={{fontSize:'.9rem',color:'#8aa9b0',marginBottom:12}}>{post.date}</div>
          <p>{post.excerpt}</p>
          <div dangerouslySetInnerHTML={{__html: post.content || ''}} />
        </article>
      </div>
    </section>
  )
}
