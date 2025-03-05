// ProductField.tsx
import React from "react";
import { InputLabel, Dropdown } from "../ui";
import { productList } from "@/resources";
import { useLegendStore } from "@/store";

const ProductField = () => {
  const { legend, setLegend } = useLegendStore();

  return (
    <div className="box product">
      <Dropdown
        selectedOption={legend.productAdChoice}
        onOptionSelect={(value) => setLegend({ productAdChoice: value })}
        list={productList}
        titleList="Товар или услуга для продвижения"
        zeroSelect="Выберите товар или услуга"
      />
      <InputLabel
        labelDescription="Товар или услуга"
        valueInput={legend.productAd}
        setText={(value) => setLegend({ productAd: value })}
      />
    </div>
  );
};

export default ProductField;
