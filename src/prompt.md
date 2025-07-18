you are expert frontend Developer
you follow the stack vite + typescript + tailwind
you clean code, following best practice and coding into components for easy debug

# requirement
we are a company that give user voucher for food, drink and services 
we want to gamify that user be able to find all the point of interest around the map
so that they can spend voucher in the related store, and earn point while spending money at the places

the higher the points, the larger the rewards

also, I want to have a feature for a carousel that suggest what to do/ what to eat
for user who having trouble thinking what to eat today

all data should be mock 

I want you to create me a website 
2 screen
- dashboard to track progress, reward, points, scheme, promotion
- a interactive map to show all the point of interest (react components over the map)

The theme should be friendly, flat, simple but beautiful, google material design influence
you always think deeply and following the plan file below and start implementing

# plan.md
Frontend Implementation Plan: Gamified Voucher Platform
This document outlines the strategy, architecture, and rules for building the gamified voucher and point of interest platform. Our core principles are clean code, component-based architecture for easy debugging and scalability, and a deep focus on user experience.

1. Core Philosophy & Guiding Principles
Simplicity is Key: The design will be flat, friendly, and influenced by Google's Material Design. We will prioritize clarity and intuitive navigation.
Component-Driven: We will break down every feature into small, reusable components. This approach simplifies development, testing, and maintenance.
Performance First: The application must be fast and responsive, especially the interactive map. We will optimize asset loading and rendering.
Developer Experience: A clean, well-documented codebase with a fast development environment is crucial for team productivity.
2. Tech Stack & Setup
Framework/Build Tool: Vite for its rapid development server and optimized builds.
Language: TypeScript for robust, type-safe code that prevents common errors.
Styling: Tailwind CSS for a utility-first approach that allows for rapid UI development while maintaining a consistent design system.
Mapping Library: We will use react-leaflet, a popular and lightweight library for creating interactive maps with React components.
Icons: lucide-react for a simple, beautiful, and highly consistent set of icons.
3. Project Structure
A well-organized project structure is the foundation for a scalable application.

Generated code
src/
|-- assets/              # Static assets like images, fonts
|   |-- images/
|-- components/          # Reusable UI components
|   |-- common/          # Buttons, Cards, Modals, etc.
|   |-- layout/          # Header, Sidebar, PageWrapper, etc.
|   |-- dashboard/       # Components specific to the Dashboard screen
|   |-- map/             # Components specific to the Map screen
|-- data/                # Mock data for development
|   |-- mock.ts
|-- hooks/               # Custom React hooks
|-- pages/               # Screen-level components
|   |-- Dashboard.tsx
|   |-- InteractiveMap.tsx
|-- services/            # API calls (even if mocked initially)
|-- styles/              # Global styles and Tailwind configuration
|   |-- tailwind.css
|-- types/               # TypeScript type definitions
|   |-- index.ts
|-- App.tsx              # Main application component with routing
|-- main.tsx             # Entry point of the application
Use code with caution.
4. Screen Implementation Plan
Screen 1: Dashboard
This screen provides users with an at-a-glance view of their progress and rewards.

Component Breakdown:

Dashboard.tsx (Page): The main container that assembles all dashboard components.
UserProfile.tsx: Displays the user's name and current points total.
ProgressTracker.tsx:
A visual progress bar showing the user's journey to the next reward tier.
Clearly indicates the current reward tier (e.g., "Bronze," "Silver," "Gold").
RewardScheme.tsx: A section that visually outlines the different reward tiers and the points required to unlock them. This can be a series of cards.
SuggestionCarousel.tsx:
A prominent, horizontally scrollable carousel.
Each item in the carousel will be a SuggestionCard.tsx with a background image, a title (e.g., "Craving Pizza?", "Time for Coffee"), and a call-to-action.
Promotions.tsx: A list or grid of PromotionCard.tsx components highlighting special offers.
Screen 2: Interactive Map
This screen is the core of the discovery and gamification experience.

Component Breakdown:

