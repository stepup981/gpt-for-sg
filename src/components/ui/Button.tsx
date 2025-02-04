import React from "react";

interface IButton {
  children: string,
  disabled?: boolean
}

const CustomButton: React.FC<IButton> = ({children, disabled}) => {
  return (
    <button style={{padding: "5px", backgroundColor: "red"}} disabled={disabled}>{children}</button>
  )
}

export default CustomButton