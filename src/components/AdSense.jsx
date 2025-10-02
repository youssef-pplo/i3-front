import { useEffect, useRef } from 'react'

const AdSense = ({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = {},
  className = '',
  adTest = 'off' // Set to 'on' for testing
}) => {
  const adRef = useRef(null)

  useEffect(() => {
    // Load AdSense script if not already loaded
    if (!window.adsbygoogle) {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2789303242179184'
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
      
      script.onload = () => {
        // Initialize ads after script loads
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (e) {
          console.error('AdSense error:', e)
        }
      }
    } else {
      // Script already loaded, just push the ad
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error('AdSense error:', e)
      }
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-2789303242179184"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
        data-adtest={adTest}
      ></ins>
    </div>
  )
}

// Predefined ad components for different sizes and locations
export const HeaderAd = ({ className = '', style = {} }) => (
  <AdSense
    adSlot="1234567890" // Replace with your actual ad slot ID
    adFormat="auto"
    className={`header-ad ${className}`}
    style={{ width: '100%', height: '90px', ...style }}
  />
)

export const SidebarAd = ({ className = '', style = {} }) => (
  <AdSense
    adSlot="1234567891" // Replace with your actual ad slot ID
    adFormat="auto"
    className={`sidebar-ad ${className}`}
    style={{ width: '300px', height: '250px', ...style }}
  />
)

export const ContentAd = ({ className = '', style = {} }) => (
  <AdSense
    adSlot="1234567892" // Replace with your actual ad slot ID
    adFormat="auto"
    className={`content-ad ${className}`}
    style={{ width: '100%', minHeight: '280px', ...style }}
  />
)

export const FooterAd = ({ className = '', style = {} }) => (
  <AdSense
    adSlot="1234567893" // Replace with your actual ad slot ID
    adFormat="auto"
    className={`footer-ad ${className}`}
    style={{ width: '100%', height: '320px', ...style }}
  />
)

export const ResponsiveAd = ({ className = '', style = {} }) => (
  <AdSense
    adSlot="1234567894" // Replace with your actual ad slot ID
    adFormat="auto"
    fullWidthResponsive={true}
    className={`responsive-ad ${className}`}
    style={{ width: '100%', ...style }}
  />
)

export default AdSense
