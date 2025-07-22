import { Mountain, Leaf, Smile, Compass, Soup } from 'lucide-react';

// Defines the visual and descriptive properties for each food journal metric.
export const foodJournalConfig = {
  adventurous: {
    label: 'Adventurous',
    Icon: Mountain,
    color: '#F97316', // orange-500
    description: "You're eager to try new and exciting flavors from many different cuisines!",
  },
  healthy: {
    label: 'Healthy',
    Icon: Leaf,
    color: '#22C55E', // green-500
    description: 'You prioritize nutritious and wholesome choices.',
  },
  convenient: {
    label: 'Convenient',
    Icon: Smile,
    color: '#FACC15', // yellow-400
    description: 'You are all about quick grabs!',
  },
  happy: {
    label: 'Happy',
    Icon: Compass,
    color: '#3B82F6', // blue-500
    description: 'You love snacks that can be shared with friends!',
  },
  comfort: {
    label: 'Comfort',
    Icon: Soup,
    color: '#8B5CF6', // violet-500
    description: 'You enjoy cozy, familiar, and heartwarming food.',
  },
};

export type FoodJournalMetricType = keyof typeof foodJournalConfig;