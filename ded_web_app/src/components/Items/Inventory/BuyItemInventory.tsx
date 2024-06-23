import { ItemToBuy, Item } from "../../interfaces";

export const BuyItemInventory: React.FC<ItemToBuy> = ({
  item,
  items,
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
      <div className="rpgui-container-framed-grey">
        {item.name}
        <button onClick={() => deselect(item, type)}>-</button>
      </div>
      <div>{item.description}</div>
      <div></div>

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
