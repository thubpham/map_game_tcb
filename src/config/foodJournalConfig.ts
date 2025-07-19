import { Mountain, Leaf, Smile, Compass, Soup } from 'lucide-react';

// Defines the visual and descriptive properties for each food journal metric.
export const foodJournalConfig = {
  adventurous: {
    label: 'Adventurous',
    Icon: Mountain,
    color: '#F97316', // orange-500
    description: "You're eager to try new and exciting flavors!",
  },
  healthy: {
    label: 'Healthy',
    Icon: Leaf,
    color: '#22C55E', // green-500
    description: 'You prioritize nutritious and wholesome choices.',
  },
  happy: {
    label: 'Happy',
    Icon: Smile,
    color: '#FACC15', // yellow-400
    description: 'This food brings a smile to your face.',
  },
  exploratory: {
    label: 'Exploratory',
    Icon: Compass,
    color: '#3B82F6', // blue-500
    description: 'You love discovering new restaurants and cuisines.',
  },
  comfort: {
    label: 'Comfort',
    Icon: Soup,
    color: '#8B5CF6', // violet-500
    description: 'You enjoy cozy, familiar, and heartwarming food.',
  },
};

export type FoodJournalMetricType = keyof typeof foodJournalConfig;