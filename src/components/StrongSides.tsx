import React from "react";
import { InputLabel } from "./ui";

interface IStrongSidesProps {
  strSide: string;
  setStrSide: (value: string) => void;
}

const StrongSides: React.FC<IStrongSidesProps> = ({ strSide, setStrSide }) => {
  return (
    <div className="box strong-sides">
      <InputLabel labelDescription="Сильные стороны" valueInput={strSide} setText={setStrSide} />
    </div>
  );
};

export default StrongSides;
