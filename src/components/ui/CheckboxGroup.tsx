import React from "react";

interface IDropdownCheckboxProps {
  selectedOptions: string[];
  onOptionSelect: (options: string[]) => void;
  list: string[];
  titleList: string;
  warning?: string;
}

const CheckboxGroup: React.FC<IDropdownCheckboxProps> = ({
  titleList,
  selectedOptions,
  onOptionSelect,
  list,
  warning
}) => {
  const handleCheckboxChange = (item: string) => {
    const updatedOptions = selectedOptions.includes(item)
      ? selectedOptions.filter((option) => option !== item)
      : [...selectedOptions, item];
    onOptionSelect(updatedOptions);
  };

  return (
    <div className="field">
      <label className="label">{titleList}</label>

      <div className="control box">
        <div className="fixed-grid">
          <div className="grid">
            {list.map((item) => (
              <label key={item} className="checkbox" style={{ width: "fit-content" }}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedOptions.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {!selectedOptions.length && warning && <p className="help is-danger">{warning}</p>}
    </div>
  );
};

export default CheckboxGroup;
