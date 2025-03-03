import React from "react";
import { InputLabel } from "./ui";
import { useLegendStore } from "@/store";



const NameAgency = () => {
  const { legend, setLegend } = useLegendStore();
  return (
    <div className="box name__agency">
      <InputLabel
        labelDescription="Наименование организации"
        labelWarning={legend.warningMessageLegend}
        valueInput={legend.nameAgency}
        setText={(value) => setLegend({ nameAgency: value })}
      />
    </div>
  );
};

export default NameAgency;
