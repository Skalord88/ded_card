import { useState, useEffect } from "react";
import { DropdownComponent } from "../../DropDown/DropDown";
import { addToDrop } from "../../functions";
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

  const options = addToDrop(metal.includes(material) ? metal : wood, "filter");

  return (
    <div>
      <p>
        <span style={{ color: "yellow" }}>{"material: "}</span>
        <span>{material}</span>
      </p>
      <DropdownComponent options={options} onAction={handleNewMaterial} />
    </div>
  );
};