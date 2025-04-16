import { DropdownComponent } from "../../DropDown/DropDown";
import { FormattingText } from "../../Formatting/Function";
import { ItemPartProps } from "../props";

export const ItemTheItemComponent: React.FC<ItemPartProps> = ({
  filtro,
  nameItem,
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
        {FormattingText(nameItem?? "")}
      </p>
    </div>
  );
};
