import { useEffect, useMemo, useState, useRef } from 'react'
import { Link, NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'

// AdSense Ad Components
function ContentAd({ style, ...props }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client="ca-pub-2789303242179184"
      data-ad-slot="1234567890"
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...props}
    />
  );
}

function ResponsiveAd({ style, ...props }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client="ca-pub-2789303242179184"
      data-ad-slot="0987654321"
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...props}
    />
  );
}

function FooterAd({ style, ...props }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client="ca-pub-2789303242179184"
      data-ad-slot="1122334455"
      data-ad-format="auto"
      data-full-width-responsive="true"
      {...props}
    />
  );
}

const API_CONFIG = {
  get baseUrl(){
    // In development, use empty string to use Vite proxy
    // In production, use the deployed backend URL
    if (import.meta.env.DEV) {
      return ''  // Use Vite proxy in development
    }
    return 'https://i3rbly.youssef.cv'
  },
  endpoints: { parse:'/v1/parse', blog:'/v1/blog', contact:'/v1/contact' },
  timeout: 15000,
}

function useApi(){
  const config = API_CONFIG
  const controller = useMemo(()=> new AbortController(), [])
  async function request(path, opts){
    const id = setTimeout(()=> controller.abort(), config.timeout)
    try{
      const res = await fetch(config.baseUrl + path, { ...opts, signal: controller.signal, headers: { 'Content-Type':'application/json', ...(opts?.headers||{}) } })
      clearTimeout(id)
      if (!res.ok) throw new Error('HTTP '+res.status)
      return await res.json()
    }catch(e){
      clearTimeout(id)
      // In development, show error; in production, fallback to mock
      if (import.meta.env.DEV) {
        console.error('API Error:', e)
        return { ok: false, error: e.message }
      }
      return mock(path, opts)
    }
  }
  return { request }
}

