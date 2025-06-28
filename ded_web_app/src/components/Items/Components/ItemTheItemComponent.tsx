import { DropdownComponent } from "../../DropDown/DropDown";
import { enchantedName } from "../../Enchantment/Functions/EnchantmentFunctions";
import { ItemPartProps } from "../props";

export const ItemTheItemComponent: React.FC<ItemPartProps> = ({
  filtro,
  itemName,
  onAction,
  setTheItem
}) => {
  return (
    <div>
      {filtro && setTheItem && (
        <DropdownComponent options={filtro} onAction={setTheItem} />
      )}
      <p onClick={onAction}>
        <span style={{ color: "yellow" }}>name: </span>
        {itemName}
      </p>
    </div>
  );
};
