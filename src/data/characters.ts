import type { FoodJournalMetrics } from '../types'; 
import type { CharacterProfile } from '../types';
import natureLover from '../assets/images/nature-lover.png';
import urbanExplorer from '../assets/images/urban-explorer.png';
import homeChef from '../assets/images/home-chef.png';
import wellnessAdvocate from '../assets/images/wellness-advocate.png';
import sweetTooth from '../assets/images/sweet-tooth.png';


// import natureLoverImage from '../assets/images/character-nature-lover.png';
// import urbanExplorerImage from '../assets/images/character-urban-explorer.png';
// import homeChefImage from '../assets/images/character-home-chef.png';
// import wellnessAdvocateImage from '../assets/images/character-wellness-advocate.png';
// import sweetToothImage from '../assets/images/character-sweet-tooth.png';

const characterProfiles: CharacterProfile[] = [
  {
    name: "The Nature Lover",
    image: natureLover,
    description: "A nature lover who thrives on fresh, natural ingredients and love outdoor activities.",
  },
  {
    name: "The Urban Explorer",
    image: urbanExplorer,
    description: "A connoisseur of diverse cuisines and culture, loves exploring new, exciting things.",
  },
  {
    name: "The Home Chef",
    image: homeChef,
    description: "A home person who loves house-made food and dinners in with friends.",
  },
  {
    name: "The Wellness Advocate",
    image: wellnessAdvocate,
    description: "A health-conscious person with a love for healthy recipes, fitness routines, and mindfulness practices.",
  },
  {
    name: "The Sweet Tooth",
    image: sweetTooth,
    description: "A true sweet tooth who enjoys baking and discovering sweet, new confectioneries.",
  },
];

export function generateCharacterProfile(metrics: FoodJournalMetrics): CharacterProfile {

  // Simple logic to pick a character based on dominant metric
  // This can be made more sophisticated later
  
  const sortedMetrics = Object.entries(metrics).sort(([, a], [, b]) => b - a);
  const dominantMetric = sortedMetrics[0]?.[0];

  switch (dominantMetric) {
    case 'adventurous':
      return characterProfiles[1]; // The Urban Explorer
    case 'healthy':
      return characterProfiles[3]; // The Wellness Advocate
    case 'convenient':
      return characterProfiles[2]; // The Home Chef
    case 'happy':
      return characterProfiles[4]; // The Sweet Tooth
    case 'comfort':
      return characterProfiles[0]; // The Nature Lover
    default:
      return characterProfiles[0]; // Default to Nature Lover
  }
}