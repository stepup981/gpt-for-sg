// WorkFormatField.tsx
import React from "react";
import { InputLabel, Switcher, CheckboxGroup } from "./ui";

interface IWorkFormatFieldProps {
  selectedWorkFormats: string[];
  setSelectedWorkFormats: (options: string[]) => void;
  customWorkFormat: string;
  setCustomWorkFormat: (value: string) => void;
  isCustomWorkFormat: boolean;
  setIsCustomWorkFormat: (value: boolean) => void;
  warningMessage: string;
  workFormatsList: string[];
}

const WorkFormat: React.FC<IWorkFormatFieldProps> = ({
  selectedWorkFormats,
  setSelectedWorkFormats,
  customWorkFormat,
  setCustomWorkFormat,
  isCustomWorkFormat,
  setIsCustomWorkFormat,
  warningMessage,
  workFormatsList
}) => {
  return (
    <div className="box work__format">
      {isCustomWorkFormat ? (
        <InputLabel
          labelDescription="Введите свой формат работы"
          valueInput={customWorkFormat}
          setText={setCustomWorkFormat}
          labelWarning={warningMessage}
        />
      ) : (
        <CheckboxGroup
          selectedOptions={selectedWorkFormats}
          onOptionSelect={setSelectedWorkFormats}
          list={workFormatsList}
          titleList="Форматы работы"
        />
      )}
      <Switcher
        label="Свой вариант"
        isChecked={isCustomWorkFormat}
        onToggle={setIsCustomWorkFormat}
      />
    </div>
  );
};

export default WorkFormat;
