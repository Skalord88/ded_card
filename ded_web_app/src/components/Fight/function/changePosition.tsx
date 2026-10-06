import { AttackSelection, ClickMenu } from "../../../pages/Fight";

const weaponMap = {
  w1: { group: "I", index: 0 },
  w2: { group: "I", index: 1 },
  wA: { group: "I", index: 0 },

  w21: { group: "II", index: 0 },
  w22: { group: "II", index: 1 },
  w2A: { group: "II", index: 0 }
} as const;

export const changePosition = (
  position: string,
  clickMenu: AttackSelection
): ClickMenu => {
  // A, B, C...
  if (!(position in weaponMap)) {
    return [clickMenu.menu[0], clickMenu.menu[1], position];
  }

  const info = weaponMap[position as keyof typeof weaponMap];

  const [first, second, defence] = clickMenu.menu;

  // ------------------------------------------
  // Quale gruppo è attualmente selezionato?
  // ------------------------------------------

  const currentGroup =
    first !== null
      ? weaponMap[first as keyof typeof weaponMap].group
      : second !== null
        ? weaponMap[second as keyof typeof weaponMap].group
        : null;

  // ------------------------------------------
  // Cambio gruppo
  // ------------------------------------------

  if (currentGroup !== null && currentGroup !== info.group) {
    return [position, null, defence];
  }

  // ------------------------------------------
  // Stesso gruppo
  // ------------------------------------------

  // w1 / wA
  // Sono alternative: una sostituisce l'altra.
  if (info.index === 0) {
    return [position, second, defence];
  }

  // w2
  // È l'arma aggiuntiva.
  if (info.index === 1) {
    return [first, position, defence];
  }

  return [first, second, defence];
};