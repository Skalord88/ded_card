import { useEffect, useState } from "react";
import { DropdownComponent } from "../../DropDown/DropDown";
import { FormattingText } from "../../Formatting/Function";
import { Enchantment } from "../../interfaces";
import { ItemPartProps } from "../props";

export const ItemEnchantmentsComponent: React.FC<ItemPartProps> = ({
  filtro,
  enchantmentItem,
  setEnchantmentItem
}) => {
  const [enchantment, setEnchantment] = useState<Enchantment[]>();

  useEffect(() => {
    setEnchantment(enchantmentItem);
  }, [enchantmentItem]);

  const handleAddEnchantment = (option: Enchantment) => {
    setEnchantment((prev) => (prev ? [...prev, option] : [option]));
  };
  const handleDelEnchantment = (n: number) => {
    setEnchantment((prev) =>
      prev ? prev.filter((_, index) => index !== n) : []
    );
  };
  useEffect(() => {
    if (enchantment && setEnchantmentItem) {
      setEnchantmentItem(enchantment);
    }
  }, [enchantment]);

  return (
    <div>
      <div>
        <p style={{ color: "yellow" }}>Powers:</p>
        {enchantmentItem?.map((e, index) => (
          <p key={index}>
            <span
              style={{ color: "yellow" }}
              onClick={() => handleDelEnchantment(index)}
            >
              {FormattingText(e.ability)}:
            </span>
            <span> {e.text}</span>
          </p>
        ))}
      </div>
      {/* <div> */}
        {filtro && (
          <DropdownComponent options={filtro} onAction={handleAddEnchantment} />
        )}
      {/* </div> */}
    </div>
  );
};
