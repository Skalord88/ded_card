import { useState } from "react";
import { addToDrop } from "../../functions";
import { ItemToBuy, Item, WonderousItem } from "../../interfaces";
import { Popup } from "../../Popup/Popup";
import { DropdownComponent } from "../../DropDown/DropDown";
import { noneItem } from "../../variables";

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
    setSelected(noneItem)
    sellItem(option, type);
  };

  const listOfItems = addToDrop(items, "items");
  const textIcon = "rpgui-icon " + type;

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

              <Popup text={selected.name} popText={selected.description} />

              
            </div>
            <div style={{ gridRow: 2, gridColumn: 2 }} >
              <DropdownComponent options={listOfItems} onAction={selectItem} key={"drop " + type}/>
            </div>
            <div style={{ gridRow: 2 }} className={textIcon}></div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
