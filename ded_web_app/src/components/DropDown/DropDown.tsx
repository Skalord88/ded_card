import { useEffect, useRef, useState } from "react";
import { ItemInDrop } from "../functions";

export interface DropdownProps<T> {
  options: ItemInDrop<T>[];
  onAction: (option: T) => void;
}

export const DropdownComponent = <T,>({
  options,
  onAction
}: DropdownProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<string>("...");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedItem("...");
  }, [options]);

  const selectItem = (option: ItemInDrop<T>) => {
    onAction(option.item);
    setSelectedItem(option.name);
    setIsOpen(false);
  };

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
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <span
        className="rpgui-dropdown-imp rpgui-dropdown-imp-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        ▼ {selectedItem}
      </span>

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