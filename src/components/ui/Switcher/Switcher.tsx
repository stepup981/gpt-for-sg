import React from "react";
import style from "./style.module.css";

interface ISwitcherProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
}

const Switcher: React.FC<ISwitcherProps> = ({ isChecked, onToggle, label }) => {
  return (
    <div className="control mt-3 block">
      <label className={style.switchContainer}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onToggle(e.target.checked)}
          className={style.switchInput}
        />
        <span className={style.switchSlider}></span>
      </label>
      {label && <span className={`is-small ${style.switchLabel}`}>{label}</span>}
    </div>
  );
};

export default Switcher;
