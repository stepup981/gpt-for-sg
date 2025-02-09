import React from "react";
import style from "./style.module.css";

interface IDropdownProps {
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  list: string[];
  titleList: string;
  warning?: string;
}

const Dropdown: React.FC<IDropdownProps> = ({ titleList, selectedOption, onOptionSelect, list, warning }) => {
  return (
    <div className="field">
      <label className="label">{titleList}</label>

      <div className="control">
        <div className={`select ${warning ? "is-danger" : ""}`}>
          <select
            value={selectedOption}
            onChange={(e) => onOptionSelect(e.target.value)}
            className={`${warning ? "is-danger" : style.select_custom}`}
          >
            <option value="">Выберите сферу...</option>
            {list.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!selectedOption && <p className="help is-danger">{warning}</p>}
    </div>
  );
};

export default Dropdown;
