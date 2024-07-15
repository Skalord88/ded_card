import { useState } from "react";
import { DropdownComponent } from "../../DropDown/DropDown";
import { ListOfSomething } from "../../List/List";
import { addToDrop } from "../../functions";
import { Item, WonderousItem } from "../../interfaces";
import { Popup } from "../../Popup/Popup";
import { FilterNoItem } from "../Functions/Functions";

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
  items,
  text,
  type,
  buyItem,
  sellItem
}) => {
  const [selected, setSelected] = useState<WonderousItem[] | Item[]>(
    FilterNoItem(item)
  );
  const selectItem = (option: WonderousItem | Item) => {
    buyItem(option, type);
    setSelected((prevList) => {
      prevList.push(option);
      return prevList;
    });
  };
  const deselect = (option: WonderousItem | Item, i: number) => {
    const newList = selected.filter((item, index) => index !== i);
    setSelected(newList);
    sellItem(option, type);
  };
  const listOfItems = addToDrop(items, "normal");

  return (
    <>
      {selected ? (
        <>
          <div
            className="rpgui-container-framed-grey"
            style={{ display: "grid" }}
          >
            <div style={{ gridRow: 1 }}>
              <p>{text}</p>
            </div>

            <div
              className="rpgui-list-imp"
              style={{
                height: 120,
                fontSize: "60%",
                gridRow: 2,
                gridColumn: 2
              }}
            >
              {selected.map((item, index) => {
                return (
                  <>
                    <div onClick={() => deselect(item, index)}>
                      <Popup text={item.name} popText={item.description} />
                    </div>
                  </>
                );
              })}
            </div>
            <div style={{ gridRow: 2, gridColumn: 3 }}>
              <DropdownComponent
                options={listOfItems}
                onAction={selectItem}
                key={"drop " + type}
              />
            </div>
            <div style={{ gridRow: 2 }} className="rpgui-icon backpack"></div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
