import { InventoryProps } from "./ArmorInterface";

export const Failure: React.FC<InventoryProps> = ({ inventory }) => {
  return (
    <>
      <div className="rpgui-container-framed-grey">
        <p style={{ flex: 1 }}>
          {inventory.armor.failure + inventory.shield.failure}%
        </p>
        <p style={{ flex: 1 }}>failure</p>
      </div>
    </>
  );
};
