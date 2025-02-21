// PriceSegmentField.tsx
import React from "react";
import { Dropdown } from "./ui";
interface IPriceSegmentFieldProps {
  priceSegment: string;
  setPriceSegment: (value: string) => void;
  priceSegmentList: string[];
}

const PriceSegment: React.FC<IPriceSegmentFieldProps> = ({
  priceSegment,
  setPriceSegment,
  priceSegmentList
}) => {
  return (
    <div className="box price__segment">
      <Dropdown
        selectedOption={priceSegment}
        onOptionSelect={setPriceSegment}
        list={priceSegmentList}
        titleList="Ценовой сегмент"
        zeroSelect="Выберите ценовой сегмент"
      />
    </div>
  );
};

export default PriceSegment;
