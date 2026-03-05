import React from 'react';
import { Link, useNavigate } from 'react-router';
import { Plus, Download, LogOut, CreditCard, BarChart3, Calendar, Car, Briefcase, Store, User as UserIcon, Sparkles, Trash2, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

const cardTypeIcons = {
  vehicle: Car,
  business: Briefcase,
  brand: Store,
  personal: UserIcon,
  event: Calendar,
  custom: Sparkles
};

export const Dashboard = () => {
  const { user, cards, logout, getLatestCard, deleteCard, incrementDownload } = useApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDownloadLatest = () => {
    const latestCard = getLatestCard();
    if (latestCard) {
      incrementDownload(latestCard.id);
      navigate(`/card-success/${latestCard.id}`);
    }
  };

  const handleDeleteCard = async (id) => {
    if (confirm('Are you sure you want to delete this card?')) {
      await deleteCard(id);
    }
  };

  const totalDownloads = cards.reduce((sum, card) => sum + card.downloads, 0);
  const activeCards = cards.filter((card) => card.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">ProfileX</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleDownloadLatest}
                disabled={cards.length === 0}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                
                <Download className="w-4 h-4" />
                Download Latest
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Logout">
                  
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-gray-600">Manage your digital cards and track analytics</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Cards</p>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold">{cards.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Active Cards</p>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-3xl font-bold">{activeCards}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Downloads</p>
              <Download className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-3xl font-bold">{totalDownloads}</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Analytics</p>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <Link to="/analytics" className="text-sm text-black hover:underline font-medium">
              View Details →
            </Link>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/new-card"
            className="flex items-center justify-center gap-3 p-6 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
            
            <Plus className="w-6 h-6" />
            <span className="text-lg font-semibold">Create New Card</span>
          </Link>
          <button
            onClick={handleDownloadLatest}
            disabled={cards.length === 0}
            className="flex items-center justify-center gap-3 p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            
            <Download className="w-6 h-6" />
            <span className="text-lg font-semibold">Download Latest Card</span>
          </button>
        </div>

        {/* Cards Management */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Cards</h2>
            <Link to="/analytics" className="text-sm text-gray-600 hover:text-black transition-colors">
              View Analytics →
            </Link>
          </div>

          {cards.length === 0 ?
          <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No cards yet</h3>
              <p className="text-gray-600 mb-6">Create your first card to get started</p>
              <Link
              to="/new-card"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              
                <Plus className="w-5 h-5" />
                Create Card
              </Link>
            </div> :

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((card) => {
              const Icon = cardTypeIcons[card.type];
              return (
                <div key={card.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all hover:shadow-md">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{card.name}</h3>
                          <p className="text-xs text-gray-600 capitalize">{card.type} Card</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                    card.status === 'active' ?
                    'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'}`
                    }>
                        {card.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Created</span>
                        <span>{format(new Date(card.createdAt), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Downloads</span>
                        <span>{card.downloads}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                      to={`/card-success/${card.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                      
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                      <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                      title="Delete">
                      
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>);

            })}
            </div>
          }
        </div>
      </div>
    </div>);

};