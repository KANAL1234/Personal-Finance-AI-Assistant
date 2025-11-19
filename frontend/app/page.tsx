'use client';

import { useEffect, useState } from 'react';
import Upload from '../components/Upload';
import ForecastChart from '../components/ForecastChart';
import api from '../lib/api';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';

export default function Home() {
  const [forecastData, setForecastData] = useState<any>(null);
  const [ocrText, setOcrText] = useState<string>('');
  const [loadingForecast, setLoadingForecast] = useState(true);

  useEffect(() => {
    // Fetch initial forecast with dummy data (since we don't have real transactions yet)
    const fetchForecast = async () => {
      try {
        // Generate some dummy history for the forecast
        const history = Array.from({ length: 60 }, (_, i) => ({
          date: new Date(Date.now() - (59 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          amount: Math.random() * 100 + 20
        }));

        const response = await api.post('/forecast', { history, days: 30 });
        setForecastData(response.data);
      } catch (error) {
        console.error('Failed to fetch forecast:', error);
      } finally {
        setLoadingForecast(false);
      }
    };

    fetchForecast();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Finance AI</h1>
        </div>
        <div className="flex gap-4">
          <button className="text-sm font-medium text-gray-600 hover:text-blue-600">Dashboard</button>
          <button className="text-sm font-medium text-gray-600 hover:text-blue-600">Transactions</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Total Balance</p>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold">$12,450.00</span>
              <span className="text-green-500 text-sm flex items-center font-medium mb-1">
                <ArrowUpRight className="w-4 h-4" /> +2.5%
              </span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Monthly Spending</p>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold">$3,200.00</span>
              <span className="text-red-500 text-sm flex items-center font-medium mb-1">
                <ArrowDownRight className="w-4 h-4" /> +12%
              </span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium">Forecast (30 Days)</p>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold">
                {forecastData ? `$${Math.round(forecastData.forecast_total).toLocaleString()}` : '...'}
              </span>
              <span className="text-gray-400 text-sm mb-1">Predicted</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Upload & OCR */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Upload Statement</h2>
              <Upload onUploadComplete={setOcrText} />
            </div>

            {ocrText && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-lg font-semibold mb-4">Extracted Text</h2>
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 max-h-60 overflow-y-auto whitespace-pre-wrap font-mono border border-gray-200">
                  {ocrText}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Forecast Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
              <h2 className="text-lg font-semibold mb-6">Spending Forecast</h2>
              {loadingForecast ? (
                <div className="h-64 flex items-center justify-center text-gray-400">Loading forecast...</div>
              ) : (
                <ForecastChart data={forecastData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
