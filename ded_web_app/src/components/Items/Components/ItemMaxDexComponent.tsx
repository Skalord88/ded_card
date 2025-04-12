import { reMaterialMaxDex } from "../Material/function";
import { ItemPartProps } from "../props";

export const ItemMaxDexComponent: React.FC<ItemPartProps> = ({
  maxDexItem,
  materialItem
}) => {
  const maxDex =
    materialItem && maxDexItem && reMaterialMaxDex(materialItem, maxDexItem);
  return (
    <div>
      <p>
        <span style={{ color: "yellow" }}>maxDex: </span>
        {maxDex}
      </p>
    </div>
  );
};
