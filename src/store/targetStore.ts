import { create } from "zustand";

interface ITargetState {
  target: {
    targetAudienceGenerator: string;
    targetAudienceSelector: string;
    targetAudienceSelectorCustom: string
    isCustomAudienceSelector: boolean
    targetResponse: string
    targetShortResponse: string;
    JTJTBDResponse: string;
    isLoadingAudienceGenerator: boolean
    isLoadingAudienceSelector: boolean
    isLoadingChoiceAndJTJTBD: boolean
    warningMessageTarget: string;
  };
  setTarget: (updates: Partial<ITargetState["target"]>) => void;
}

const useTargetStore = create<ITargetState>((set) => ({
  target: {
    targetAudienceGenerator: "",
    targetAudienceSelector: "",
    targetAudienceSelectorCustom: "",
    isCustomAudienceSelector: false,
    targetResponse: '',
    targetShortResponse: '',
    JTJTBDResponse: '',
    isLoadingAudienceGenerator: false,
    isLoadingAudienceSelector: false,
    isLoadingChoiceAndJTJTBD: false,
    warningMessageTarget: "",
    
  },
  setTarget: (updates) =>
    set((state) => ({
      target: { ...state.target, ...updates }
    }))
}));

export default useTargetStore;
