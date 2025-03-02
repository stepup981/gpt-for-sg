import { create } from "zustand";

interface ILegendState {
  legend: {
    nameAgency: string;
    fieldAgency: string;
    customField: string;
    isCustomField: boolean,
    workFormats: string[];
    customWorkFormat: string;
    isCustomWorkFormat: boolean
    productAd: string;
    productAdChoice: string;
    priceSegment: string;
    upGoals: string[];
    customUpGoal: string;
    isCustomUpGoal: boolean
    upProblems: string[];
    customProblem: string;
    isCustomProblem: boolean;
    strSide: string;
    warningMessage: string;
  };
  setLegend: (updates: Partial<ILegendState["legend"]>) => void;
}

const useLegendStore = create<ILegendState>((set) => ({
  legend: {
    nameAgency: "",

    fieldAgency: "",
    customField: "",
    isCustomField: false,
    
    workFormats: [],
    customWorkFormat: "",
    isCustomWorkFormat: false,

    productAd: "",
    productAdChoice: "",

    priceSegment: "",

    upGoals: [],
    customUpGoal: "",
    isCustomUpGoal: false,

    upProblems: [],
    customProblem: "",
    isCustomProblem: false,

    strSide: "",
    warningMessage: ''
  },
  setLegend: (updates) =>
    set((state) => ({
      legend: { ...state.legend, ...updates },
    })),
}));

export default useLegendStore