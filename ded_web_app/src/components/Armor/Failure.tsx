import { InventoryProps } from "./interface/ArmorInterface";

export const Failure: React.FC<InventoryProps> = ({ inventory }) => {
  return (
    <div className="rpgui-container-framed" style={{ gridArea: "failure" }}>
      <p>failure</p>
      <p>{inventory.armor.failure + inventory.shield.failure}%</p>
    </div>
  );
};
