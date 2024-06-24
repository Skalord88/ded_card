import { useState } from "react";
import { itemInDrop } from "../functions";

export interface DropdownProps {
  options: itemInDrop[];
  onAction: (option: any) => void;
}

export const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  onAction
}) => {
  const [dropItem, setDropItem] = useState<itemInDrop>();

  const selectItem = (option: itemInDrop) => {
    onAction(option.item);
    setIsOpen(false);
    setDropItem(option);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div onMouseLeave={handleMouseLeave}>
        <p
          className=" rpgui-dropdown-imp rpgui-dropdown-imp-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <label>▼ </label> {dropItem?.name}
        </p>
        {isOpen && (
          <ul className="rpgui-dropdown-imp" style={{ fontSize: "75%" }}>
            {options.map((o, index) => (
              <>
                <li key={index} onClick={() => selectItem(o)}>
                  {o.name}
                </li>
              </>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};