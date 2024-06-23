import { Backpack, Item } from "../../interfaces";

export const BuyBackpack: React.FC<Backpack> = ({
    item,
    type,
    items,
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
        <div>
          {item.map((i) => {
            return (
              <>
                <ul>
                  <div>{i.name}</div>
                  <div>
                    <button onClick={() => deselect(i, type)}>-</button>
                  </div>
                  <div>{i.description}</div>
                </ul>
              </>
            );
          })}
        </div>
        <div>
          {items.map((it) => {
            return (
              <div key={it.id}>
                {it.name} {it.cost}
                <button onClick={() => selectItem(it, type)}>+</button>
              </div>
            );
          })}
        </div>
      </>
    );
  };