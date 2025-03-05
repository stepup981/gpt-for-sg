// PriceSegmentField.tsx
import React from "react";
import { Dropdown } from "../ui";
import { priceSegmentList } from "@/resources";
import { useLegendStore } from "@/store";

const PriceSegment = () => {
  const { legend, setLegend } = useLegendStore();
  return (
    <div className="box price__segment">
      <Dropdown
        selectedOption={legend.priceSegment}
        onOptionSelect={(value) => setLegend({ priceSegment: value })}
        list={priceSegmentList}
        titleList="Ценовой сегмент"
        zeroSelect="Выберите ценовой сегмент"
      />
    </div>
  );
};

export default PriceSegment;
