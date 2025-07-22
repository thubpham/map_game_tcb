import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { FoodJournalMetrics } from '../../types';
import { foodJournalConfig } from '../../config/foodJournalConfig';
import type { FoodJournalMetricType } from '../../config/foodJournalConfig';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { generateCharacterProfile } from '../../data/characters';
import type { CharacterProfile } from '../../types';

interface FlavorProfileChartProps {
  metrics: FoodJournalMetrics;
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  payload?: Array<{
    value: ValueType;
    name: NameType;
    payload: { metric: FoodJournalMetricType };
  }>;
}

// Custom Tooltip, now styled for a light theme
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
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

  const characterProfile: CharacterProfile = generateCharacterProfile(metrics);

  console.log(characterProfile)
  console.log("metric")
  console.log(metrics)

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-6 w-full">
      {/*
      // Flavor Profile Chart Box
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full lg:w-1/3">
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

                  // Use our light-themed tooltip
                  <Tooltip 
                    content={<CustomTooltip />} 
                    cursor={{ stroke: '#4F46E5', strokeWidth: 1.5, strokeDasharray: '4 4' }} 
                  />
              </RadarChart>
              </ResponsiveContainer>
        </div>
      </div>

      // Character Profile Box
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full lg:w-1/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-wide">Character Profile</h2>
        <div className="flex flex-col items-center mb-8">
          <img 
            src={characterProfile.image} 
            alt={characterProfile.name} 
            className="w-64 h-64 rounded-full object-cover mb-6" 
          />
          <h3 className="text-2xl font-semibold text-gray-800">{characterProfile.name}</h3>
        </div>
        <p className="text-gray-600 text-center text-lg mb-4">{characterProfile.description}</p>
      </div>
      */}

      {/* New Box */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full lg:w-1/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-wide">Suggested for You</h2>
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://image.bnews.vn/MediaUpload/Medium/2024/11/04/eco-kv-xanh-sm-final-20241104162117.jpg"
            alt="Suggested for You"
            className="w-full h-full object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold text-gray-800 mb-6"> Visa Debit Eco Card</h3>
          <p className="text-gray-600 text-center text-lg mb-8">
            Discover new and exciting food experiences tailored just for you based on your flavor profile and recent activities.
          </p>
          <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Discover Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlavorProfileChart;