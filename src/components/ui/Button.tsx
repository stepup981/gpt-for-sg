import React from "react";

interface IButton {
  children: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

const Button: React.FC<IButton> = ({ children, disabled, onClick, isLoading, isError }) => {
  return (
    <button
      className={`button block ${isLoading ? "is-loading" : ""} ${isError ? "is-danger" : "is-link"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
