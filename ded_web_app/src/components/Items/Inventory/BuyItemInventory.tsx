import { useState } from "react";
import { addToDrop } from "../../functions";
import { ItemToBuy, Item, WonderousItem } from "../../interfaces";
import { Popup } from "../../Popup/Popup";
import { DropdownComponent } from "../../DropDown/DropDown";

export const BuyItemInventory: React.FC<ItemToBuy> = ({
  item,
  items,
  text,
  type,
  buyItem,
  sellItem
}) => {
  const [selected, setSelected] = useState<WonderousItem | Item>(item);
  const selectItem = (option: WonderousItem | Item) => {
    buyItem(option, type);
    setSelected(option);
  };
  const deselect = (option: WonderousItem | Item) => {
    sellItem(option, type);
  };

  const listOfItems = addToDrop(items, "items");

  return (
    <>
      {selected ? (
        <>
          <div
            className="rpgui-container-framed-grey"
            style={{ display: "grid" }}
          >
            <div>
              <p>{text}</p>
            </div>
            <div onClick={() => deselect(selected as any)}>
              <Popup
                text={selected.name}
                popText={selected.description}
              />
            </div>
            <div style={{ gridRow: 2, gridColumn: 2 }}>
              <DropdownComponent options={listOfItems} onAction={selectItem} />
            </div>
            {type === "head" ? (
              <div style={{ gridRow: 2 }} className="rpgui-icon helmet"></div>
            ) : type === "neck" ? (
              <div style={{ gridRow: 2 }} className="rpgui-icon neck"></div>
            ) : type === "arms" ? (
              <div style={{ gridRow: 2 }} className="rpgui-icon arms"></div>
            ) : type === "cloth" ? (
              <div style={{ gridRow: 2 }} className="rpgui-icon cloth"></div>
            ) : (
              <div style={{ gridRow: 2 }} className="rpgui-icon shoes"></div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
