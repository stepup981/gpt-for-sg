// UpGoalField.tsx
import React from "react";
import { InputLabel, Switcher, CheckboxGroup } from "./ui";
import upGoalsList from "@/resources/upGoalList";
import { useLegendStore } from "@/store";

const UpGoal = () => {
  const { legend, setLegend } = useLegendStore();

  const setIsCustomUpGoal = (value: boolean) => {
    setLegend({
      isCustomUpGoal: value,
      upGoals: value ? [] : legend.upGoals,
      customUpGoal: value ? "" : legend.customUpGoal
    });
  };

  return (
    <div className="box up-goals">
      {!legend.isCustomUpGoal ? (
        <CheckboxGroup
          selectedOptions={legend.upGoals}
          onOptionSelect={(value) => setLegend({ upGoals: value })}
          list={upGoalsList}
          titleList="Цели для увеличения продаж"
        />
      ) : (
        <InputLabel
          labelDescription="Введите свои цели (через запятую)"
          valueInput={legend.customUpGoal}
          setText={(value) => setLegend({ customUpGoal: value })}
          labelWarning="* Цели должны быть указаны через запятую"
        />
      )}
      <Switcher
        label="Свой вариант"
        isChecked={legend.isCustomUpGoal}
        onToggle={setIsCustomUpGoal}
      />
    </div>
  );
};

export default UpGoal;
