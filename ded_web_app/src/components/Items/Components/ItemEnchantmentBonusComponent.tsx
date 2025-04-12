import { ItemPartProps } from "../props";

export const ItemEnchantmentBonusComponent: React.FC<ItemPartProps> = ({
  materialItem,
  enchantmentBonusItem,
  setEnchantmentBonusItem
}) => {
  const enchantments = [0, -1, 1, 2, 3, 4, 5];

  const handlePlusEnchantmentBonus = () => {
    if (setEnchantmentBonusItem){

    const currentIndex = enchantments.indexOf(enchantmentBonusItem ?? 0);
    if (currentIndex === -1 || currentIndex >= enchantments.length - 1) return;

    const skipIndex =
      currentIndex === 0 &&
      materialItem &&
      !["WOOD", "METAL"].includes(materialItem)
        ? currentIndex + 2
        : currentIndex + 1;

    setEnchantmentBonusItem(enchantments[skipIndex]);}
  };

  const handleMinEnchantmentBonus = () => {
    if (setEnchantmentBonusItem){

    const currentIndex = enchantments.indexOf(enchantmentBonusItem ?? 0);
    if (currentIndex < 0) return;

    const skipIndex =
      currentIndex === 2 &&
      materialItem &&
      !["WOOD", "METAL"].includes(materialItem)
        ? currentIndex - 2
        : currentIndex - 1;

    if (skipIndex !== -1) setEnchantmentBonusItem(enchantments[skipIndex]);}
  };

  return (
    <div>
      <p>
        <span style={{ color: "yellow" }}>enchantment: </span>
        <span>
          <button
            className="rpgui-button-grey-mini"
            onClick={handlePlusEnchantmentBonus}
          >
            +
          </button>
          <button
            className="rpgui-button-grey-mini"
            onClick={handleMinEnchantmentBonus}
          >
            -
          </button>
        </span>{" "}
        {enchantmentBonusItem === -1 ? "pft" : enchantmentBonusItem}
      </p>
    </div>
  );
};
