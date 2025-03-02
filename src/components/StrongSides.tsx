import React from "react";
import { InputLabel } from "./ui";
import { useLegendStore } from "@/store";

const StrongSides = () => {
  const { legend, setLegend } = useLegendStore();
  return (
    <div className="box strong-sides">
      <InputLabel
        labelDescription="Сильные стороны"
        valueInput={legend.strSide}
        setText={(value) => setLegend({ strSide: value })}
      />
    </div>
  );
};

export default StrongSides;
