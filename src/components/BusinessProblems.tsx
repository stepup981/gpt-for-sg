// BusinessProblemsField.tsx
import React from "react";
import { InputLabel, Switcher, CheckboxGroup } from "./ui";

interface IBusinessProblemsProps {
  selectedProblems: string[];
  setSelectedProblems: (options: string[]) => void;
  customProblem: string;
  setCustomProblem: (value: string) => void;
  isCustomProblem: boolean;
  setIsCustomProblem: (value: boolean) => void;
  businessProblemsList: string[];
}

const BusinessProblems: React.FC<IBusinessProblemsProps> = ({
  selectedProblems,
  setSelectedProblems,
  customProblem,
  setCustomProblem,
  isCustomProblem,
  setIsCustomProblem,
  businessProblemsList
}) => {
  return (
    <div className="box business-problems">
      {!isCustomProblem ? (
        <CheckboxGroup
          selectedOptions={selectedProblems}
          onOptionSelect={setSelectedProblems}
          list={businessProblemsList}
          titleList="Проблемы бизнеса"
        />
      ) : (
        <InputLabel
          labelDescription="Введите свои проблемы (через запятую)"
          valueInput={customProblem}
          setText={setCustomProblem}
          labelWarning="* Проблемы должны быть указаны через запятую"
        />
      )}
      <Switcher label="Свой вариант" isChecked={isCustomProblem} onToggle={setIsCustomProblem} />
    </div>
  );
};

export default BusinessProblems;
