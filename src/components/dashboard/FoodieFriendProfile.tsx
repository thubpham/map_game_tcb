import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import type { FoodieFriendProfileProps } from '../../types';
import { foodJournalConfig } from '../../config/foodJournalConfig';
import type { FoodJournalMetricType } from '../../config/foodJournalConfig';

const FoodieProfileBarChart: React.FC<FoodieProfileBarChartProps> = ({ metrics }) => {
    const data = Object.entries(metrics).map(([key, value]) => ({
      metric: key as FoodJournalMetricType,
      value,
      label: foodJournalConfig[key as FoodJournalMetricType]?.label || key,
    }));

    const FoodieFriendProfile = ({ metrics }: FoodieFriendProfileProps) => {
    return (
        // ResponsiveContainer makes the chart scale to the parent div's size
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
            data={metrics}
            layout="vertical" // Keep the vertical layout for a wide look
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" hide /> {/* Hide axis for a cleaner look if desired */}
            <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={12} />
            <Tooltip
            cursor={{ fill: '#f3f4f6' }}
            contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
            }}
            />
            <Legend />
            <Bar dataKey="value" fill="#818cf8" barSize={20} />
        </BarChart>
        </ResponsiveContainer>
    );
    };
};

export default FoodieFriendProfile;