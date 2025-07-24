import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { FoodJournalMetrics } from '../../types';
import { foodJournalConfig } from '../../config/foodJournalConfig';
import type { FoodJournalMetricType } from '../../config/foodJournalConfig';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { generateCharacterProfile } from '../../data/characters';
import type { CharacterProfile } from '../../types';
import Card from '../common/Card';
import type { FoodieProfileBarChartProps } from '../../types';

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  payload?: Array<{
    value: ValueType;
    name: NameType;
    payload: { metric: FoodJournalMetricType; value: number };
  }>;
}

// Custom Tooltip for Bar Chart
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

const FoodieProfileBarChart: React.FC<FoodieProfileBarChartProps> = ({ metrics }) => {
  const data = Object.entries(metrics).map(([key, value]) => ({
    metric: key as FoodJournalMetricType,
    value,
    label: foodJournalConfig[key as FoodJournalMetricType]?.label || key,
  }));

  const characterProfile: CharacterProfile = generateCharacterProfile(metrics);

  return (
    <Card className="flex flex-row p-3 h-full"> 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* Character Profile */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide text-center">Your Foodie Profile</h2>
          <img
            src={characterProfile.image}
            alt={characterProfile.name}
            className="w-48 h-48 rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2 tracking-wide text-center">{characterProfile.name}</h3>
          <p className="text-gray-600 text-center text-base tracking-wide text-center">{characterProfile.description}</p>
        </div>

        {/* Bar Chart */}
        <div className="lg:col-span-2">
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
    </Card>
  );
};

export default FoodieProfileBarChart;