InteractiveMap.tsx (Page): The main container for the map and related UI elements.
MapContainer.tsx:
This component will initialize react-leaflet.
It will be responsible for setting the initial view, zoom level, and map tiles (we'll use a clean, simple map tile provider like CartoDB Positron).
PointOfInterestMarker.tsx:
These are custom React components to be rendered on the map.
Each marker will be a simple, circular icon with a category symbol (e.g., a fork and knife for food, a coffee cup for drinks).
Clicking a marker will open a popup.
StoreDetailsPopup.tsx:
A popup component triggered by clicking a marker.
It will display the store's name, the available voucher, and a button to view more details or "check-in."
5. Mock Data Structure (src/data/mock.ts)
We will define clear TypeScript interfaces for our mock data to ensure consistency.

Generated typescript
// src/types/index.ts
export interface User {
  name: string;
  points: number;
  currentTier: 'Bronze' | 'Silver' | 'Gold';
}

export interface PointOfInterest {
  id: string;
  name: string;
  category: 'Food' | 'Drink' | 'Service';
  position: [number, number]; // [latitude, longitude]
  voucher: {
    title: string;
    description: string;
  };
}

export interface Suggestion {
  id: string;
  title: string;
  imageUrl: string;
}

// src/data/mock.ts
export const MOCK_USER: User = { ... };
export const MOCK_POIs: PointOfInterest[] = [ ... ];
export const MOCK_SUGGESTIONS: Suggestion[] = [ ... ];

6. Rules for the Development Team
Code Style: All code will be automatically formatted using Prettier and checked with ESLint on every commit using a pre-commit hook (Husky). This ensures consistency and reduces noise in code reviews.
Component Design:
Components must be single-purpose. A component should do one thing and do it well.
Use props for passing data down the component tree.
Keep components stateless whenever possible. Lift state up to the nearest common ancestor.
TypeScript Usage:
Strict mode will be enabled.
Use interfaces or types for all props, API responses, and complex objects. Avoid using any.
Styling:
Strictly use Tailwind CSS utility classes.
Create custom components in tailwind.config.js for reusable styles (e.g., button variants) to maintain consistency.
File Naming: Use PascalCase for component files (e.g., ProgressBar.tsx) and camelCase for non-component files (e.g., apiClient.ts).
Data Flow: For this project's scale, we will start with React Context for managing global state like user data. This avoids the overhead of a larger state management library.

# my code
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./index.css" rel="stylesheet">
    <title>Map Vibe</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '.index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// App.tsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InteractiveMap from './pages/InteractiveMap';
import Header from './components/layout/Header';
import PageWrapper from './components/layout/PageWrapper';

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/map" element={<InteractiveMap />} />
        </Routes>
      </PageWrapper>
    </div>
  );
};

export default App;

// src/pages/Dashboard.tsx

import UserProfile from '../components/dashboard/UserProfile';
import ProgressTracker from '../components/dashboard/ProgressTracker';
import RewardScheme from '../components/dashboard/RewardScheme';
import SuggestionCarousel from '../components/dashboard/SuggestionCarousel';
import Promotions from '../components/dashboard/Promotions';
import RecentActivity from '../components/dashboard/RecentActivity';
import { MOCK_USER, MOCK_SUGGESTIONS, MOCK_PROMOTIONS, MOCK_REWARD_TIERS, MOCK_ACTIVITIES } from '../data/mock';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <UserProfile user={MOCK_USER} />
      <ProgressTracker
        currentPoints={MOCK_USER.points}
        pointsToNextTier={MOCK_USER.pointsToNextTier}
        currentTier={MOCK_USER.currentTier}
        nextTier={MOCK_USER.nextTier}
      />
      <SuggestionCarousel suggestions={MOCK_SUGGESTIONS} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Promotions promotions={MOCK_PROMOTIONS} />
            <RecentActivity activities={MOCK_ACTIVITIES} />
        </div>
        <div className="lg:col-span-1">
            <RewardScheme tiers={MOCK_REWARD_TIERS} currentTier={MOCK_USER.currentTier} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// src/pages/InteractiveMap.tsx

import { useState, useMemo } from 'react';
import MapContainer from '../components/map/MapContainer';
import MapControls from '../components/map/MapControls';
import { MOCK_POIs } from '../data/mock';
import { PointOfInterest } from '../types';
import { useGeolocation } from '../hooks/useGeolocation';

type Category = PointOfInterest['category'];

const ALL_CATEGORIES: Category[] = ['Food', 'Drink', 'Service'];

const InteractiveMap = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(ALL_CATEGORIES);
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const { isLoading, position, getPosition } = useGeolocation();

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleCenterMe = () => {
    getPosition();
  };

  if (position && (mapCenter[0] !== position[0] || mapCenter[1] !== position[1])) {
      setMapCenter(position);
  }

  const filteredPOIs = useMemo(() => {
    return MOCK_POIs.filter(poi => selectedCategories.includes(poi.category));
  }, [selectedCategories]);

  return (
    <div>
        <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Places to Earn</h1>
            <p className="text-gray-600 mb-6">Filter categories or center the map to discover new places.</p>
        </div>
        <MapControls 
            categories={ALL_CATEGORIES}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            onCenterMeClick={handleCenterMe}
            isLocating={isLoading}
        />
        <div className="h-[65vh] w-full rounded-xl shadow-lg overflow-hidden">
            <MapContainer center={mapCenter} pointsOfInterest={filteredPOIs} />
        </div>
    </div>
  );
};

