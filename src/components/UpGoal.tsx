// UpGoalField.tsx
import React from "react";
import { InputLabel, Switcher, CheckboxGroup } from "./ui";

interface IUpGoalProps {
  selectedUpGoals: string[];
  setSelectedUpGoals: (options: string[]) => void;
  customUpGoal: string;
  setCustomUpGoal: (value: string) => void;
  isCustomUpGoal: boolean;
  setIsCustomUpGoal: (value: boolean) => void;
  upGoalsList: string[];
}

const UpGoal: React.FC<IUpGoalProps> = ({
  selectedUpGoals,
  setSelectedUpGoals,
  customUpGoal,
  setCustomUpGoal,
  isCustomUpGoal,
  setIsCustomUpGoal,
  upGoalsList
}) => {
  return (
    <div className="box up-goals">
      {!isCustomUpGoal ? (
        <CheckboxGroup
          selectedOptions={selectedUpGoals}
          onOptionSelect={setSelectedUpGoals}
          list={upGoalsList}
          titleList="Цели для увеличения продаж"
        />
      ) : (
        <InputLabel
          labelDescription="Введите свои цели (через запятую)"
          valueInput={customUpGoal}
          setText={setCustomUpGoal}
          labelWarning="* Цели должны быть указаны через запятую"
        />
      )}
      <Switcher label="Свой вариант" isChecked={isCustomUpGoal} onToggle={setIsCustomUpGoal} />
    </div>
  );
};

export default UpGoal;
