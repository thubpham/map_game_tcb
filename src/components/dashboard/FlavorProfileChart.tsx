import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import type { FoodJournalMetrics } from '../../types';
import { foodJournalConfig, FoodJournalMetricType } from '../../config/foodJournalConfig';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface FlavorProfileChartProps {
  metrics: FoodJournalMetrics;
}

// Custom Tooltip, now styled for a light theme
const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const metricKey = payload[0].payload.metric as FoodJournalMetricType;
    const config = foodJournalConfig[metricKey];
    const value = payload[0].value;

    if (!config) return null;

    return (
      <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-lg space-y-2">
        <div className="flex items-center space-x-2">
          <config.Icon size={20} color={config.color} />
          <p className="font-bold text-lg text-gray-900" style={{ color: config.color }}>{config.label}</p>
        </div>
        <p className="text-sm text-gray-600">{config.description}</p>
        <p className="text-right font-mono text-xl text-gray-800">{value} / 100</p>
      </div>
    );
  }

  return null;
};

// Custom Axis Tick to render both Icon and Label
const CustomAxisTick = ({ payload, x, y, cx, cy, ...rest }: any) => {
    const config = foodJournalConfig[payload.value as FoodJournalMetricType];
    if (!config) return null;

    // Adjust positioning to push labels further from the center
    const xOffset = (x - cx) * 0.15;
    const yOffset = (y - cy) * 0.15;

    return (
        <g transform={`translate(${x + xOffset},${y + yOffset})`}>
            <foreignObject x={-24} y={-24} width={48} height={48}>
                 <div className="flex flex-col items-center justify-center text-center">
                    <config.Icon size={24} color={config.color} />
                 </div>
            </foreignObject>
            <text
                x={0}
                y={20} // Position the text below the icon
                textAnchor="middle"
                fill="#4B5563" // gray-600
                className="text-xs font-semibold tracking-wide"
            >
                {config.label}
            </text>
        </g>
    );
};


const FlavorProfileChart: React.FC<FlavorProfileChartProps> = ({ metrics }) => {
  const data = Object.entries(metrics).map(([key, value]) => ({
    metric: key as FoodJournalMetricType,
    value,
    fullMark: 100,
  }));

  return (
    // Card styling updated for a clean, white background
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-wide">Flavor Profile</h2>
        <p className="text-gray-500 mb-4">A visual summary of dining habits.</p>
        <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="#E5E7EB" />
                
                <PolarAngleAxis 
                    dataKey="metric" 
                    tick={<CustomAxisTick />} 
                />
                <Radar
                    name="User"
                    dataKey="value"
                    stroke="#4F46E5" // indigo-600 for a strong outline
                    fill="#6366F1"   // indigo-500 for the fill
                    fillOpacity={0.22}
                    animationBegin={100}
                />

                {/* Use our light-themed tooltip */}
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ stroke: '#4F46E5', strokeWidth: 1.5, strokeDasharray: '4 4' }} 
                />
            </RadarChart>
            </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FlavorProfileChart;