import React from "react";
import { InputLabel, Switcher, CheckboxGroup } from "./ui";
import { useLegendStore } from "@/store";
import { businessProblemsList } from "@/resources";
const BusinessProblems: React.FC = () => {
  const { legend, setLegend } = useLegendStore();

  const setIsCustomProblem = (value: boolean) => {
    setLegend({
      isCustomProblem: value,
      upProblems: value ? [] : legend.upProblems, 
      customProblem: value ? "" : legend.customProblem 
    });
  };

  return (
    <div className="box business-problems">
      {!legend.isCustomProblem ? (
        <CheckboxGroup
          selectedOptions={legend.upProblems}
          onOptionSelect={(value) => setLegend({ upProblems: value })}
          list={businessProblemsList}  
          titleList="Проблемы бизнеса"
        />
      ) : (
        <InputLabel
          labelDescription="Введите свои проблемы (через запятую)"
          valueInput={legend.customProblem}
          setText={(value) => setLegend({ customProblem: value })}
          labelWarning="* Проблемы должны быть указаны через запятую"
        />
      )}
      <Switcher
        label="Свой вариант"
        isChecked={legend.isCustomProblem}
        onToggle={setIsCustomProblem}
      />
    </div>
  );
};

export default BusinessProblems;