function mock(path, opts){
  if (path.includes('/parse')){
    const body = opts?.body ? JSON.parse(opts.body) : { sentence:'' }
    const text = body.sentence || ''
    return { ok:true, html: '' }  }
  if (path.includes('/blog')){
    return { ok:true, posts:[
      { id:1,  title:'أساسيات الإعراب: ما هو الإعراب؟', date:'2025-09-06', excerpt:'الإعراب هو تغيير يطرأ على أواخر الكلمات العربية تبعاً لتغير موقعها في الجملة.', content:`<p>الإعراب هو تغيير يطرأ على أواخر الكلمات العربية تبعاً لتغير موقعها في الجملة، وهو الذي يحدد وظيفة الكلمة النحوية.</p><ul><li>الرفع: الضمة.</li><li>النصب: الفتحة.</li><li>الجر: الكسرة.</li><li>الجزم: السكون.</li></ul>` },
      { id:2,  title:'علامات الإعراب الأصلية', date:'2025-09-07', excerpt:'العلامات الأصلية للإعراب هي الضمة والفتحة والكسرة والسكون.', content:`<p>أربع علامات أصلية للإعراب: الضمة، الفتحة، الكسرة، السكون مع أمثلة توضيحية.</p>` },
      { id:3,  title:'الفاعل: دليلك الكامل', date:'2025-09-08', excerpt:'الفاعل هو من قام بالفعل ويكون دائماً مرفوعاً.', content:`<p>الفاعل اسم مرفوع يدل على من قام بالفعل. قد يكون ظاهراً أو ضميراً مستتراً.</p>` },
      { id:4,  title:'الممنوع من الصرف', date:'2025-09-20', excerpt:'هو الاسم الذي لا يقبل التنوين ويجر بالفتحة في مواضع.', content:`<p>الممنوع من الصرف لا يقبل التنوين ويجر بالفتحة نيابة عن الكسرة إلا إذا أضيف أو عُرِّف بأل.</p><ul><li>العَلَم على وزن فُعَلاء.</li><li>صيغة منتهى الجموع.</li><li>العَدَل والوصفية مع الأوزان الخاصة.</li></ul>` },
      { id:5,  title:'الفرق بين النعت والحال', date:'2025-09-19', excerpt:'النعت يتبع المنعوت، والحال يبين هيئة صاحبه.', content:`<p>النعت وصف للاسم يتبعه في إعرابه. الحال يبين هيئة صاحبه ويكون منصوباً.</p><p>مثال: جاء الطالب <strong>المجتهدُ</strong> (نعت). جاء الطالب <strong>مسرعاً</strong> (حال).</p>` },
      { id:6,  title:'الأسماء الخمسة وشروط إعرابها', date:'2025-09-18', excerpt:'ترفع بالواو وتنصب بالألف وتجر بالياء بشروط.', content:`<p>الأسماء الخمسة: أب، أخ، حم، فو، ذو. تُعرب بالحروف بشروط منها الإضافة وعدم التصغير.</p>` },
      { id:7,  title:'الأفعال الخمسة وإعرابها', date:'2025-09-16', excerpt:'كل فعل مضارع اتصلت به ألف الاثنين أو واو الجماعة أو ياء المخاطبة.', content:`<p>ترفع بثبوت النون وتنصب وتجزم بحذفها: يكتب<strong>ان</strong>/تكتب<strong>ون</strong>/تكتب<strong>ين</strong>.</p>` },
      { id:8,  title:'المضاف إليه: قاعدة بسيطة', date:'2025-09-15', excerpt:'اسم مجرور يخصص ما قبله دائماً.', content:`<p>المضاف إليه اسم مجرور يوضح الاسم قبله ويخصصه، وعلامته الجر بحسب نوعه.</p>` },
      { id:9, title:'إعراب المثنى وجمع المذكر السالم', date:'2025-09-14', excerpt:'علامات فرعية للأسماء: الألف والواو والياء.', content:`<p>المثنى يُرفع بالألف وينصب ويجر بالياء. جمع المذكر السالم يُرفع بالواو وينصب ويجر بالياء.</p>` },
      { id:10, title:'إن وأخواتها: الحروف الناسخة', date:'2025-09-13', excerpt:'تنصب المبتدأ وترفع الخبر.', content:`<p>إن وأخواتها تدخل على الجملة الاسمية، فتنصب المبتدأ وترفع الخبر: إن الطالبَ مجتهدٌ.</p>` },
      { id:11, title:'كان وأخواتها: الأفعال الناسخة', date:'2025-09-12', excerpt:'ترفع الاسم وتنصب الخبر.', content:`<p>كان وأخواتها ترفع الاسم وتنصب الخبر: كان الجوُّ لطيفاً.</p>` },
      { id:12, title:'علامات الإعراب الأصلية (مراجعة)', date:'2025-09-11', excerpt:'مراجعة سريعة للعلامات الأصلية.', content:`<p>مراجعة مركزة للضمة والفتحة والكسرة والسكون مع أمثلة إضافية.</p>` },
      { id:13, title:'علامات الإعراب الفرعية', date:'2025-09-10', excerpt:'متى نستخدم الألف والواو والياء بدل الأصلية؟', content:`<p>تظهر العلامات الفرعية في التثنية، والجمع السالم، والأسماء الخمسة، ونائب عن الضمة/الفتحة/الكسرة.</p>` },
      { id:14, title:'الجملة الاسمية: المبتدأ والخبر', date:'2025-09-01', excerpt:'الركنان الأساسيان للجملة الاسمية.', content:`<p>المبتدأ مرفوع غالباً، والخبر مرفوع ويكمل المعنى. قد يتقدم الخبر أو يحذف لقرينة.</p>` },
      { id:15, title:'كيفية إعراب المفعول به', date:'2025-08-12', excerpt:'علامات نصبه وأشهر أحواله.', content:`<p>المفعول به منصوب وعلامته الفتحة أو ما ينوب عنها. قد يأتي ضميراً أو مصدراً مؤولاً.</p>` },
      { id:16, title:'الفاعل: دليلك الكامل (موسع)', date:'2025-08-24', excerpt:'أنواع الفاعل وأحكامه.', content:`<p>قد يكون الفاعل اسماً ظاهراً أو ضميراً أو مصدراً مؤولاً. يمتنع حذفه إلا لقرينة.</p>` },
      { id:17, title:'أدوات النصب والجزم للفعل المضارع', date:'2025-09-17', excerpt:'أن، لن، كي… ولم، لما، لا الناهية…', content:`<p>تنصب أدوات النصب الفعل المضارع بالفتحة، وتجزم أدوات الجزم بالسكون أو بحذف النون/حرف العلة.</p>` },
      { id:18, title:'التوابع في اللغة العربية', date:'2025-09-22', excerpt:'النعت، التوكيد، العطف، والبدل.', content:`<p>التوابع تتبع ما قبلها في الإعراب. لكل نوع أحكامه وأمثلة توضيحية.</p>` },
      { id:19, title:'أسلوب الاستثناء وإعرابه', date:'2025-09-21', excerpt:'المستثنى منه، أداة الاستثناء، المستثنى.', content:`<p>الاستثناء بـ إلا، وغير، وسوى… تتغير أحكام المستثنى حسب تام/منفي/مفرغ.</p>` }
    ] }
  }
  return { ok:false }
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[m]))
}

