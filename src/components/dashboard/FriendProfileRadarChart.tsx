import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { FoodJournalMetrics } from '../../types';
import { foodJournalConfig } from '../../config/foodJournalConfig';
import type { FoodJournalMetricType } from '../../config/foodJournalConfig';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { generateCharacterProfile } from '../../data/characters';
import type { CharacterProfile } from '../../types';

interface FriendProfileRadarChartProps {
  metrics: FoodJournalMetrics;
  friendName: string;
}

interface CustomRadarTooltipProps extends TooltipProps<ValueType, NameType> {
  payload?: Array<{
    value: ValueType;
    name: NameType;
    payload: { metric: FoodJournalMetricType; value: number; fullLabel: string };
  }>;
}

// Custom Tooltip for Radar Chart
const CustomRadarTooltip = ({ active, payload }: CustomRadarTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const metricKey = data.metric as FoodJournalMetricType;
    const config = foodJournalConfig[metricKey];
    const value = data.value;

    if (!config) return null;

    return (
      <div className="p-4 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl space-y-3 max-w-xs">
        <div className="flex items-center space-x-3">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: config.color }}
          />
          <p className="font-bold text-lg text-gray-900" style={{ color: config.color }}>
            {config.label}
          </p>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{config.description}</p>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-500">Score</span>
          <span className="font-mono text-xl font-bold text-gray-800">{value}/100</span>
        </div>
      </div>
    );
  }

  return null;
};

const FriendProfileRadarChart: React.FC<FriendProfileRadarChartProps> = ({ metrics, friendName }) => {
  const data = Object.entries(metrics).map(([key, value]) => ({
    metric: key as FoodJournalMetricType,
    value,
    fullLabel: foodJournalConfig[key as FoodJournalMetricType]?.label || key,
    subject: foodJournalConfig[key as FoodJournalMetricType]?.label || key,
  }));

  const characterProfile: CharacterProfile = generateCharacterProfile(metrics);

  // Calculate the maximum value for better scaling
  const maxValue = Math.max(...Object.values(metrics));
  const chartMax = Math.max(100, maxValue + 10);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-xl p-6 space-y-6 border border-gray-200/50 shadow-sm">
      {/* Header */}
      <div className="text-center border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {friendName}'s Food Profile
        </h2>
        <p className="text-sm text-gray-500">{characterProfile.name}</p>
      </div>

      {/* Character Profile - Compact Version */}
      <div className="flex justify-center items-center">
    <img
      src={characterProfile.image}
      alt={characterProfile.name}
      className="w-64 h-64 rounded-full object-cover border-2 border-white shadow-sm"
    />
    </div>

      {/* Radar Chart */}
      <div className="relative">
        <div className="h-80 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
          <RadarChart
              cx="50%"
              cy="50%"
              outerRadius="80%"
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <PolarGrid
                stroke="#E5E7EB"
                strokeWidth={1}
                radialLines={false} // Hide radial lines for a cleaner look
              />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fill: '#374151'
                }}
                className="text-gray-700"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, chartMax]}
                tick={false} // Hide the numerical ticks
                axisLine={false} // Hide the axis line
              />
              <Radar
                name="Metrics"
                dataKey="value"
                stroke="#818CF8"
                fill="#818CF8"
                fillOpacity={0.6}
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: '#4F46E5',
                  stroke: '#FFFFFF',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: '#4338CA',
                  stroke: '#FFFFFF',
                  strokeWidth: 2,
                }}
              />
              <Tooltip content={<CustomRadarTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-full p-3 border border-gray-200/50 shadow-sm">
            <div className="text-lg font-bold text-gray-800">
              {Math.round(Object.values(metrics).reduce((a, b) => a + b, 0) / Object.values(metrics).length)}
            </div>
            <div className="text-xs text-gray-500 font-medium">Average</div>
          </div>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-5 gap-2 pt-4 border-t border-gray-100">
        {data.map((entry) => {
          const config = foodJournalConfig[entry.metric];
          const isHighest = entry.value === Math.max(...data.map(d => d.value));
          return (
            <div key={entry.metric} className={`text-center p-2 rounded-lg transition-all ${
              isHighest ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50/50'
            }`}>
              <div className="flex justify-center mb-2">
                <config.Icon 
                  size={16} 
                  color={isHighest ? '#4F46E5' : config.color}
                />
              </div>
              <div className={`text-lg font-bold ${isHighest ? 'text-indigo-600' : 'text-gray-800'}`}>
                {entry.value}
              </div>
              <div className="text-xs text-gray-500 font-medium truncate">
                {config.label}
              </div>
              {isHighest && (
                <div className="text-xs text-indigo-600 font-semibold mt-1">
                  Strongest
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendProfileRadarChart;