import { Rings, Item } from "../../interfaces";

export const BuyRings: React.FC<Rings> = ({
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
        </div>
      </>
    );
  };