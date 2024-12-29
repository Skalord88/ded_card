import { InventoryProps } from "./interface/ArmorInterface";


export const Failure: React.FC<InventoryProps> = ({ inventory }) => {
  return (
    <>
      <div className="rpgui-container-framed-grey">
        <p>
          {inventory.armor.failure + inventory.shield.failure}%
        </p>
        <p>failure</p>
      </div>
    </>
  );
};
