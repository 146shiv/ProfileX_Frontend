import React from 'react';
import { Link, useParams } from 'react-router';
import { CreditCard, Mail, Phone, Globe, MapPin, Calendar, Car, Briefcase, Store, User, Sparkles, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

const cardTypeIcons = {
  vehicle: Car,
  business: Briefcase,
  brand: Store,
  personal: User,
  event: Calendar,
  custom: Sparkles
};

export const CardView = () => {
  const { cardId } = useParams();
  const { cards } = useApp();

  const card = cards.find((c) => c.id === cardId);

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
            <CreditCard className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Card Not Found</h2>
          <p className="text-gray-600 mb-8">
            This card doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            
            <Home className="w-5 h-5" />
            Go to Home
          </Link>
        </div>
      </div>);

  }

  const Icon = cardTypeIcons[card.type];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
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
        {/* Card Display */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{card.name}</h1>
                <p className="text-white/80 capitalize">{card.type} Card</p>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(card.data).map(([key, value]) => {
                if (!value) return null;

                // Determine icon based on field name
                let FieldIcon = CreditCard;
                if (key.toLowerCase().includes('email')) FieldIcon = Mail;else
                if (key.toLowerCase().includes('phone')) FieldIcon = Phone;else
                if (key.toLowerCase().includes('website') || key.toLowerCase().includes('url')) FieldIcon = Globe;else
                if (key.toLowerCase().includes('address') || key.toLowerCase().includes('venue')) FieldIcon = MapPin;else
                if (key.toLowerCase().includes('date')) FieldIcon = Calendar;

                return (
                  <div key={key} className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FieldIcon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="font-medium break-words">
                        {key.toLowerCase().includes('email') ?
                        <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
                            {value}
                          </a> :
                        key.toLowerCase().includes('phone') ?
                        <a href={`tel:${value}`} className="text-blue-600 hover:underline">
                            {value}
                          </a> :
                        (key.toLowerCase().includes('website') || key.toLowerCase().includes('url')) && value.startsWith('http') ?
                        <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {value}
                          </a> :

                        value
                        }
                      </p>
                    </div>
                  </div>);

              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Powered by <span className="font-semibold">ProfileX</span>
              </p>
              <Link
                to="/"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                
                Create Your Own Card
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>);

};