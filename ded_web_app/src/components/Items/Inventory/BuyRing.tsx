import { Rings, Item, WonderousItem } from "../../interfaces";
import { BuyItemInventory } from "./BuyItemInventory";

export const BuyRings: React.FC<Rings> = ({
  item,
  items,
  text,
  type,
  buyItem,
  sellItem
  }) => {
    const position: number = Number(type.charAt(6))
    const selectItem = (i: Item, type: string) => {
      buyItem(i, type);
    };
    const deselect = (option: WonderousItem | Item) => {
      sellItem(option, type);
    };
    return (
      <>
        <div>
        <BuyItemInventory
          key={type} 
          item={item[position]}
          items={items}
          text={text}
          buyItem={selectItem}
          sellItem={deselect}
          type={type}
        />
        </div>

      </>
    );
  };