export default InteractiveMap;

// src/types/index.ts

export interface User {
    name: string;
    points: number;
    currentTier: 'Bronze' | 'Silver' | 'Gold';
    nextTier: 'Silver' | 'Gold' | 'Platinum';
    pointsToNextTier: number;
  }
  
  export interface PointOfInterest {
    id: string;
    name: string;
    category: 'Food' | 'Drink' | 'Service';
    position: [number, number];
    voucher: {
      title: string;
      description: string;
    };
  }
  
  export interface Suggestion {
    id: string;
    title: string;
    imageUrl: string;
  }
  
  export interface Promotion {
    id: string;
    title: string;
    description: string;
  }
  
  export interface RewardTier {
      name: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
      points: number;
  }

  export interface Activity {
    id: string;
    storeName: string;
    description: string;
    points: number;
    date: string;
  }

// src/data/mock.ts

import { User, PointOfInterest, Suggestion, Promotion, RewardTier, Activity } from '../types';
import BurgerImg from '../assets/images/burger.jpg';
import CoffeeImg from '../assets/images/coffee.jpg';
import PizzaImg from '../assets/images/pizza.jpg';
import RamenImg from '../assets/images/ramen.jpg';

export const MOCK_USER: User = {
  name: 'Jane Doe',
  points: 1250,
  currentTier: 'Silver',
  nextTier: 'Gold',
  pointsToNextTier: 2500,
};

export const MOCK_POIs: PointOfInterest[] = [
  {
    id: 'poi-1',
    name: 'Gourmet Burger Kitchen',
    category: 'Food',
    position: [51.505, -0.09],
    voucher: { title: '2-for-1 Burgers', description: 'Buy one burger and get the second one free.' },
  },
  {
    id: 'poi-2',
    name: 'The Coffee Bean',
    category: 'Drink',
    position: [51.51, -0.1],
    voucher: { title: 'Free Pastry', description: 'Get a free pastry with any large coffee purchase.' },
  },
  {
    id: 'poi-3',
    name: 'Pizzeria Roma',
    category: 'Food',
    position: [51.515, -0.08],
    voucher: { title: '15% Off Your Bill', description: 'Enjoy a 15% discount on your total bill.' },
  },
    {
    id: 'poi-4',
    name: 'City Spa & Services',
    category: 'Service',
    position: [51.512, -0.11],
    voucher: { title: '$20 Off Massage', description: 'Relax with a $20 discount on any 60-minute massage.' },
  },
];

export const MOCK_SUGGESTIONS: Suggestion[] = [
  { id: 'sug-1', title: 'Craving a Juicy Burger?', imageUrl: BurgerImg },
  { id: 'sug-2', title: 'Time for a Coffee Break!', imageUrl: CoffeeImg },
  { id: 'sug-3', title: 'How About Pizza Tonight?', imageUrl: PizzaImg },
  { id: 'sug-4', title: 'Warm Up with Ramen!', imageUrl: RamenImg },
];

export const MOCK_PROMOTIONS: Promotion[] = [
    { id: 'promo-1', title: 'Weekend Special', description: 'Earn 2x points on all food purchases this weekend.' },
    { id: 'promo-2', title: 'Happy Hour Drinks', description: 'Get 50% off all drinks from 4 PM to 6 PM on weekdays.' },
];

export const MOCK_REWARD_TIERS: RewardTier[] = [
    { name: 'Bronze', points: 0 },
    { name: 'Silver', points: 1000 },
    { name: 'Gold', points: 2500 },
    { name: 'Platinum', points: 5000 },
];

export const MOCK_ACTIVITIES: Activity[] = [
    { id: 'act-1', storeName: 'Gourmet Burger Kitchen', description: 'Used 2-for-1 Voucher', points: 50, date: '2025-07-15' },
    { id: 'act-2', storeName: 'The Coffee Bean', description: 'Earned 2x Points', points: 30, date: '2025-07-14' },
    { id: 'act-3', storeName: 'Pizzeria Roma', description: 'Spent $25', points: 25, date: '2025-07-12' },
    { id: 'act-4', storeName: 'City Spa & Services', description: 'Welcome Bonus', points: 10, date: '2025-07-10' },
];

// src/components/map/MapContainer.tsx
import { MapContainer as LeafletMap, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PointOfInterest } from '../../types';
import PointOfInterestMarker from './PointOfInterestMarker';

