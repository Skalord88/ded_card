import { ItemInDrop } from "../../functions";
import { ItemInPack, Weapon } from "../../interfaces";

const crossbowType: string[] = [
  "BOLT_CROSSBOW",
  "CROSSBOW_HAND",
  "CROSSBOW_HEAVY",
  "CROSSBOW_LIGHT",
  "CROSSBOW_REPEATING_HEAVY",
  "CROSSBOW_REPEATING_LIGHT"
];
const bowType: string[] = [
  "ARROW",
  "LONGBOW",
  "LONGBOW_COMPOSITE",
  "SHORTBOW",
  "SHORTBOW_COMPOSITE"
];
const slingType: string[] = ["BULLETS_SLING", "SLING", "WARSLING"];

const isWeapon = (item: unknown): item is Weapon => {
  return (
    typeof item === "object" &&
    item !== null &&
    "weaponName" in item &&
    typeof item.weaponName === "string"
  );
};

export const quiveryFilter = (
  filter: string,
  items: ItemInDrop<ItemInPack>[]
) => {
  return items.filter((i) => {
    const item = i.item.item.item;

    if (!isWeapon(item)) return false;

    if (crossbowType.includes(filter)) {
      return item.weaponName === "BOLT_CROSSBOW";
    }

    if (bowType.includes(filter)) {
      return item.weaponName === "ARROW";
    }

    if (slingType.includes(filter)) {
      return item.weaponName === "BULLETS_SLING";
    }

    return false;
  });
};
