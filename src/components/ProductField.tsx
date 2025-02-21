// ProductField.tsx
import React from "react";
import { InputLabel, Dropdown } from "./ui";

interface IProductFieldProps {
  productAd: string;
  setProductAd: (value: string) => void;
  productAdChoice: string;
  setProductAdChoice: (value: string) => void;
  productList: string[];
}

const ProductField: React.FC<IProductFieldProps> = ({
  productAd,
  setProductAd,
  productAdChoice,
  setProductAdChoice,
  productList
}) => {
  return (
    <div className="box product">
      <Dropdown
        selectedOption={productAdChoice}
        onOptionSelect={setProductAdChoice}
        list={productList}
        titleList="Товар или услуга для продвижения"
        zeroSelect="Выберите товар или услуга"
      />
      <InputLabel
        labelDescription="Товар или услуга"
        valueInput={productAd}
        setText={setProductAd}
      />
    </div>
  );
};

export default ProductField;
