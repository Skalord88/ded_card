import { DropdownComponent } from "../../DropDown/DropDown";
import { ItemPartProps } from "../props";

export const ItemTheItemComponent: React.FC<ItemPartProps> = ({
  filtro,
  nameItem,
  setTheItem
}) => {

  return (
    <div>
      {filtro && setTheItem && (
        <DropdownComponent options={filtro} onAction={setTheItem} />
      )}
      <p>
        <span style={{ color: "yellow" }}>name: </span>
        {nameItem}
      </p>
    </div>
  );
};
