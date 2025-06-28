import { useEffect, useRef, useState } from "react";
import { itemInDrop } from "../functions";

export interface DropdownProps {
  options: itemInDrop[];
  onAction: (option: any) => void;
}

export const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  onAction
}) => {
  const [selectedItem, setSelectedItem] = useState<string>("...");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectItem = (option: itemInDrop) => {
    onAction(option.item);
    setSelectedItem(option.name);
    setIsOpen(false);
  };

  // Chiude il dropdown cliccando fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ width: "100%", position: "relative" }}>
      <p
        className="rpgui-dropdown-imp rpgui-dropdown-imp-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <label style={{ marginRight: "8px" }}>▼</label> {selectedItem}
      </p>
      {isOpen && (
        <ul className="rpgui-dropdown-imp">
          {options.map((o, index) => (
            <li key={index} onClick={() => selectItem(o)}>
              {o.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
