import { reMaterialPerfectPenality } from "../Material/function";
import { ItemPartProps } from "../props";

export const ItemPenalityComponent: React.FC<ItemPartProps> = ({
  penalityItem,
  materialItem,
  enchantmentBonusItem
}) => {
  // console.log(penalityItem, materialItem, enchantmentBonusItem)
  const newPenality =
  materialItem &&
  penalityItem &&
   reMaterialPerfectPenality(
    materialItem, penalityItem, enchantmentBonusItem !== 0? true : false
  )
  
  return (
    <div>
      <p>
        <span style={{ color: "yellow" }}>penality: </span>
        {newPenality}
      </p>
    </div>
  );
};