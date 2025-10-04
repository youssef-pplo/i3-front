import React from 'react'

export function removeHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.innerText;
}

export function stripTashkeel(text) {
  const TASHKEEL_REGEX = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g;
  return String(text).replace(TASHKEEL_REGEX, '');
}

export function renderAsLines(html, originalSentence) {
  const container = document.createElement('div');
  container.innerHTML = html;
  const items = [];
  container.querySelectorAll('span').forEach(span => {
    const word = span.textContent || '';
    const gram = span.getAttribute('data-i3rab') || span.getAttribute('title') || '';
    if (word) { items.push({ word, gram }); }
  });
  if (!items.length) return null;
  
  return (
    <div>
      {originalSentence && (
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
      )}
      {items.map((item, i) => (
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
          }}>{item.word}</span>
          <span style={{ color: 'var(--text)' }}>: {item.gram}</span>
        </div>
      ))}
    </div>
  );
}

export function getI3rabText(html, originalSentence) {
  const container = document.createElement('div');
  container.innerHTML = html;
  const parts = [];
  container.querySelectorAll('span').forEach(span => {
    const word = span.textContent || '';
    const gram = span.getAttribute('data-i3rab') || span.getAttribute('title') || '';
    if (word) { parts.push(`${word}: ${gram}`); }
  });
  let result = '';
  if (originalSentence) result += `${originalSentence}\n\n`;
  result += parts.join('\n');
  result += '\n\n____________ i3rab given by https://i3rbly.com ______________';
  return result;
}
