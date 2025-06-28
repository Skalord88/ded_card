import { useState, useEffect } from "react";
import { DropdownComponent } from "../../DropDown/DropDown";
import { addToDrop, itemInDrop } from "../../functions";
import { ItemPartProps } from "../props";

export const ItemMaterialComponent: React.FC<ItemPartProps> = ({
  materialItem,
  setMaterialItem
}) => {
  const [material, setMaterial] = useState<string | null>(null);

  const metal = ["METAL", "MITHRAL", "ADAMANTINE", "DRAGONHIDE"];
  const wood = ["WOOD", "DARKWOOD"];

  useEffect(() => {
    if (materialItem) setMaterial(materialItem);
  }, [materialItem]);

  const handleNewMaterial = (option: string) => {
    setMaterial(option);
  };

  useEffect(() => {
    if (material && setMaterialItem) {
      setMaterialItem(material);
    }
  }, [material]);

  if (!material) return null;

  const options: itemInDrop[] | undefined = metal.includes(material)? addToDrop(metal, "filter") : wood.includes(material) ? addToDrop(wood, "filter") : undefined;

  return (
    <div>
      <p>
        <span style={{ color: "yellow" }}>{"material: "}</span>
        <span>{material}</span>
      </p>
      {options && <DropdownComponent options={options} onAction={handleNewMaterial} />}
    </div>
  );
};