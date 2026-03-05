import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { CheckCircle, LayoutDashboard, CreditCard, Copy, ExternalLink, Megaphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QRCodeCard } from '../components/QRCodeCard';

// Map card type to public path segment (where scan opens)
const cardTypeToPath = {
  vehicle: 'vehicle-card',
  business: 'business-card',
  brand: 'brand-card',
  personal: 'card',
  event: 'card',
  custom: 'card',
};

export const CardSuccess = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const { cards, incrementDownload, getLatestCard } = useApp();
  const [copied, setCopied] = useState(false);

  const card = cardId ? cards.find((c) => c.id === cardId) : getLatestCard();

  useEffect(() => {
    if (!card) {
      navigate('/dashboard');
    }
  }, [card, navigate]);

  if (!card) {
    return null;
  }

  const handleDownload = () => {
    incrementDownload(card.id);
  };

  const pathSegment = cardTypeToPath[card.type] || 'card';
  const publicCardUrl = `${window.location.origin}/${pathSegment}/${card.id}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(publicCardUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">ProfileX</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Card Created Successfully!</h1>
          <p className="text-xl text-gray-600">
            Your {card.type} card is ready. When someone scans the QR code, they will see your details on this link.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-1 capitalize">{card.type} Card</h2>
            <p className="text-gray-600 text-sm">Share this link or the QR code below — details are only visible when the link is opened or QR is scanned.</p>
          </div>

          {/* Public URL — no user details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold mb-2 text-sm text-gray-700">Your card&apos;s public link</h3>
            <div className="flex flex-wrap items-center gap-2">
              <code className="flex-1 min-w-0 text-sm bg-white px-3 py-2 rounded-lg border border-gray-200 truncate">
                {publicCardUrl}
              </code>
              <button
                type="button"
                onClick={copyUrl}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shrink-0"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <a
                href={publicCardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </a>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center mb-8">
            <h3 className="font-semibold mb-4 text-lg">Scan or download your QR code</h3>
            <QRCodeCard card={card} onDownload={handleDownload} size={250} publicUrl={publicCardUrl} />
          </div>

          {/* Advertisement / Promo */}
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center shrink-0">
              <Megaphone className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Create more digital cards</h3>
              <p className="text-sm text-amber-800 mb-3">
                Add business, brand, or event cards from your dashboard. Share one link and let people see your info instantly.
              </p>
              <Link
                to="/new-card"
                className="inline-flex items-center gap-1 text-sm font-medium text-amber-900 hover:underline"
              >
                Create another card
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <LayoutDashboard className="w-5 h-5" />
            Go to Dashboard
          </Link>
          <Link
            to="/new-card"
            className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors font-medium"
          >
            Create Another Card
          </Link>
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold mb-3 text-blue-900">Pro tips</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Share your QR code or link — your details are only shown when someone opens the link or scans the QR.</li>
            <li>• Update your card anytime from the dashboard.</li>
            <li>• Track downloads and views in Analytics.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};