import React, { useEffect, useRef } from 'react'

export default function AdComponent({ slotId, format = 'auto', responsive = true, className = '' }) {
  const adRef = useRef(null);
  const generatedSlotId = useRef(slotId || `auto-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Initialize Google AdSense ads
    if (window.adsbygoogle && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  const adStyle = {
    display: 'block',
    textAlign: 'center',
    margin: '12px auto',
    minHeight: responsive ? '90px' : '250px',
    maxWidth: '100%'
  };

  return (
    <div ref={adRef} className={`ad-slot ${className}`} style={adStyle}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2789303242179184"
        data-ad-slot={generatedSlotId.current}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
