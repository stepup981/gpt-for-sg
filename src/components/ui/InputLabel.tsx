import React from "react";

interface IInputLabel {
  valueInput: string;
  setText: (text: string) => void;
  labelWarning: string;
  labelDescription?: string;
}

const InputLabel: React.FC<IInputLabel> = ({ labelDescription, labelWarning, valueInput, setText }) => {
  return (
    <div className="field">
      <label className="label">{labelDescription}</label>
      <div className="control">
        <input
          className={`input ${labelWarning ? "is-danger" : ""}`}
          type="text"
          placeholder="Наименование организации"
          value={valueInput}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {labelWarning && <p className="help is-danger">{labelWarning}</p>}
    </div>
  );
};

export default InputLabel;
