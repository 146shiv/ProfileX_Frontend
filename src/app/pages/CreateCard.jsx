import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { ArrowLeft, CreditCard, Car, Briefcase, Store, User, Calendar, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const cardTypeInfo = {
  vehicle: { icon: Car, title: 'Vehicle Card', color: 'from-blue-500 to-blue-600' },
  business: { icon: Briefcase, title: 'Business Card', color: 'from-purple-500 to-purple-600' },
  brand: { icon: Store, title: 'Brand Promotion Card', color: 'from-pink-500 to-pink-600' },
  personal: { icon: User, title: 'Personal Identity Card', color: 'from-green-500 to-green-600' },
  event: { icon: Calendar, title: 'Event / Access Card', color: 'from-orange-500 to-orange-600' },
  custom: { icon: Sparkles, title: 'Custom Card', color: 'from-gray-700 to-gray-800' }
};

export const CreateCard = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { createCard } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cardType = type;
  const info = cardTypeInfo[cardType];
  const Icon = info.icon;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const card = await createCard(cardType, formData);
      if (card?.id) navigate(`/card-success/${card.id}`);
      else navigate('/card-created');
    } catch (err) {
      setError(err?.message || 'Failed to create card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (cardType) {
      case 'vehicle':
        return (
          <>
            <div>
              <label htmlFor="vehicleNumber" className="block text-sm font-medium mb-2">
                Vehicle Number *
              </label>
              <input
                id="vehicleNumber"
                type="text"
                value={formData.vehicleNumber || ''}
                onChange={(e) => handleChange('vehicleNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="ABC-1234"
                required />
              
            </div>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium mb-2">
                Owner Name *
              </label>
              <input
                id="ownerName"
                type="text"
                value={formData.ownerName || ''}
                onChange={(e) => handleChange('ownerName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="John Doe"
                required />
              
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Contact Number *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="+1 234 567 8900"
                required />
              
            </div>
            <div>
              <label htmlFor="insurance" className="block text-sm font-medium mb-2">
                Insurance Provider
              </label>
              <input
                id="insurance"
                type="text"
                value={formData.insurance || ''}
                onChange={(e) => handleChange('insurance', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Insurance Company Name" />
              
            </div>
            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-medium mb-2">
                Registration Number *
              </label>
              <input
                id="registrationNumber"
                type="text"
                value={formData.registrationNumber || ''}
                onChange={(e) => handleChange('registrationNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="DL-01-AB-1234"
                required />
            </div>
            <div>
              <label htmlFor="vehicleModel" className="block text-sm font-medium mb-2">
                Vehicle Model / Type
              </label>
              <input
                id="vehicleModel"
                type="text"
                value={formData.vehicleModel || ''}
                onChange={(e) => handleChange('vehicleModel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Tesla Model 3" />
            </div>
          </>);


      case 'business':
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="John Doe"
                required />
              
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2">
                Job Title *
              </label>
              <input
                id="role"
                type="text"
                value={formData.role || ''}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="CEO & Founder"
                required />
              
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Company Name *
              </label>
              <input
                id="company"
                type="text"
                value={formData.company || ''}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Acme Inc."
                required />
              
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="john@acme.com"
                required />
              
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="+1 234 567 8900"
                required />
              
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-2">
                Website
              </label>
              <input
                id="website"
                type="url"
                value={formData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="https://acme.com" />
              
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium mb-2">
                LinkedIn Profile
              </label>
              <input
                id="linkedin"
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="https://linkedin.com/in/johndoe" />
              
            </div>
          </>);


      case 'brand':
        return (
          <>
            <div>
              <label htmlFor="brandName" className="block text-sm font-medium mb-2">
                Brand Name *
              </label>
              <input
                id="brandName"
                type="text"
                value={formData.brandName || ''}
                onChange={(e) => handleChange('brandName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Your Brand"
                required />
              
            </div>
            <div>
              <label htmlFor="tagline" className="block text-sm font-medium mb-2">
                Tagline *
              </label>
              <input
                id="tagline"
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Your brand's tagline"
                required />
              
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none min-h-[100px]"
                placeholder="Tell us about your brand..."
                required />
              
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-2">
                Website URL *
              </label>
              <input
                id="website"
                type="url"
                value={formData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="https://yourbrand.com"
                required />
              
            </div>
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium mb-2">
                Instagram
              </label>
              <input
                id="instagram"
                type="text"
                value={formData.instagram || ''}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="@yourbrand" />
              
            </div>
            <div>
              <label htmlFor="cta" className="block text-sm font-medium mb-2">
                Call to Action
              </label>
              <input
                id="cta"
                type="text"
                value={formData.cta || ''}
                onChange={(e) => handleChange('cta', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Shop Now, Learn More, etc." />
              
            </div>
          </>);


      case 'personal':
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="John Doe"
                required />
              
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="john@example.com"
                required />
              
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="+1 234 567 8900"
                required />
              
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio || ''}
                onChange={(e) => handleChange('bio', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none min-h-[100px]"
                placeholder="A brief description about yourself..." />
              
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Address
              </label>
              <input
                id="address"
                type="text"
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="123 Main St, City, Country" />
              
            </div>
          </>);


      case 'event':
        return (
          <>
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium mb-2">
                Event Name *
              </label>
              <input
                id="eventName"
                type="text"
                value={formData.eventName || ''}
                onChange={(e) => handleChange('eventName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Annual Conference 2026"
                required />
              
            </div>
            <div>
              <label htmlFor="attendeeName" className="block text-sm font-medium mb-2">
                Attendee Name *
              </label>
              <input
                id="attendeeName"
                type="text"
                value={formData.attendeeName || ''}
                onChange={(e) => handleChange('attendeeName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="John Doe"
                required />
              
            </div>
            <div>
              <label htmlFor="ticketType" className="block text-sm font-medium mb-2">
                Ticket Type *
              </label>
              <select
                id="ticketType"
                value={formData.ticketType || ''}
                onChange={(e) => handleChange('ticketType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                required>
                
                <option value="">Select ticket type</option>
                <option value="vip">VIP Pass</option>
                <option value="general">General Admission</option>
                <option value="speaker">Speaker Pass</option>
                <option value="staff">Staff Access</option>
              </select>
            </div>
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium mb-2">
                Event Date *
              </label>
              <input
                id="eventDate"
                type="date"
                value={formData.eventDate || ''}
                onChange={(e) => handleChange('eventDate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                required />
              
            </div>
            <div>
              <label htmlFor="venue" className="block text-sm font-medium mb-2">
                Venue *
              </label>
              <input
                id="venue"
                type="text"
                value={formData.venue || ''}
                onChange={(e) => handleChange('venue', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Convention Center, New York"
                required />
              
            </div>
          </>);


      case 'custom':
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Card Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="My Custom Card"
                required />
              
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Card title"
                required />
              
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none min-h-[100px]"
                placeholder="Additional information..." />
              
            </div>
            <div>
              <label htmlFor="field1" className="block text-sm font-medium mb-2">
                Custom Field 1
              </label>
              <input
                id="field1"
                type="text"
                value={formData.field1 || ''}
                onChange={(e) => handleChange('field1', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Custom value" />
              
            </div>
            <div>
              <label htmlFor="field2" className="block text-sm font-medium mb-2">
                Custom Field 2
              </label>
              <input
                id="field2"
                type="text"
                value={formData.field2 || ''}
                onChange={(e) => handleChange('field2', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Custom value" />
              
            </div>
          </>);


      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/new-card"
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Card Type Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{info.title}</h1>
              <p className="text-gray-600">Fill in the details below</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-black h-2 rounded-full transition-all" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderForm()}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            <div className="flex gap-4 pt-4">
              <Link
                to="/new-card"
                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-center font-medium">
                
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2">
                
                {loading ?
                'Creating...' :

                <>
                    <Check className="w-5 h-5" />
                    Create Card
                  </>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>);

};