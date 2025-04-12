import { reMaterialWeight } from "../Material/function";
import { ItemPartProps } from "../props";

export const ItemWeightComponent: React.FC<ItemPartProps> = ({
    weightItem,
    materialItem
  }) => {
    const weight =
    materialItem?
    materialItem &&
    weightItem &&
      reMaterialWeight(materialItem, weightItem)
      : weightItem
  
    return (
      <div>
        <p>
          <span style={{ color: "yellow" }}>{"weight: "}</span>
          <span>{weight}</span>
        </p>
      </div>
    );
  };