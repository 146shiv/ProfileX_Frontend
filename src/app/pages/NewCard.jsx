import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Car, Briefcase, Store, User, Calendar, Sparkles, ArrowLeft, CreditCard } from 'lucide-react';

const cardTypes = [
{
  id: 'vehicle',
  icon: Car,
  title: 'Vehicle Card',
  description: 'Vehicle number, owner details, insurance information',
  color: 'from-blue-500 to-blue-600'
},
{
  id: 'business',
  icon: Briefcase,
  title: 'Business Card',
  description: 'Name, role, company, contact details, social links',
  color: 'from-purple-500 to-purple-600'
},
{
  id: 'brand',
  icon: Store,
  title: 'Brand Promotion Card',
  description: 'Brand name, description, social links, call-to-action',
  color: 'from-pink-500 to-pink-600'
},
{
  id: 'personal',
  icon: User,
  title: 'Personal Identity Card',
  description: 'Personal information, contact details, bio',
  color: 'from-green-500 to-green-600'
},
{
  id: 'event',
  icon: Calendar,
  title: 'Event / Access Card',
  description: 'Event details, access pass, ticket information',
  color: 'from-orange-500 to-orange-600'
},
{
  id: 'custom',
  icon: Sparkles,
  title: 'Custom Card',
  description: 'Build your own custom card with flexible fields',
  color: 'from-gray-700 to-gray-800'
}];


export const NewCard = () => {
  const navigate = useNavigate();

  const handleSelectCard = (cardId) => {
    navigate(`/create-card/${cardId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">ProfileX</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Card Type</h1>
          <p className="text-xl text-gray-600">Select the type of card you want to create</p>
        </div>

        {/* Card Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cardTypes.map((cardType) => {
            const Icon = cardType.icon;
            return (
              <button
                key={cardType.id}
                onClick={() => handleSelectCard(cardType.id)}
                className="group text-left bg-white rounded-xl border-2 border-gray-200 hover:border-black transition-all p-6 hover:shadow-xl">
                
                <div className={`w-14 h-14 bg-gradient-to-br ${cardType.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{cardType.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{cardType.description}</p>
                <div className="flex items-center text-sm font-medium text-black">
                  Create This Card
                  <span className="ml-2 group-hover:ml-4 transition-all">→</span>
                </div>
              </button>);

          })}
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>);

};