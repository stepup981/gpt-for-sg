import React from "react";
import style from './style.module.css'

interface DropdownProps {
  selectedOption?: string;
  onOptionSelect?: (option: string) => void;
  isTumblerChecked?: boolean;
  list: string[]
}

const Dropdown: React.FC<DropdownProps> = ({ selectedOption, onOptionSelect, isTumblerChecked, list }) => {
  return (
    <div className="field">
      <label className="label">Выберите или введите текст:</label>
      <div className="control">
        <div className="select ">
          <select
            value={selectedOption}
            onChange={(e) => onOptionSelect(e.target.value)}
            disabled={isTumblerChecked}
            className={style.select_custom}
          >
            <option value="">Выберите...</option>
            {list.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
