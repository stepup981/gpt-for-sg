import React from "react";
import { InputLabel, Dropdown, Switcher } from "./ui";
import { useLegendStore } from "@/store";
import { fieldAgencyList } from "@/resources";

const FieldAgency: React.FC = () => {
  const { legend, setLegend } = useLegendStore();
  const setIsCustomField = (value: boolean) => {
    setLegend({ 
      isCustomField: value,
      fieldAgency: value ? "" : legend.fieldAgency,
    });
  };

  return (
    <div className="box field__agency">
      {legend.isCustomField ? (
        <InputLabel
          labelDescription="Введите свою сферу"
          valueInput={legend.customField}
          setText={(value) => setLegend({ customField: value })}
          labelWarning={legend.warningMessageLegend}
        />
      ) : (
        <Dropdown
          selectedOption={legend.fieldAgency}
          onOptionSelect={(value) => setLegend({ fieldAgency: value })}
          list={fieldAgencyList}
          titleList="Сфера деятельности организации"
          zeroSelect="Выберите сферу..."
          warning={legend.warningMessageLegend}
        />
      )}
      <Switcher label="Свой вариант" isChecked={legend.isCustomField} onToggle={setIsCustomField} />
    </div>
  );
};

export default FieldAgency;
