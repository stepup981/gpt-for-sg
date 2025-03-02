import React from "react";
import { InputLabel, Switcher, CheckboxGroup } from "./ui";
import { useLegendStore } from "@/store";
import { workFormatsList } from "@/resources";

const WorkFormat: React.FC = () => {
  const { legend, setLegend } = useLegendStore();

  const setIsCustomWorkFormat = (value: boolean) => {
    setLegend({
      isCustomWorkFormat: value,
      workFormats: value ? [] : legend.workFormats, 
      customWorkFormat: value ? "" : legend.customWorkFormat,
    });
  };

  return (
    <div className="box work__format">
      {legend.isCustomWorkFormat ? (
        <InputLabel
          labelDescription="Введите свой формат работы"
          valueInput={legend.customWorkFormat}
          setText={(value) => setLegend({customWorkFormat: value})}
          labelWarning=""
        />
      ) : (
        <CheckboxGroup
          selectedOptions={legend.workFormats}
          onOptionSelect={(value) => setLegend({workFormats: value})}
          list={workFormatsList} 
          titleList="Форматы работы"
        />
      )}
      <Switcher
        label="Свой вариант"
        isChecked={legend.isCustomWorkFormat}
        onToggle={setIsCustomWorkFormat}
      />
    </div>
  );
};

export default WorkFormat;
