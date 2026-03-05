import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router';
import { CreditCard, Mail, Phone, Globe, MapPin, Car, Briefcase, Store, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiBase } from '../api/client.js';

/** Normalize frontend context card (name, type, data) to same shape as API card for display */
function normalizeContextCard(contextCard) {
  return {
    name: contextCard.name,
    ...(contextCard.data || {}),
  };
}

const cardTypeIcons = {
  'vehicle-card': Car,
  'vehicle': Car,
  'business-card': Briefcase,
  'business': Briefcase,
  'brand-card': Store,
  'brand': Store,
};

const fieldIcons = {
  email: Mail,
  mobileNumber: Phone,
  phone: Phone,
  website: Globe,
  address: MapPin,
  venue: MapPin,
};

function getIconForKey(key) {
  const k = (key || '').toLowerCase();
  if (k.includes('email')) return Mail;
  if (k.includes('phone') || k.includes('mobile')) return Phone;
  if (k.includes('website') || k.includes('url')) return Globe;
  if (k.includes('address') || k.includes('venue')) return MapPin;
  return CreditCard;
}

export const PublicCardView = () => {
  const { cardId } = useParams();
  const location = useLocation();
  const { cards } = useApp();
  const pathSegment = location.pathname.split('/')[1] || ''; // e.g. 'vehicle-card', 'business-card', 'brand-card'

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cardId || !pathSegment) {
      setLoading(false);
      setError('Invalid link');
      return;
    }

    // 1) Try local context first (cards from create flow / localStorage) so "Open" works without backend
    const fromContext = cards?.find((c) => c.id === cardId);
    if (fromContext) {
      setCard(normalizeContextCard(fromContext));
      setError(null);
      setLoading(false);
      return;
    }

    // 2) Else fetch from backend API (when card was created via API or opened by someone else)
    const controller = new AbortController();
    const url = `${apiBase}/api/v1/${pathSegment}/scan/${cardId}`;

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? 'Card not found' : 'Failed to load card');
        return res.json();
      })
      .then((json) => {
        const data = json?.data;
        const details = data?.CardDetails || data?.cardDetails || data;
        if (details) setCard(details);
        else setError('Card not found');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to load card');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [cardId, pathSegment, cards]);

  const typeLabel = pathSegment.replace('-card', '') || 'card';
  const Icon = cardTypeIcons[pathSegment] || cardTypeIcons[typeLabel] || CreditCard;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Loading card...</p>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
            <CreditCard className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Card Not Found</h2>
          <p className="text-gray-600 mb-8">{error || "This card doesn't exist or has been removed."}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  // Build display fields from API response (vehicle/business/brand have different shapes)
  const displayName = card.name || card.brandName || card.ownerName || 'Card';
  const entries = Object.entries(card).filter(
    ([key]) => !['_id', 'id', 'userId', '__v', 'createdAt', 'updatedAt', 'viewCount', 'downloadCount'].includes(key)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-sm border-b">
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
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{displayName}</h1>
                <p className="text-white/80 capitalize">{typeLabel} Card</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {entries.map(([key, value]) => {
                if (value == null || value === '') return null;
                const FieldIcon = getIconForKey(key);
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();
                const isEmail = key.toLowerCase().includes('email');
                const isPhone = key.toLowerCase().includes('phone') || key.toLowerCase().includes('mobile');
                const isLink = key.toLowerCase().includes('website') || key.toLowerCase().includes('url');

                return (
                  <div key={key} className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FieldIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 mb-1">{label}</p>
                      <p className="font-medium break-words">
                        {isEmail && (
                          <a href={`mailto:${value}`} className="text-blue-600 hover:underline">{String(value)}</a>
                        )}
                        {isPhone && !isEmail && (
                          <a href={`tel:${value}`} className="text-blue-600 hover:underline">{String(value)}</a>
                        )}
                        {isLink && !isEmail && String(value).startsWith('http') && (
                          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{String(value)}</a>
                        )}
                        {!isEmail && !isPhone && (!isLink || !String(value).startsWith('http')) && String(value)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Powered by <span className="font-semibold">ProfileX</span>
              </p>
              <Link
                to="/"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Create Your Own Card
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
