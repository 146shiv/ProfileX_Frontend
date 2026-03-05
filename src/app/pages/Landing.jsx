import React from 'react';
import { Link } from 'react-router';
import { CreditCard, QrCode, LayoutDashboard, Download, Shield, ArrowRight, Car, Briefcase, Store, User, Calendar, Sparkles } from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">ProfileX</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-700 hover:text-black transition-colors">
              
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm mb-6">
              ✨ Next-Gen Digital Cards Platform
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              One Platform.<br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Multiple Smart Cards.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create professional digital cards with QR codes for vehicles, businesses, brands, and more. Share instantly, manage centrally.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-lg">
                
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-lg">
                
                Login
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1728044849347-ea6ff59d98dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkaWdpdGFsJTIwYnVzaW5lc3MlMjBjYXJkcyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMDM0NDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Digital Cards"
                className="w-full h-full object-cover" />
              
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-2xl shadow-xl p-4 hidden lg:flex items-center justify-center">
              <QrCode className="w-16 h-16" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why ProfileX?</h2>
            <p className="text-xl text-gray-600">Everything you need to manage your digital identity</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
            {
              icon: <CreditCard className="w-8 h-8" />,
              title: 'Multiple Card Types',
              description: 'Create cards for vehicles, businesses, brands, events, and more.'
            },
            {
              icon: <QrCode className="w-8 h-8" />,
              title: 'QR-Based Sharing',
              description: 'Every card gets a unique QR code for instant sharing and scanning.'
            },
            {
              icon: <LayoutDashboard className="w-8 h-8" />,
              title: 'Centralized Management',
              description: 'Manage all your cards from one beautiful dashboard.'
            },
            {
              icon: <Download className="w-8 h-8" />,
              title: 'Instant Downloads',
              description: 'Download your QR codes in high quality with one click.'
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: 'Secure & Cloud-Based',
              description: 'Your cards are safely stored and accessible from anywhere.'
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: 'Beautiful Design',
              description: 'Professional, modern design that makes a great impression.'
            }].
            map((benefit, index) =>
            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg">
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Card Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Create Any Type of Card</h2>
            <p className="text-xl text-gray-600">Versatile platform for all your needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
            { icon: <Car className="w-6 h-6" />, title: 'Vehicle Card', description: 'Registration, insurance, owner details' },
            { icon: <Briefcase className="w-6 h-6" />, title: 'Business Card', description: 'Professional contact & portfolio' },
            { icon: <Store className="w-6 h-6" />, title: 'Brand Promotion', description: 'Marketing & social links' },
            { icon: <User className="w-6 h-6" />, title: 'Personal ID', description: 'Digital identity card' },
            { icon: <Calendar className="w-6 h-6" />, title: 'Event Access', description: 'Event passes & tickets' },
            { icon: <Sparkles className="w-6 h-6" />, title: 'Custom Card', description: 'Build your own' }].
            map((cardType, index) =>
            <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                  {cardType.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{cardType.title}</h3>
                <p className="text-gray-600 text-sm">{cardType.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in minutes</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
            { step: '01', title: 'Sign Up', description: 'Create your free account in seconds' },
            { step: '02', title: 'Choose Card Type', description: 'Select from multiple card categories' },
            { step: '03', title: 'Fill Details', description: 'Add your information with our simple form' },
            { step: '04', title: 'Download & Share', description: 'Get your QR code and start sharing' }].
            map((step, index) =>
            <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-black text-white rounded-2xl p-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands creating professional digital cards
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold">
              
              Create Your First Card
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">ProfileX</span>
            </div>
            <p className="text-gray-600 text-sm">© 2026 ProfileX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);

};