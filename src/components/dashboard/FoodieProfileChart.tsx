import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { FoodJournalMetrics } from '../../types';
import { foodJournalConfig } from '../../config/foodJournalConfig';
import type { FoodJournalMetricType } from '../../config/foodJournalConfig';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { generateCharacterProfile } from '../../data/characters';
import type { CharacterProfile } from '../../types';

interface FoodieProfileChartProps {
  metrics: FoodJournalMetrics;
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  payload?: Array<{
    value: ValueType;
    name: NameType;
    payload: { metric: FoodJournalMetricType; value: number };
  }>;
}

// Custom Tooltip for Bar Chart - No changes needed here.
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

const FoodieProfileChart: React.FC<FoodieProfileChartProps> = ({ metrics }) => {
  const data = Object.entries(metrics).map(([key, value]) => ({
    metric: key as FoodJournalMetricType,
    value,
    // Add the label from config directly to the data for easier access
    label: foodJournalConfig[key as FoodJournalMetricType]?.label || key,
  }));

  const characterProfile: CharacterProfile = generateCharacterProfile(metrics);

  return (
    // CHAIN_OF_THOUGHTS:
    // The main container is a flexbox. The user wants to change the width of the chart and the "Suggested for you" box.
    // Original widths were lg:w-2/3 for the chart and lg:w-1/3 for the suggestion.
    // To give the suggestion box more space, I will change the proportions.
    // A 50/50 split (lg:w-1/2 for both) is a good starting point. I'll make the chart slightly larger, so I'll use lg:w-3/5 and lg:w-2/5.
    // This makes the "Suggested for You" box larger than before, as requested.
    <div className="flex flex-wrap lg:flex-nowrap gap-6 w-full">
      {/* Your Foodie Profile Box */}
      {/* CHAIN_OF_THOUGHTS: Adjusting width from lg:w-2/3 to lg:w-3/5 */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full flex flex-col lg:flex-row">
        {/* Left Section: Character Image and Description */}
        <div className="flex flex-col items-center lg:w-1/3 p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide text-center">Your Foodie Profile</h2>
          <img
            src={characterProfile.image}
            alt={characterProfile.name}
            className="w-48 h-48 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{characterProfile.name}</h3>
          <p className="text-gray-600 text-center text-base">{characterProfile.description}</p>
        </div>

        {/* Right Section: Bar Chart */}
        <div className="lg:w-2/3 p-4">
          {/* CHAIN_OF_THOUGHTS: Removed the title from here as the main title is sufficient */}
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 10,
                }}
              >
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
                <YAxis
                  dataKey="label"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  width={100}
                  tick={{ fill: '#4B5563', fontWeight: 'bold', fontSize: '14px' }}
                />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  hide
                />
                <Bar
                  dataKey="value"
                  barSize={40}
                  animationBegin={100}
                  radius={[0, 10, 10, 0]}
                >
                  {data.map((entry) => (
                    <Cell
                      key={`cell-${entry.metric}`}
                      fill={foodJournalConfig[entry.metric]?.color || '#6366F1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Suggested for You Box */}
      {/* CHAIN_OF_THOUGHTS: Adjusting width from lg:w-1/3 to lg:w-2/5 to make it larger */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full lg:w-2/5">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-wide">Suggested for You</h2>
        <div className="flex flex-col items-center mb-4">
          <img
            src="https://image.bnews.vn/MediaUpload/Medium/2024/11/04/eco-kv-xanh-sm-final-20241104162117.jpg"
            alt="Suggested for You"
            className="w-9/10 h-auto object-cover rounded-lg mb-2"
          />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2"> Visa Debit Eco Card</h3>
          <p className="text-gray-600 text-center text-lg mb-4">
            Discover new and exciting food experiences tailored just for you based on your foodie profile.
          </p>
          <button className="mt-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Discover Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodieProfileChart;
