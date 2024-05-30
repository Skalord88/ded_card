import { useState } from "react";
import { ClassPc } from "./interfaces";

export interface DropdownProps {
  options: ClassPc[];
  onSelect: (option: ClassPc) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<ClassPc>();

  const handleSelect = (option: ClassPc) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
};

  return (
    <div
        className="rpgui-dropdown-imp"
        onMouseLeave={handleMouseLeave}
        >
      <p
        className="rpgui-dropdown-imp-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <label>{'>'}</label>
        {selectedOption?.className}
      </p>
      {isOpen && (
        <ul
          className="rpgui-dropdown-imp"
          style={{
            position: "absolute",
            width: "310px",
            display: "block"
            }}
        >
          {options.map((option) => (
            <li key={option.id} onClick={() => handleSelect(option)}>
              {option.className}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
