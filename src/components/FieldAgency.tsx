// FieldAgencyField.tsx
import React from "react";
import { InputLabel, Dropdown, Switcher } from "./ui";

interface FieldAgencyFieldProps {
  fieldAgency: string;
  setFieldAgency: (value: string) => void;
  customField: string;
  setCustomField: (value: string) => void;
  isCustomField: boolean;
  setIsCustomField: (value: boolean) => void;
  warningMessage: string;
  fieldAgencyList: string[];
}

const FieldAgency: React.FC<FieldAgencyFieldProps> = ({
  fieldAgency,
  setFieldAgency,
  customField,
  setCustomField,
  isCustomField,
  setIsCustomField,
  warningMessage,
  fieldAgencyList
}) => {
  return (
    <div className="box field__agency">
      {isCustomField ? (
        <InputLabel
          labelDescription="Введите свою сферу"
          valueInput={customField}
          setText={setCustomField}
          labelWarning={warningMessage}
        />
      ) : (
        <Dropdown
          selectedOption={fieldAgency}
          onOptionSelect={setFieldAgency}
          list={fieldAgencyList}
          titleList="Сфера деятельности организации"
          zeroSelect="Выберите сферу..."
          warning={warningMessage}
        />
      )}
      <Switcher label="Свой вариант" isChecked={isCustomField} onToggle={setIsCustomField} />
    </div>
  );
};

export default FieldAgency;
