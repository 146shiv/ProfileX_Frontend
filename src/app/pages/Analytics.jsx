import React from 'react';
import { Link } from 'react-router';
import { ArrowLeft, CreditCard, Download, TrendingUp, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const COLORS = {
  vehicle: '#3B82F6',
  business: '#A855F7',
  brand: '#EC4899',
  personal: '#10B981',
  event: '#F97316',
  custom: '#6B7280'
};

export const Analytics = () => {
  const { cards } = useApp();

  // Calculate analytics
  const totalCards = cards.length;
  const totalDownloads = cards.reduce((sum, card) => sum + card.downloads, 0);
  const activeCards = cards.filter((card) => card.status === 'active').length;

  // Cards by type
  const cardsByType = cards.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(cardsByType).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: COLORS[type]
  }));

  // Downloads by card type
  const downloadsByType = cards.reduce((acc, card) => {
    acc[card.type] = (acc[card.type] || 0) + card.downloads;
    return acc;
  }, {});

  const barData = Object.entries(downloadsByType).map(([type, downloads]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    downloads
  }));

  // Recent activity (last 5 cards)
  const recentCards = [...cards].slice(0, 5);

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
              <span className="text-xl font-semibold">ProfileX Analytics</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-xl text-gray-600">Track your card performance and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Cards</p>
              <CreditCard className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-4xl font-bold mb-1">{totalCards}</p>
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              All time
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Active Cards</p>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-4xl font-bold mb-1">{activeCards}</p>
            <p className="text-sm text-gray-500">Currently active</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Total Downloads</p>
              <Download className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-4xl font-bold mb-1">{totalDownloads}</p>
            <p className="text-sm text-gray-500">QR code downloads</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Avg Downloads</p>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-4xl font-bold mb-1">
              {totalCards > 0 ? (totalDownloads / totalCards).toFixed(1) : 0}
            </p>
            <p className="text-sm text-gray-500">Per card</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Pie Chart - Cards by Type */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-6">Cards by Type</h2>
            {pieData.length > 0 ?
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value">
                  
                    {pieData.map((entry, index) =>
                  <Cell key={`cell-${index}`} fill={entry.color} />
                  )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer> :

            <div className="h-[300px] flex items-center justify-center text-gray-500">
                No data available
              </div>
            }
          </div>

          {/* Bar Chart - Downloads by Type */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold mb-6">Downloads by Card Type</h2>
            {barData.length > 0 ?
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="downloads" fill="#000000" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer> :

            <div className="h-[300px] flex items-center justify-center text-gray-500">
                No data available
              </div>
            }
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          {recentCards.length > 0 ?
          <div className="space-y-4">
              {recentCards.map((card) =>
            <div key={card.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{card.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{card.type} Card</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(card.createdAt), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1 justify-end mt-1">
                      <Download className="w-4 h-4" />
                      {card.downloads} downloads
                    </p>
                  </div>
                </div>
            )}
            </div> :

          <div className="text-center py-12 text-gray-500">
              No activity yet. Create your first card to get started!
            </div>
          }
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
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