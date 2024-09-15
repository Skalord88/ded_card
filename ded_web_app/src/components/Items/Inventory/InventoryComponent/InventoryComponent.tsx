import { Inventory } from "../../../interfaces";
import { ArmorInventoryComponent } from "./ArmorInventoryComponent";
import { ShieldInventoryComponent } from "./ShieldInventoryComponent";
import { WeaponsInventoryComponent } from "./WeaponsInventoryComponent";
import { WeightInventoryComponent } from "./WeightInventoryComponent";

export type InventoryComponentProps = {
  inventory: Inventory;
  carrying: [string, number]
};

export const InventoryComponent: React.FC<InventoryComponentProps> = ({
  inventory,
  carrying
}) => {
  return (
    <>
      <div className="rpgui-container-framed-grey" style={{ display: "grid", fontSize: '80%' }}>
        <WeightInventoryComponent carrying={carrying} />
        <ArmorInventoryComponent armor={inventory.armor} />
        <ShieldInventoryComponent shield={inventory.shield} />
        <WeaponsInventoryComponent
          weapon1={inventory.weaponOne}
          weapon2={inventory.weaponTwo}
          weapon3={inventory.weaponThree}
          weapon4={inventory.weaponFour}
          weapon5={inventory.weaponFive}
        />
      </div>
    </>
  );
};

