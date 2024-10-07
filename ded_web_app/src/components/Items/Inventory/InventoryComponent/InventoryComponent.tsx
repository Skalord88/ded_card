import { Inventory } from "../../../interfaces";
import {
  ArmorInventoryComponent,
  MiniArmorInventoryComponent
} from "./ArmorInventoryComponent";
import {
  MiniShieldInventoryComponent,
  ShieldInventoryComponent
} from "./ShieldInventoryComponent";
import {
  MiniWeaponsInventoryComponent,
  WeaponsInventoryComponent
} from "./WeaponsInventoryComponent";
import { WeightInventoryComponent } from "./WeightInventoryComponent";

export type InventoryComponentProps = {
  inventory: Inventory;
  carrying: [string, number];
};

export const InventoryComponent: React.FC<InventoryComponentProps> = ({
  inventory,
  carrying
}) => {
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Inventory</h2>
      {window.innerWidth <= 768 ? (
        <div>
          <WeightInventoryComponent carrying={carrying} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto"
            }}
          >
            <div></div>
            <div>
              <p>dex</p>
            </div>
            <div>
              <p>pnl</p>
            </div>
            <MiniArmorInventoryComponent armor={inventory.armor} />
            <MiniShieldInventoryComponent shield={inventory.shield} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto",
            }}
          >
            <div></div>
            <div>
              <p>dmg</p>
            </div>
            <div>
              <p>hand</p>
            </div>
            <MiniWeaponsInventoryComponent
              weapon1={inventory.weaponOne}
              weapon2={inventory.weaponTwo}
              weapon3={inventory.weaponThree}
              weapon4={inventory.weaponFour}
              weapon5={inventory.weaponFive}
            />
          </div>
        </div>
      ) : (
        <>
          <WeightInventoryComponent carrying={carrying} />
          <div
          style={{ display: "grid" }}
        >
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
      )}
    </>
  );
};
