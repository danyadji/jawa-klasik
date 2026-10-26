import React, { useState } from 'react';

/**
 * Universal Copy to Clipboard Button
 */
export default function CopyButton({
  text,
  label = 'Salin',
  copiedLabel = 'Tersalin ✓',
  className = '',
  style = {},
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback untuk browser lama
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center transition-all cursor-pointer select-none ${className}`}
      style={style}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
