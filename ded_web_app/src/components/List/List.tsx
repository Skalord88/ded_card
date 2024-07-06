import {
  EnchantedName
} from "../Enchantment/Functions/EnchantmentFunctions";
import { itemInDrop } from "../functions";

export interface ListProps {
  items: any[];
  text: string;
  onSelect: (select: any) => void;
}

export const ListOfSomething: React.FC<ListProps> = ({
  items,
  text,
  onSelect
}) => {
  const handleSelect = (s: itemInDrop) => {
    onSelect(s);
  };

  return (
    <>
      {items.length > 0 ? (
        <>
          <div style={{ flex: 1 }}>
            <p>{text}</p>
            <div
             className="rpgui-list-imp" 
             style={{ height: "auto", maxHeight: 100, fontSize:"60%"
            }}>
              {items.map((i, index) => {
                return (
                  <li key={index} onClick={() => handleSelect({item: i, name: text})}>
                    {EnchantedName(i)} {i.subRacesName} {i.featName} {i.characterFeatName}
                  </li>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
