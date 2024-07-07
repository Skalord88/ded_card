import { Rings, Item } from "../../interfaces";
import { BuyItemInventory } from "./BuyItemInventory";

export const BuyRings: React.FC<Rings> = ({
  item,
  items,
  text,
  type,
  buyItem,
  sellItem
  }) => {
    const selectItem = (i: Item, type: string) => {
      buyItem(i, type);
    };
    const deselect = (i: Item, type: string) => {
      sellItem(i, type);
    };
    return (
      <>
        <BuyItemInventory 
          item={item[0]}
          items={items}
          text={text}
          buyItem={selectItem}
          sellItem={deselect} type={type + "0"}
        />
        <div>
          <ul>
            {item[0]?.name}
            <button onClick={() => deselect(item[0], type + "0")}>-</button>
            <div>
              {items.map((it) => {
                return (
                  <div key={it.id}>
                    {it.name} {it.cost}
                    <button onClick={() => selectItem(it, type + "0")}>+</button>
                  </div>
                );
              })}
            </div>
          </ul>
          <div className="rpgui-icon hands"></div>
          
          <ul>
            {item[1]?.name}
            <button onClick={() => deselect(item[1], type + "1")}>-</button>
            <div>
              {items.map((it) => {
                return (
                  <div key={it.id}>
                    {it.name} {it.cost}
                    <button onClick={() => selectItem(it, type + "1")}>+</button>
                  </div>
                );
              })}
            </div>
          </ul>
          <div className="rpgui-icon hands"></div>
        </div>
      </>
    );
  };