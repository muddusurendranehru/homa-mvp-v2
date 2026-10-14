'use client';

import { useEffect, useState } from 'react';

type Props = {
  url?: string;
  title?: string;
  description?: string;
  pageUrl?: string;
  pageTitle?: string;
  pageDescription?: string;
};

async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the textarea fallback
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export default function ShareButtons({
  url,
  title,
  pageUrl,
  pageTitle,
}: Props) {
  const [message, setMessage] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const shareUrl = url || pageUrl || currentUrl;
  const shareTitle = pageTitle || title || 'HOMA Health Clinics';

  const flash = (text: string, ms: number) => {
    setMessage(text);
    setTimeout(() => setMessage(''), ms);
  };

  const handleInstagram = async () => {
    const ok = await copyText(shareUrl);
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    if (ok) {
      flash('Link copied — paste it in your Instagram bio or story', 4000);
    } else {
      flash('Copy failed — please copy manually', 4000);
    }
  };

  const handleCopy = async () => {
    const ok = await copyText(shareUrl);
    if (ok) {
      flash('Link copied', 3000);
    } else {
      flash('Copy failed — please copy manually', 3000);
    }
  };

  return (
    <div className="mt-10 mb-6">
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          💬 WhatsApp
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          📘 Facebook
        </a>
        <button
          type="button"
          onClick={handleInstagram}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          📷 Instagram
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          🔗 Copy link
        </button>
      </div>
      {message ? (
        <p className="mt-3 text-sm text-green-700">{message}</p>
      ) : null}
    </div>
  );
}