function Header(){
  const [open,setOpen] = useState(false)
  useEffect(()=>{ document.documentElement.setAttribute('dir','rtl') }, [])
  useEffect(()=>{
    document.body.style.overflow = open ? 'hidden' : ''
    return ()=>{ document.body.style.overflow = '' }
  },[open])
  function close(){ setOpen(false) }
  function goBack(){
  
    setOpen(false)
  }
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
              <li><NavLink to="/" end>الرئيسية</NavLink></li>
              <li><NavLink to="/tool" className={()=>`ruqaa ruqaa-invert nav-glow`}>أعربلي</NavLink></li>
              <li><NavLink to="/blog">المدونة</NavLink></li>
              <li><NavLink to="/about">من نحن</NavLink></li>
              <li><NavLink to="/contact">اتصل بنا</NavLink></li>
            </ul>
          </nav>
        </div>
        {/* Right area: brand logo */}
        <Link to="/" className="brand" aria-label="الانتقال إلى الرئيسية">
          <img src="/logo.png" alt="شعار أعربلي" className="logo" />
        </Link>
      </div>
      {open && <div className="backdrop" onClick={close} aria-hidden="true"></div>}
    </header>
  )
}

function Hero(){
  const { request } = useApi()
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    (async()=>{
      const res = await request(API_CONFIG.endpoints.blog, { method:'GET' })
      setPosts((res?.posts || []).slice(0,10))
    })()
  },[])
  return (
    <section id="home" className="hero container">
      <h1 className="neon-title no-glow ruqaa ruqaa-blue" style={{fontSize:'clamp(36px,6vw,64px)',textAlign:'center'}}>
        <span className="ruqaa-invert">أعربلي</span>
      </h1>
      <p className="lead">حلّل الجمل العربية واحصل على إعراب دقيق خلال ثوانٍ.</p>
      <div style={{display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap'}}>
        <Link to="/tool" className="button primary glow">جرّب الأداة الآن</Link>
        <Link to="/blog" className="button ghost">من المدونة</Link>
      </div>
      <div className="card" style={{marginTop:20}}>
        <h2>ما هو موقع أعربلي؟</h2>
        <p style={{margin:'6px 0 0'}}>موقع "أعربلي" أداة متقدمة تساعد الطلاب والمتعلمين والمهتمين باللغة العربية على فهم قواعد النحو والإعراب بسهولة ودقة. يقدّم الموقع تجربة بسيطة وسريعة لتحليل الجمل العربية والحصول على إعراب منسّق لكل كلمة.</p>
      </div>
      {posts.length > 0 && (
        <div className="grid grid-3" style={{marginTop:24}}>
          {posts.map(p=> (
            <div key={p.id} className="card">
              <h3 style={{color:'var(--neon)',margin:'0 0 8px'}}>{p.title}</h3>
              <p style={{margin:'0 0 12px',color:'var(--muted)'}}>{p.excerpt}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontSize:'.9rem',color:'#8aa9b0'}}>{p.date}</div>
                <Link to={`/blog/${p.id}`} className="button">أقرأ المزيد</Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Additional Content Sections */}
      <div className="card" style={{marginTop:24}}>
        <h2 style={{color:'var(--neon)',textAlign:'right'}}>كيفية استخدام أعربلي</h2>
        <ol style={{textAlign:'right',paddingRight:'20px',lineHeight:'1.8'}}>
          <li><strong>اكتب الجملة:</strong> أدخل الجملة العربية التي تريد تحليلها في مربع النص أعلاه.</li>
          <li><strong>اضغط على "أعربلي":</strong> بمجرد الضغط على الزر، سيبدأ الذكاء الاصطناعي في تحليل الجملة.</li>
          <li><strong>احصل على النتيجة:</strong> خلال ثوانٍ، سيظهر الإعراب المفصل لكل كلمة في الجملة أمامك.</li>
        </ol>
      </div>

      <div className="card" style={{marginTop:16}}>
        <h2 style={{color:'var(--neon)',textAlign:'right'}}>لماذا تختار أعربلي؟</h2>
        <ul style={{textAlign:'right',paddingRight:'20px',lineHeight:'1.8'}}>
          <li><strong>دقة عالية:</strong> يعتمد نموذجنا على أحدث تقنيات الذكاء الاصطناعي.</li>
          <li><strong>سرعة فائقة:</strong> احصل على نتائج فورية دون الحاجة للانتظار.</li>
          <li><strong>سهولة الاستخدام:</strong> تصميم بسيط وواضح يجعل عملية الإعراب في متناول الجميع.</li>
          <li><strong>مجاني تمامًا:</strong> خدمة مجانية لدعم كل الطلاب والمهتمين باللغة العربية.</li>
        </ul>
      </div>

      <div className="card" style={{marginTop:16}}>
        <h2 style={{color:'var(--neon)',textAlign:'right'}}>أهمية الإعراب في اللغة العربية</h2>
        <p style={{textAlign:'right',lineHeight:'1.8'}}>
          الإعراب ليس مجرد مجموعة من القواعد المعقدة، بل هو جوهر اللغة العربية الذي يحدد المعنى الدقيق للجمل.
          من خلال فهم الإعراب، يمكن للطالب أن يتقن استخدام اللغة العربية بشكل صحيح ودقيق.
        </p>
      </div>

      {/* Ad Section */}
      <ContentAd style={{marginTop: 24, minHeight: 250}} />
    </section>
  )
}

function Tool(){
  const { request } = useApi()
  const [sentence,setSentence] = useState('')
  const [html,setHtml] = useState('')
  const [loading,setLoading] = useState(false)
  const [copyStatus,setCopyStatus] = useState('')
  const [error,setError] = useState('')
  function onParseOutputClick(e){
    const target = e.target
    if (target && target.classList && target.classList.contains('token')){
      target.classList.toggle('active')
    }
  }
  function onParseOutputKeyDown(e){
    if (!e) return
    const target = e.target
    if (target && target.classList && target.classList.contains('token') && (e.key === 'Enter' || e.key === ' ')){
      e.preventDefault()
      target.classList.toggle('active')
    }
  }
  async function onSubmit(e){
    e.preventDefault()
    if (!sentence.trim()) return
    setLoading(true)
    setHtml('')
    setError('')
    try {
      const res = await request(API_CONFIG.endpoints.parse, { method:'POST', body: JSON.stringify({ sentence }) })
      if (res?.html) {
        setHtml(res.html)
      } else {
        setError('حدث خطأ في التحليل. يرجى المحاولة مرة أخرى.')
      }
    } catch (err) {
      setError('فشل في الاتصال بالخادم. تحقق من اتصال الإنترنت.')
    }
    setLoading(false)
  }
  return (
    <section id="tool" className="section">
      <div className="container grid grid-2" style={{gridTemplateColumns:'1fr'}}>
        <div className="card" style={{paddingTop:'24px'}}>
          <h2 className="ruqaa ruqaa-invert" style={{textAlign:'center',fontSize:'clamp(85px,40vw,100px)',textShadow:'none'}}>أعربلي</h2>
          <form onSubmit={onSubmit} className="parse-form">
            <label htmlFor="sentence" className="form-label">اكتب الجملة المراد إعرابها</label>
            <input id="sentence" className="input" type="text" placeholder="مثال: ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ" value={sentence} onChange={e=> setSentence(e.target.value)} />
            <div style={{marginTop:'12px'}}>
              <button className={`button primary cta-big glow ${loading?'is-loading':''}`} disabled={loading} style={{width:'100%',padding:'1.2rem 1.6rem',fontSize:'1.2rem'}}>أعربلي</button>
            </div>
          </form>
          {loading && <div className="loader-bar" aria-hidden="true"><span></span></div>}
        </div>
        <aside style={{gridColumn:'1 / -1'}}>
          {(loading || html) && (
      <div className="card" style={{marginTop:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <h3>نتيجة الأعراب</h3>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <button className="button" onClick={async ()=> {
                    await navigator.clipboard.writeText(getI3rabText(html, sentence))
                    setCopyStatus('تم النسخ مع التشكيل!')
                    setTimeout(()=> setCopyStatus(''), 2000)
                  }}>نسخ مع التشكيل</button>
                  <button className="button" onClick={async ()=> {
                    await navigator.clipboard.writeText(stripTashkeel(getI3rabText(html, sentence)))
                    setCopyStatus('تم النسخ بدون التشكيل!')
                    setTimeout(()=> setCopyStatus(''), 2000)
                  }}>نسخ بدون التشكيل</button>
                  {copyStatus && <span style={{color:'var(--neon)',fontSize:'0.9rem',fontWeight:'bold'}}>{copyStatus}</span>}
                </div>
              </div>
              {loading ? (
                <div className="parse-output">
                  <span className="token skeleton" style={{width:'30%'}}></span>
                  <span className="token skeleton" style={{width:'40%'}}></span>
                  <span className="token skeleton" style={{width:'35%'}}></span>
                </div>
              ) : error ? (
                <div style={{color:'red', textAlign:'center', padding:20}}>
                  {error}
                </div>
              ) : (
                <div className="parse-output">{renderAsLines(html, sentence)}</div>
              )}
            </div>
          )}

          {/* Ad Section */}
          <ContentAd style={{marginTop: 12, minHeight: 200}} />

          {/* Help Section */}
          <div className="card" style={{marginTop:12,backgroundColor:'var(--card-bg)',border:'1px solid var(--border)'}}>
            <h4 style={{margin:'0 0 8px',color:'var(--neon)'}}>معلومة مهمة</h4>
            <p style={{margin:0,fontSize:'0.9rem',color:'var(--muted)'}}>
              اعربلي هو اول موديل اعراب في العالم، صمم من قبل يوسف السيد (pplo.dev) للاستخدام العلمي فقط.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

function removeHtml(h){
  const div = document.createElement('div');
  div.innerHTML = h; return div.innerText
}
function renderAsLines(h, originalSentence){
  // Convert incoming HTML (spans with token + data-i3rab) into styled lines
  const container = document.createElement('div');
  container.innerHTML = h;
  const parts = []
  container.querySelectorAll('span').forEach(span=>{
    const word = span.textContent || ''
    const gram = span.getAttribute('data-i3rab') || span.getAttribute('title') || ''
    if (word){ 
      parts.push({
        word: word,
        analysis: gram,
        display: `${word}: ${gram}`
      })
    }
  })
  
  if (!parts.length) return null;
  
  return (
    <div>
      {/* Centered original sentence */}
      <div style={{
        textAlign: 'center', 
        fontSize: '1.2rem', 
        fontWeight: 'bold', 
        marginBottom: '16px',
        padding: '8px',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '8px',
        border: '2px solid var(--neon)'
      }}>
        {originalSentence}
      </div>
      
      {/* I3rab results */}
      {parts.map((item, i) => (
        <div key={i} className="token" style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          padding: '8px 12px',
          margin: '4px 0'
        }}>
          <span style={{
            fontWeight: 'bold',
            color: 'var(--neon)',
            fontSize: '1.15rem'
          }}>
            {item.word}
          </span>
          <span style={{color: 'var(--text)'}}>: {item.analysis}</span>
        </div>
      ))}
    </div>
  )
}

function getI3rabText(h, originalSentence) {
  // Extract i3rab text for copying
  const container = document.createElement('div');
  container.innerHTML = h;
  const parts = []
  container.querySelectorAll('span').forEach(span=>{
    const word = span.textContent || ''
    const gram = span.getAttribute('data-i3rab') || span.getAttribute('title') || ''
    if (word){ parts.push(`${word}: ${gram}`) }
  })
  
  let result = '';
  if (originalSentence) {
    result += `${originalSentence}\n\n`;
  }
  result += parts.join('\n');
  result += '\n\n____________ i3rab given by https://i3rbly.com ______________';
  
  return result;
}
function stripTashkeel(s){
  const TASHKEEL_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g
  return String(s).replace(TASHKEEL_REGEX, '')
}

function Blog(){
  const { request } = useApi()
  const [posts,setPosts] = useState([])
  const [expanded,setExpanded] = useState(false)
  useEffect(()=>{
    (async()=>{
      const res = await request(API_CONFIG.endpoints.blog, { method:'GET' })
      setPosts(res?.posts || [])
    })()
  },[])
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
                <Link to={`/blog/${p.id}`} className="button">أقرأ المزيد</Link>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'center',marginTop:12}}>
          <button className="button ghost" onClick={()=> setExpanded(v=>!v)}>
            {expanded ? 'إخفاء' : 'عرض جميع المقالات'}
          </button>
        </div>
      </div>
    </section>
  )
}

function BlogPost(){
  const { request } = useApi()
  const navigate = useNavigate()
  const { id } = useParams()
  const [post,setPost] = useState(null)
  const postId = Number(id)
  useEffect(()=>{
    (async()=>{
      const res = await request(API_CONFIG.endpoints.blog, { method:'GET' })
      const all = res?.posts || []
      setPost(all.find(x=> x.id === postId) || null)
    })()
  },[postId])
  if (!post) return (
    <section className="section"><div className="container"><div className="loader-bar"><span></span></div></div></section>
  )
  return (
    <section id="blog-post" className="section">
      <div className="container">
        <article className="card" style={{maxWidth:900,margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <button className="button" onClick={()=> navigate(-1)}>رجوع</button>
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

function About(){
  return (
    <section id="about" className="section">
      <div className="container grid grid-2">
        <div className="card" style={{gridColumn:'1 / -1'}}>
          <h3>عن أعربلي</h3>
          <p style={{margin:'6px 0 0'}}>تم إطلاق موقع "أعربلي" بهدف تسهيل فهم قواعد اللغة العربية وجعلها في متناول الجميع. نحن نؤمن بأن التكنولوجيا يمكن أن تلعب دورًا كبيرًا في التعليم، ونسعى من خلال هذا المشروع إلى تقديم أداة تعليمية مبتكرة ومجانية.</p>
          <p style={{margin:'10px 0 0'}}>تم تطوير "أعربلي" بواسطة فريق من المطورين واللغويين الذين يشاركونك الشغف باللغة العربية.</p>
        </div>
        <div className="card" style={{gridColumn:'1 / -1'}}>
          <h2>ما هو موقع أعربلي؟</h2>
          <p>أداة متقدمة تساعد الطلاب والمهتمين باللغة العربية على فهم قواعد النحو والإعراب بسهولة ودقة.</p>
          <ul style={{margin:'8px 0 0',padding:'0 20px'}}>
            <li>تحليل فوري للجمل العربية</li>
            <li>تصميم حديث ودعم كامل للهواتف</li>
            <li>جاهزة للاتصال بالخادم في أي وقت</li>
          </ul>
        </div>
        <div className="card" style={{gridColumn:'1 / -1'}}>
          <h3>المزايا</h3>
          <div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginTop:10}}>
            <span className="token">أداة اعراب</span>
            <span className="token">دقة عالية</span>
            <span className="token">واجهة عربية أنيقة</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact(){
  return (
    <section id="contact" className="section">
      <div className="container grid grid-2">
        <div className="card">
          <h2>اتصل بنا</h2>
          <p style={{margin:'0 0 10px'}}>نرحب بآرائكم واقتراحاتكم. يمكنكم التواصل معنا عبر البريد الإلكتروني:</p>
          <p style={{fontSize:'1.05rem'}}><a href="mailto:youssefdev74@gmail.com" className="button ghost">youssefdev74@gmail.com</a></p>
        </div>
      </div>
    </section>
  )
}

function Privacy(){
  return (
    <section id="privacy" className="section">
      <div className="container">
        <div className="card" style={{maxWidth:900,margin:'0 auto'}}>
          <h1>سياسة الخصوصية</h1>
          <p style={{margin:'16px 0'}}>نحن في موقع أعربلي نقدر خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي تقدمها لنا.</p>

          <h2>المعلومات التي نجمعها</h2>
          <p>نقوم بجمع المعلومات التالية:</p>
          <ul>
            <li>الجمل العربية التي تدخلها للتحليل</li>
            <li>معلومات الاستخدام العامة (مثل نوع المتصفح والجهاز)</li>
            <li>عنوان IP لأغراض الأمان</li>
          </ul>

          <h2>كيف نستخدم معلوماتك</h2>
          <p>نستخدم المعلومات لـ:</p>
          <ul>
            <li>تقديم خدمة التحليل النحوي</li>
            <li>تحسين أداء الموقع</li>
            <li>ضمان الأمان والحماية</li>
          </ul>

          <h2>مشاركة المعلومات</h2>
          <p>لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة، باستثناء ما يتطلبه القانون.</p>

          <h2>أمان البيانات</h2>
          <p>نتخذ تدابير أمنية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.</p>

          <h2>حقوقك</h2>
          <p>لديك الحق في الوصول إلى بياناتك الشخصية وتصحيحها أو حذفها. يمكنك الاتصال بنا لممارسة هذه الحقوق.</p>

          <h2>التحديثات</h2>
          <p>قد نحدث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات جوهرية.</p>

          <p style={{marginTop:24}}>آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
        </div>
      </div>
    </section>
  )
}

function Terms(){
  return (
    <section id="terms" className="section">
      <div className="container">
        <div className="card" style={{maxWidth:900,margin:'0 auto'}}>
          <h1>شروط الاستخدام</h1>
          <p style={{margin:'16px 0'}}>مرحباً بك في موقع أعربلي. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p>

          <h2>الاستخدام المقبول</h2>
          <p>يُسمح لك باستخدام الموقع للأغراض التعليمية والشخصية فقط. يُمنع استخدام الموقع لأي أغراض غير قانونية أو ضارة.</p>

          <h2>المحتوى</h2>
          <p>المحتوى الذي تقدمه للتحليل يظل ملكك. نحن لا نتحمل مسؤولية دقة النتائج 100%، حيث أن هذا نموذج ذكاء اصطناعي.</p>

          <h2>الخدمة</h2>
          <p>نقدم الخدمة "كما هي" دون ضمانات صريحة أو ضمنية. قد تكون الخدمة غير متوفرة مؤقتاً للصيانة.</p>

          <h2>القيود</h2>
          <ul>
            <li>عدم إرسال محتوى مسيء أو غير قانوني</li>
            <li>عدم محاولة اختراق أو إلحاق الضرر بالموقع</li>
            <li>عدم استخدام الخدمة لأغراض تجارية دون إذن</li>
          </ul>

          <h2>الإنهاء</h2>
          <p>نحتفظ بالحق في إنهاء أو تعليق وصولك إلى الخدمة في أي وقت ولأي سبب.</p>

          <h2>القانون المعمول به</h2>
          <p>تخضع هذه الشروط لقوانين جمهورية مصر العربية.</p>

          <h2>الاتصال</h2>
          <p>لأي استفسارات، يمكنك الاتصال بنا عبر البريد الإلكتروني: youssefdev74@gmail.com</p>

          <p style={{marginTop:24}}>آخر تحديث: {new Date().toLocaleDateString('ar-EG')}</p>
        </div>
      </div>
    </section>
  )
}

function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        {/* AdSense Ad Unit */}
        <FooterAd style={{margin: '20px auto'}} />

        <nav style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center'}}>
          <Link to="/">الرئيسية</Link>
          <Link to="/tool">أداة الإعراب</Link>
          <Link to="/blog">المدونة</Link>
          <Link to="/about">من نحن</Link>
          <Link to="/contact">اتصل بنا</Link>
        </nav>
        <p style={{margin:10,color:'var(--muted)'}}>يمكن ل <span style={{color:'var(--neon)'}}>اعربلي</span> أن يخطئ، ليس دقيقاً بنسبة 100%</p>
        <p style={{margin:10,color:'var(--muted)'}}>تطوير <a href="https://pplo.dev" target="_blank" style={{color:'var(--neon)'}}>يوسف ببلو</a></p>
        <p style={{margin:10,color:'var(--muted)',fontSize:'0.9rem'}}>
          <a href="/about" style={{color:'var(--muted)'}}>About Us</a> | <a href="/blog" style={{color:'var(--muted)'}}>Blog</a> | <a href="/contact" style={{color:'var(--muted)'}}>Contact Us</a> | <a href="/privacy" style={{color:'var(--muted)'}}>Privacy Policy</a> | <a href="/terms" style={{color:'var(--muted)'}}>Terms & Conditions</a>
        </p>
        <p style={{margin:10,color:'var(--muted)',fontSize:'0.9rem'}}>صنع في <span style={{color:'red'}}>م</span><span>ص</span><span style={{color:'black'}}>ر</span></p>
        <p style={{margin:0,color:'var(--muted)'}}>جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

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
          <Route path="/" element={<Hero />} />
          <Route path="/tool" element={<Tool />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
