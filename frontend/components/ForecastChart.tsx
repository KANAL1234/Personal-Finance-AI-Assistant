'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ForecastData {
    daily_breakdown: number[];
    forecast_total: number;
}

export default function ForecastChart({ data }: { data: ForecastData }) {
    if (!data || !data.daily_breakdown) return null;

    const chartData = data.daily_breakdown.map((amount, index) => ({
        day: `Day ${index + 1}`,
        amount: Math.round(amount),
    }));

    return (
        <div className="w-full h-64 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">30-Day Spending Forecast</h3>
            <div className="text-2xl font-bold text-blue-600 mb-2">
                ${data.forecast_total.toLocaleString()}
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" hide />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
