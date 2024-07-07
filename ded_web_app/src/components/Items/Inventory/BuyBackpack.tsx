import { DropdownComponent } from "../../DropDown/DropDown";
import { ListOfSomething } from "../../List/List";
import { addToDrop } from "../../functions";
import { Item, WonderousItem } from "../../interfaces";

export type Backpack = {
  item: Item[]; // elementi nello zaino
  items: Item[]; // elementi dal db
  type: string; // tipo
  text: string; // titolo
  buyItem: (newItem: Item, type: string) => void;
  sellItem: (newItem: Item, type: string) => void;
};

export const BuyBackpack: React.FC<Backpack> = ({
  item,
  type,
  text,
  items,
  buyItem,
  sellItem
}) => {
  const selectItem = (option: Item ) => {
    buyItem(option, type);
  };
  const deselect = (i: WonderousItem ) => {
    sellItem(i, type);
  };
  const listOfItems = addToDrop(items, "normal");

  return (
    <>
      <div className="rpgui-container-framed-grey" style={{ display: "grid" }}>
        <div style={{ gridRow: 1, gridColumn: 1 }}>
          <p>{text}</p>
          <DropdownComponent
            options={listOfItems}
            onAction={selectItem}
          />
        </div>

        <div style={{ gridRow: 1, gridColumn: 2 }}>
          
        </div>
        <div style={{ gridRow: 1, gridColumn: "2 / span 3" }}>
          <ListOfSomething
            items={item}
            text={"Backpack:"}
            onSelect={deselect}
          />
        </div>
        <div style={{ gridRow: 2 }} className="rpgui-icon backpack"></div>
      </div>
    </>
  );
};
