import { reMaterialArmType } from "../Material/function";
import { ItemPartProps } from "../props";

export const ItemArmorTypeComponent: React.FC<ItemPartProps> = ({
    armorTypeItem,
    materialItem
  }) => {
    const armorType =
      materialItem &&
      armorTypeItem &&
      reMaterialArmType(materialItem, armorTypeItem);
  
    return (
      <div>
        <p>
          <span style={{ color: "yellow" }}>{"armor type: "}</span>
          <span>{armorType}</span>
        </p>
      </div>
    );
  };