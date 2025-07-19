import { create } from 'zustand';

interface ChallengeStore {
  activeChallengeId: string | null;
  setActiveChallenge: (challengeId: string | null) => void;
}

export const useChallengeStore = create<ChallengeStore>((set) => ({
  activeChallengeId: null,
  setActiveChallenge: (challengeId) => set({ activeChallengeId: challengeId }),
}));
