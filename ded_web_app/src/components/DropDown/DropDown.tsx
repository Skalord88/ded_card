import { useEffect, useState } from "react";
import { itemInDrop } from "../functions";

export interface DropdownProps {
  options: itemInDrop[];
  onAction: (option: any) => void;
}

export const DropdownComponent: React.FC<DropdownProps> = ({
  options,
  onAction
}) => {
  
  const [dropItem, setDropItem] = useState<string | undefined>();

  useEffect(() => {
    setDropItem(undefined)
  },[options, dropItem])

  const selectItem = (option: itemInDrop | undefined) => {
    if (!option) {
      console.error("selectItem received undefined");
      return;
    }
    onAction(option.item);
    setIsOpen(false);
    setDropItem(option.name as string);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div onMouseLeave={handleMouseLeave} >
        <p
          className=" rpgui-dropdown-imp rpgui-dropdown-imp-header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <label>▼</label> {dropItem}
        </p>
        {isOpen && (
          <ul
            className="rpgui-dropdown-imp"
            style={{
              position: "absolute",
              width: "50%",
              fontSize: "50%"
            }}
          >
            {options.map((o, index) => (
              <div key={index}>
                <li onClick={() => selectItem(o)}>
                  {o.name}
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
