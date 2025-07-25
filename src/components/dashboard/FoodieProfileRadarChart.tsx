// FoodieProfileRadarChart.tsx
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { FoodJournalMetrics } from '../../types';
import { foodJournalConfig } from '../../config/foodJournalConfig';
import type { FoodJournalMetricType } from '../../config/foodJournalConfig';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { generateCharacterProfile } from '../../data/characters';
import type { CharacterProfile } from '../../types';
import Card from '../common/Card';

interface FoodieProfileRadarChartProps {
  metrics: FoodJournalMetrics;
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

const FoodieProfileRadarChart: React.FC<FoodieProfileRadarChartProps> = ({ metrics }) => {
  // Data prepared for the Radar Chart
  const data = Object.entries(metrics).map(([key, value]) => ({
    metric: key as FoodJournalMetricType,
    value,
    subject: foodJournalConfig[key as FoodJournalMetricType]?.label || key,
  }));

  const characterProfile: CharacterProfile = generateCharacterProfile(metrics);

  // Calculate the maximum value for the chart's radial axis
  const maxValue = Math.max(...Object.values(metrics));
  const chartMax = Math.max(100, maxValue + 10);

  return (
    <Card className="flex flex-row p-3 h-full"> 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start w-full">

        {/* Character Profile Section (Unchanged) */}
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

        {/* Chart Section (Replaced with Radar Chart) */}
        <div className="lg:col-span-2">
          <div className="h-96">
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
                stroke="#D97706"
                fill="#D97706"
                fillOpacity={0.6}
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: '#B45309',
                  stroke: '#FFFFFF',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: '#92400E',
                  stroke: '#FFFFFF',
                  strokeWidth: 2,
                }}
              />
              <Tooltip content={<CustomRadarTooltip />} />
            </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FoodieProfileRadarChart;