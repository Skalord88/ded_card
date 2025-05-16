import { useEffect, useState } from "react";
import { itemInDrop } from "../functions";

export interface ListProps {
  items: itemInDrop[];
  text: string;
  onSelect: (select: any) => void;
}

export const ListOfSomething: React.FC<ListProps> = ({
  items,
  text,
  onSelect
}) => {
  const [selectedImp, setSelectedImp] = useState<number>();
  const handleSelect = (item: itemInDrop, index: number) => {
    setSelectedImp(index);
    onSelect(item);
  };

  return (
    <div>
      {items.length > 0 ? (
        <div>
          <h2 className="rpgui-container-framed-golden-2">{text}</h2>
          <ul className="rpgui-list-imp"  style={{ maxHeight: "200px", overflowY: "auto" }}>
            {items.map((i, index) => {
              return (
                <li
                  className={selectedImp === index ? "rpgui-selected" : ""}
                  key={index}
                  onClick={() => handleSelect(i, index)}
                >
                  {i.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
