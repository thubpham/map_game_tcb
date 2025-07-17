// src/components/dashboard/RecentActivity.tsx
import React from 'react';

interface RecentActivityProps {
  activities: any[]; // Define a proper type for activities later
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div>
      <h2>Recent Activity</h2>
      {/* Render your activities here */}
      {activities.length === 0 ? (
        <p>No recent activities.</p>
      ) : (
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>{activity.description}</li> // Adjust based on your activity structure
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;


{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}