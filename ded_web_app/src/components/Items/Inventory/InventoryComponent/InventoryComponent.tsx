import { Inventory } from "../../../interfaces";
import { ArmorInventoryComponent } from "./ArmorInventoryComponent";
import { ShieldInventoryComponent } from "./ShieldInventoryComponent";

export type InventoryComponentProps = {
  inventory: Inventory;
};

export const InventoryComponent: React.FC<InventoryComponentProps> = ({
  inventory
}) => {
  return (
    <>
      <div className="rpgui-container-framed-grey" style={{ display: "grid" }}>
        <ArmorInventoryComponent armor={inventory.armor} />
        <ShieldInventoryComponent shield={inventory.shield} />
      </div>
    </>
  );
};

