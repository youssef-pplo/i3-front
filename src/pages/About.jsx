export default function About(){
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