// Component to handle map view changes
const MapUpdater = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
}

interface MapContainerProps {
  pointsOfInterest: PointOfInterest[];
  center: [number, number];
}

const MapContainer = ({ pointsOfInterest, center }: MapContainerProps) => {
  return (
    <LeafletMap center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <MapUpdater center={center} />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
      />
      {pointsOfInterest.map(poi => (
        <PointOfInterestMarker key={poi.id} poi={poi} />
      ))}
    </LeafletMap>
  );
};

export default MapContainer;
// src/components/map/MapControls.tsx
import { Utensils, Coffee, Gem, LocateFixed, Loader } from 'lucide-react';
import { PointOfInterest } from '../../types';

type Category = PointOfInterest['category'];

interface MapControlsProps {
  categories: Category[];
  selectedCategories: Category[];
  onCategoryChange: (category: Category) => void;
  onCenterMeClick: () => void;
  isLocating: boolean;
}

const categoryIcons: Record<Category, React.ReactElement> = {
    Food: <Utensils className="w-5 h-5 mr-2" />,
    Drink: <Coffee className="w-5 h-5 mr-2" />,
    Service: <Gem className="w-5 h-5 mr-2" />,
};

const MapControls = ({ categories, selectedCategories, onCategoryChange, onCenterMeClick, isLocating }: MapControlsProps) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
            <p className="font-semibold text-gray-700">Filter by:</p>
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`flex items-center px-4 py-2 text-sm font-semibold rounded-full border-2 transition-colors ${
                        selectedCategories.includes(category)
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                    }`}
                >
                    {categoryIcons[category]}
                    {category}
                </button>
            ))}
        </div>
        <button 
            onClick={onCenterMeClick}
            disabled={isLocating}
            className="flex items-center px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors"
        >
            {isLocating ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <LocateFixed className="w-5 h-5 mr-2" />}
            {isLocating ? 'Locating...' : 'Center on Me'}
        </button>
    </div>
  );
};

export default MapControls;

// src/components/map/PointOfInterestMarker.tsx

import { Marker } from 'react-leaflet';
import { PointOfInterest } from '../../types';
import { divIcon } from 'leaflet';
import { Utensils, Coffee, Gem } from 'lucide-react';
import { renderToString } from 'react-dom/server';
import StoreDetailsPopup from './StoreDetailsPopup';

interface PointOfInterestMarkerProps {
  poi: PointOfInterest;
}

const categoryIcons = {
    Food: <Utensils className="w-5 h-5 text-white" />,
    Drink: <Coffee className="w-5 h-5 text-white" />,
    Service: <Gem className="w-5 h-5 text-white" />
};

const PointOfInterestMarker = ({ poi }: PointOfInterestMarkerProps) => {
    const iconHtml = renderToString(
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            {categoryIcons[poi.category]}
        </div>
    );

    const customIcon = divIcon({
        html: iconHtml,
        className: 'bg-transparent border-0',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });


  return (
    <Marker position={poi.position} icon={customIcon}>
      <StoreDetailsPopup poi={poi} />
    </Marker>
  );
};

export default PointOfInterestMarker;

// src/components/map/StoreDetailsPopup.tsx

import { Popup } from 'react-leaflet';
import { PointOfInterest } from '../../types';

interface StoreDetailsPopupProps {
  poi: PointOfInterest;
}

const StoreDetailsPopup = ({ poi }: StoreDetailsPopupProps) => {
  return (
    <Popup>
      <div className="p-1">
        <h3 className="font-bold text-lg text-gray-800">{poi.name}</h3>
        <p className="text-sm text-indigo-600 font-semibold my-2">{poi.voucher.title}</p>
        <p className="text-xs text-gray-600 mb-3">{poi.voucher.description}</p>
        <button className="w-full bg-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
          View Details
        </button>
      </div>
    </Popup>
  );
};

export default StoreDetailsPopup;

# Based on my codebase, could you please enhance the map with features

# Logic: 
- Tier 1: Pick category => Think of this not as a Search function but a Filter function
  + Default to displaying all stores 
  + If a specific category is picked => Only display stores within that category 
  + Can pick more than one category at the same time (Eg: Food and Drink) => Should show stores in both Food and Drink
  + Can click on a selected category to dis-select => Do not display that category anymore
  + Have a clear category setting button to clear all category => If all categories are dis-selected, display all stores (basically go back to default mode)
- Tier 2: Pick challenge
  + Must pick category first in order to pick challenge (You can add instructional sentences for this)
  + Can only display one challenge at a time
  + Can click on the challenge image in the carousel to dis-select the challenge
- When switching between categories, challenges should be switched respectively as well
