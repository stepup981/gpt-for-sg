// NameAgency.tsx
import React from "react";
import { InputLabel } from "./ui";

interface INameAgencyProps {
  nameAgency: string;
  setNameAgency: (value: string) => void;
  warningMessage: string;
}

const NameAgency: React.FC<INameAgencyProps> = ({ nameAgency, setNameAgency, warningMessage }) => {
  return (
    <div className="box name__agency">
      <InputLabel
        labelDescription="Наименование организации"
        labelWarning={warningMessage}
        valueInput={nameAgency}
        setText={setNameAgency}
      />
    </div>
  );
};

export default NameAgency;
