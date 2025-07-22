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
  layout?: 'horizontal' | 'vertical';
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

const FoodieProfileChart: React.FC<FoodieProfileChartProps> = ({ metrics, layout = 'horizontal' }) => {
  const data = Object.entries(metrics).map(([key, value]) => ({
    metric: key as FoodJournalMetricType,
    value,
    label: foodJournalConfig[key as FoodJournalMetricType]?.label || key,
  }));

  const characterProfile: CharacterProfile = generateCharacterProfile(metrics);

  const isHorizontal = layout === 'horizontal';
  const mainContainerClasses = isHorizontal ? "flex flex-wrap lg:flex-nowrap gap-6 w-full" : "flex flex-col gap-6 w-full";
  const profileBoxClasses = isHorizontal ? "bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full flex flex-col lg:flex-row" : "bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full flex flex-col";
  const characterSectionClasses = isHorizontal ? "flex flex-col items-center lg:w-1/3 p-4" : "flex flex-col items-center p-4";
  const chartSectionClasses = isHorizontal ? "lg:w-2/3 p-4" : "w-full p-4";
  const suggestionBoxClasses = isHorizontal ? "bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full lg:w-2/5" : "bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full";

  return (
    <div className={mainContainerClasses}>
      {/* Your Foodie Profile Box */}
      <div className={profileBoxClasses}>
        {/* Left Section: Character Image and Description */}
        <div className={characterSectionClasses}>
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
        <div className={chartSectionClasses}>
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
      <div className={suggestionBoxClasses}>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 tracking-wide">Suggested for You</h2>
        <div className="flex flex-col items-center mb-4">
          <img
            src="https://image.bnews.vn/MediaUpload/Medium/2024/11/04/eco-kv-xanh-sm-final-20241104162117.jpg"
            alt="Suggested for You"
            className="w-9/10 h-auto object-cover rounded-lg mb-2"
          />
          <h3 className="2xl font-semibold text-gray-800 mb-2"> Visa Debit Eco Card</h3>
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
