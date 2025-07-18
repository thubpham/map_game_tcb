import type { Challenge } from "../../types";

interface ChallengeCardProps {
    challenge: Challenge;
    isSelected: boolean;
    onClick: (challengeId: string) => void;
}
  
const ChallengeCard = ({ challenge, isSelected, onClick }: ChallengeCardProps) => {
    return (
        <button
        onClick={() => onClick(challenge.id)}
        className={`
            flex-none w-64 h-36 rounded-lg overflow-hidden relative shadow-md 
            hover:shadow-lg transition-all duration-200 ease-in-out
            ${isSelected ? 'ring-4 ring-indigo-500 ring-offset-2' : ''}
            group cursor-pointer
        `}
        >
        <img
            src={challenge.imageUrl}
            alt={challenge.name}
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end text-left">
            <h3 className="text-white text-lg font-semibold leading-tight">{challenge.name}</h3>
            <p className="text-indigo-200 text-xs mt-1 truncate">{challenge.description}</p>
        </div>
        </button>
    );
};

export default ChallengeCard