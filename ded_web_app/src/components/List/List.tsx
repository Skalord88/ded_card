import {
  EnchantedName
} from "../Enchantment/Functions/EnchantmentFunctions";

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
  const handleSelect = (s: any) => {
    onSelect(s);
  };

  return (
    <>
      {items.length > 0 ? (
        <>
          <div style={{ flex: 1 }}>
            <p>{text}</p>
            <div className="rpgui-list-imp" style={{ height: 100, fontSize:"75%" }}>
              {items.map((i) => {
                return (
                  <li key={i.id} onClick={() => handleSelect(i)}>
                    {EnchantedName(i)}
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
