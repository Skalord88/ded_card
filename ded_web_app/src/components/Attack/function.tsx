import { findFeatById } from "../Feats/function";
import {
  BonusAbilities,
  weaponLight,
  weaponRanged,
  weaponThrown,
  weaponTwoHanded
} from "../functions";
import {
  Attacks,
  Enchantment, SpecialAttacks,
  Weapon
} from "../interfaces";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { Prerequisite } from "../Prerequisite/interface/Prerequisite";
import { AttackRoll } from "./AttackRoll/interface";

export type SpecialAttacksList = {
  title: string;
  value: number;
};

export const sepcialAttacksToList = (
  prer: SpecialAttacks[]
): SpecialAttacksList[] => {
  const specialAttacksList: SpecialAttacksList[] = [
    {
      title: "bullRush",
      value: prer.reduce((tot, att) => tot + att.bullRush, 0)
    },
    { title: "charge", value: prer.reduce((tot, att) => tot + att.charge, 0) },
    { title: "disarm", value: prer.reduce((tot, att) => tot + att.disarm, 0) },
    {
      title: "grapple",
      value: prer.reduce((tot, att) => tot + att.grapple, 0)
    },
    { title: "sunder", value: prer.reduce((tot, att) => tot + att.sunder, 0) },
    {
      title: "vsBullRush",
      value: prer.reduce((tot, att) => tot + att.vsBullRush, 0)
    },
    {
      title: "vsCharge",
      value: prer.reduce((tot, att) => tot + att.vsCharge, 0)
    },
    {
      title: "vsDisarm",
      value: prer.reduce((tot, att) => tot + att.vsDisarm, 0)
    },
    {
      title: "vsGrapple",
      value: prer.reduce((tot, att) => tot + att.vsGrapple, 0)
    },
    {
      title: "vsOverrun",
      value: prer.reduce((tot, att) => tot + att.vsOverrun, 0)
    },
    {
      title: "vsSunder",
      value: prer.reduce((tot, att) => tot + att.vsSunder, 0)
    }
  ];

  return specialAttacksList.filter(
    (att) => att.title === "grapple" || att.value !== 0
  );
};

export const getWeaponInventoryIndex = (wId: number, invWeapons: Weapon[]) => {
  return invWeapons.findIndex((w) => w.id === wId);
};

// export const modifyAttacks = (
//   charAttacks: Attacks,
//   charInventory: Inventory
// ): Attacks => {
//   if (!charAttacks) {
//     return {
//       firstAttackSetOne: noneWeapon,
//       secondAttackSetOne: noneWeapon,
//       additionalAttackSetOne: noneWeapon,
//       firstAttackSetTwo: noneWeapon,
//       secondAttackSetTwo: noneWeapon,
//       additionalAttackSetTwo: noneWeapon
//     };
//   }

//   const weapons: Weapon[] = [
//     charInventory.weaponOne ?? noneWeapon,
//     charInventory.weaponTwo ?? noneWeapon,
//     charInventory.weaponThree ?? noneWeapon,
//     charInventory.weaponFour ?? noneWeapon,
//     charInventory.weaponFive ?? noneWeapon
//   ];

//   const wOneSetOneIndex = charAttacks.firstAttackSetOne.id
//     ? getWeaponInventoryIndex(charAttacks.firstAttackSetOne.id, weapons)
//     : -1;
//   const wTwoSetOneIndex = charAttacks.secondAttackSetOne.id
//     ? getWeaponInventoryIndex(charAttacks.secondAttackSetOne.id, weapons)
//     : -1;
//   const wAddSetOneIndex = charAttacks.additionalAttackSetOne.id
//     ? getWeaponInventoryIndex(charAttacks.additionalAttackSetOne.id, weapons)
//     : -1;
//   const wOneSetTwoIndex = charAttacks.firstAttackSetTwo.id
//     ? getWeaponInventoryIndex(charAttacks.firstAttackSetTwo.id, weapons)
//     : -1;
//   const wTwoSetTwoIndex = charAttacks.secondAttackSetTwo.id
//     ? getWeaponInventoryIndex(charAttacks.secondAttackSetTwo.id, weapons)
//     : -1;
//   const wAddSetTwoIndex = charAttacks.additionalAttackSetTwo.id
//     ? getWeaponInventoryIndex(charAttacks.additionalAttackSetTwo.id, weapons)
//     : -1;

//   return {
//     firstAttackSetOne:
//       wOneSetOneIndex === -1 || !wOneSetOneIndex
//         ? noneWeapon
//         : weapons[wOneSetOneIndex],
//     secondAttackSetOne:
//       wTwoSetOneIndex === -1 || !wTwoSetOneIndex
//         ? noneWeapon
//         : weapons[wTwoSetOneIndex],
//     additionalAttackSetOne:
//       wAddSetOneIndex === -1 || !wAddSetOneIndex
//         ? noneWeapon
//         : weapons[wAddSetOneIndex],
//     firstAttackSetTwo:
//       wOneSetTwoIndex === -1 || !wOneSetTwoIndex
//         ? noneWeapon
//         : weapons[wOneSetTwoIndex],
//     secondAttackSetTwo:
//       wTwoSetTwoIndex === -1 || !wTwoSetTwoIndex
//         ? noneWeapon
//         : weapons[wTwoSetTwoIndex],
//     additionalAttackSetTwo:
//       wAddSetTwoIndex === -1 || !wAddSetTwoIndex
//         ? noneWeapon
//         : weapons[wAddSetTwoIndex]
//   };
// };

export type AttacksData = {
  bab: number;
  strenght: number;
  dexterity: number;
  finesy: Boolean;
  strThrow: Boolean; // da aggiungere tiratore con ascia, Regionale
  twoFighting: {
    twoFighting: Boolean;
    grtTwoFighting: Boolean;
    impTwoFighting: Boolean;
  };
  charMonoMod: number;
  charTargetMod: AttackRoll[];
  charComposedMod: Prerequisite[];
};

export const getAttacksData = (char: CharToModify): AttacksData => {
  return {
    bab: char.bab + char.adjBonus.bab,
    strenght: BonusAbilities(char.abilitys, "STR"),
    dexterity: BonusAbilities(char.abilitys, "DEX"),
    finesy: findFeatById(char.feats, [116]),
    strThrow: false, // da aggiungere tiratore con ascia, Regionale
    twoFighting: {
      twoFighting: findFeatById(char.feats, [105]),
      impTwoFighting: findFeatById(char.feats, [58]),
      grtTwoFighting: findFeatById(char.feats, [40])
    },
    charMonoMod: char.attackRoll.mono.reduce(
      (tot, at) => tot + Number(at.bonus),
      0
    ),
    charTargetMod: char.attackRoll.target,
    charComposedMod: [...char.attackRoll.composed, ...char.damageBonus.composed]
  };
};

export type WeaponAttackStats = {
  weapon: Weapon;
  pose: number; // 0 = main, 1 = off, 2 = add
  mainTwo: Boolean;
  attacksStr: number[];
  attacksDex: number[];
  attacksOffHandStr: number[];
  attacksOffHandDex: number[];
  malusTwo: number;
  dmgMelee: number;
  dmgDistance: number;
};

export const perfectBns = (ench: Enchantment[]): number => {
  return ench.some((e) => "PERFECT".includes(e.ability)) ? 1 : 0;
};

export const compositeBns = (ench: Enchantment[]): number => {
  return ench.reduce(
    (tot, comp) => (comp.ability === "COMPOSITE" ? tot + 1 : tot),
    0
  );
};

export const getMalus = (
  pose: number,
  offLight: Boolean,
  feats: AttacksData
): number => {
  if (pose === 0 || pose === 2) {
    if (feats.twoFighting.twoFighting && offLight) return -2;
    if (feats.twoFighting.twoFighting) return -4;
    return -6;
  }
  if (pose === 1) {
    if (feats.twoFighting.twoFighting && offLight) return -2;
    if (feats.twoFighting.twoFighting) return -4;
    if (offLight) return -8;
    return -10;
  }
  return 0;
};

export const isType = (list: string[], find: string | undefined): boolean => {
  if (!find || !list) return false;
  return list.includes(find);
};

export const getBonusComposed = (prer: Prerequisite[], w: Weapon): number => {
  const bonusType: number = prer.reduce(
    (tot, p) =>
      tot +
      (isType(w.type, p.weaponType) ? Number(p.attackRoll?.bonus) ?? 0 : 0),
    0
  );
  const bonusItem: number = prer.reduce(
    (tot, p) =>
      tot +
      (p.items?.some((i) => i.id === w.itemId)
        ? Number(p.attackRoll?.bonus) ?? 0
        : 0),
    0
  );
  return bonusType + bonusItem;
};
export const getDmgComposed = (prer: Prerequisite[], w: Weapon): number => {
  const bonusType: number = prer.reduce(
    (tot, p) =>
      tot +
      (isType(w.type, p.weaponType) ? Number(p.damageBonus?.bonus) ?? 0 : 0),
    0
  );
  const bonusItem: number = prer.reduce(
    (tot, p) =>
      tot +
      (p.items?.some((i) => i.id === w.itemId)
        ? Number(p.damageBonus?.bonus) ?? 0
        : 0),
    0
  );
  return bonusType + bonusItem;
};

export const getWeaponAttackStats = (
  w: Weapon,
  pose: number,
  mainTwo: Boolean,
  offLight: Boolean,
  attacksData: AttacksData
): WeaponAttackStats => {
  const att: number[] = [
    attacksData.bab,
    attacksData.bab - 5,
    attacksData.bab - 10,
    attacksData.bab - 15
  ];
  const composedBns: number = getBonusComposed(
    attacksData.charComposedMod.filter((comp) => comp.attackRoll),
    w
  );
  const composedDmg: number = getDmgComposed(
    attacksData.charComposedMod.filter((comp) => comp.damageBonus),
    w
  );
  const attNoZero: number[] = att.filter((att) => att > 0);
  const enchanment: number = w.enchantmentBonus
    ? w.enchantmentBonus
      ? w.enchantmentBonus
      : w.enchantment
      ? perfectBns(w.enchantment)
      : 0
    : 0;
  const enchanmentDmg: number = w.enchantmentBonus ? w.enchantmentBonus : 0;
  const composite: number = w.enchantment ? compositeBns(w.enchantment) : 0;
  const attStr: number[] = attNoZero.map(
    (att) =>
      att +
      attacksData.strenght +
      attacksData.charMonoMod +
      enchanment +
      composedBns
  );
  const attDex: number[] = attNoZero.map(
    (att) =>
      att +
      attacksData.dexterity +
      attacksData.charMonoMod +
      enchanment +
      composedBns
  );
  const offStr: number[] = attacksData.twoFighting.impTwoFighting
    ? [attStr[0], attStr[0] - 5]
    : attacksData.twoFighting.grtTwoFighting
    ? [attStr[0], attStr[0] - 5, attStr[0] - 10]
    : [attStr[0]];
  const offDex: number[] = attacksData.twoFighting.impTwoFighting
    ? [attDex[0], attDex[0] - 5]
    : attacksData.twoFighting.grtTwoFighting
    ? [attDex[0], attDex[0] - 5, attDex[0] - 10]
    : [attDex[0]];
  const finesyAtt: number[] =
    attacksData.finesy && (weaponLight(w) || w.itemId === 40) ? attDex : attStr; // w.itemId === 40 find rapier
  const finesyOffAtt: number[] =
    attacksData.finesy && (weaponLight(w) || w.itemId === 40) ? offDex : offStr; // w.itemId === 40 find rapier
  const dmgStr: number =
    attacksData.strenght +
    (weaponTwoHanded(w) ? Math.floor(attacksData.strenght / 2) : 0) +
    enchanmentDmg +
    composedDmg;
  const dmgOffStr: number =
    Math.floor(attacksData.strenght / 2) + enchanmentDmg + composedDmg;
  // pose === 0 && console.log("w: ", w)
  return {
    weapon: w,
    pose: pose,
    mainTwo: mainTwo,
    attacksStr: finesyAtt,
    attacksDex: attDex,
    attacksOffHandStr: pose === 1 ? finesyOffAtt : finesyAtt,
    attacksOffHandDex: pose === 1 ? offDex : attDex,
    malusTwo: getMalus(pose, offLight, attacksData),
    dmgMelee: pose === 1 ? dmgOffStr : dmgStr,
    dmgDistance: weaponThrown(w)
      ? pose === 1
        ? dmgOffStr
        : dmgStr
      : enchanmentDmg + composite + composedDmg
  };
};

export type DisplayAttType = [
  { show: Boolean; type: string; att: number[]; dmg: number },
  { show: Boolean; type: string; att: number[]; dmg: number },
  { show: Boolean; type: string; att: number[]; dmg: number },
  { show: Boolean; type: string; att: number[]; dmg: number }
];

export const getShowMelee = (
  pose: number, // che mano
  mainTwo: Boolean, // arma uno 2 mani
  ranged: Boolean, // arma e' ranged
  twoHand: Boolean // arma e' 2 mani
): Boolean => {
  // ranged?
  if (ranged) return false;
  // pose 1
  if (pose === 1) {
    if (twoHand) return false;
    if (mainTwo) return false;
  }
  return true;
};
export const getShowMelTwoHand = (
  pose: number, // che mano
  mainTwo: Boolean, // arma uno 2 mani
  ranged: Boolean, // arma e' ranged
  twoHand: Boolean // arma e' 2 mani
): Boolean => {
  // ranged?
  if (ranged) return false;
  if (pose === 1 || pose === 2) {
    if (mainTwo) return false;
  }
  return true;
};
export const getShowDistance = (
  pose: number, // che mano
  mainTwo: Boolean, // arma uno 2 mani
  ranged: Boolean, // arma e' ranged
  thrown: Boolean, // arma e' tirabile
  twoHand: Boolean // arma e' 2 mani
): Boolean => {
  if (ranged || thrown) {
    if (pose === 1) {
      if (mainTwo) return false;
    }
    return true;
  }
  return false;
};
export const getShowDisTwoHand = (
  pose: number, // che mano
  mainTwo: Boolean, // arma uno 2 mani
  ranged: Boolean, // arma e' ranged
  thrown: Boolean, // arma e' tirabile
  twoHand: Boolean // arma e' 2 mani
): Boolean => {
  if (mainTwo) return false;
  if (ranged || thrown) {
    return true;
  }
  return false;
};

export const getDisplayAttType = (
  weaponStat: WeaponAttackStats
): DisplayAttType => {
  return [
    {
      show: getShowMelee(
        weaponStat.pose,
        weaponStat.mainTwo,
        weaponRanged(weaponStat.weapon),
        weaponTwoHanded(weaponStat.weapon)
      ),
      type: "melee",
      att: weaponStat.attacksStr,
      dmg: weaponStat.dmgMelee
    },
    {
      show: getShowMelTwoHand(
        weaponStat.pose,
        weaponStat.mainTwo,
        weaponRanged(weaponStat.weapon),
        weaponTwoHanded(weaponStat.weapon)
      ),
      type: "melTwoHand",
      att: weaponStat.attacksOffHandStr.map((att) => att + weaponStat.malusTwo),
      dmg: weaponStat.dmgMelee
    },
    {
      show: getShowDistance(
        weaponStat.pose,
        weaponStat.mainTwo,
        weaponRanged(weaponStat.weapon),
        weaponThrown(weaponStat.weapon),
        weaponTwoHanded(weaponStat.weapon)
      ),
      type: "distance",
      att: weaponStat.attacksDex,
      dmg: weaponStat.dmgDistance
    },
    {
      show: getShowDisTwoHand(
        weaponStat.pose,
        weaponStat.mainTwo,
        weaponRanged(weaponStat.weapon),
        weaponThrown(weaponStat.weapon),
        weaponTwoHanded(weaponStat.weapon)
      ),
      type: "disTwoHand",
      att: weaponStat.attacksOffHandDex.map((att) => att + weaponStat.malusTwo),
      dmg: weaponStat.dmgDistance
    }
  ];
};

export type AttacksSet = {
  stat: WeaponAttackStats;
  display: DisplayAttType;
}[];

export type AttackElement = {
  targetMod: AttackRoll[];
  composedMod: Prerequisite[];
  titleOne: string;
  setOne: [
    { stat: WeaponAttackStats; display: DisplayAttType },
    { stat: WeaponAttackStats; display: DisplayAttType },
    { stat: WeaponAttackStats; display: DisplayAttType }
  ];
  titleTwo: string;
  setTwo: [
    { stat: WeaponAttackStats; display: DisplayAttType },
    { stat: WeaponAttackStats; display: DisplayAttType },
    { stat: WeaponAttackStats; display: DisplayAttType }
  ];
};

export const createAttackDisplay = (
  attacksData: AttacksData,
  attacks: Attacks
): AttackElement => {
  let lightOff: Boolean = weaponLight(attacks.secondAttackSetOne);
  let mainTwo: Boolean = weaponTwoHanded(attacks.firstAttackSetOne);
  const wOneSetOne: WeaponAttackStats = getWeaponAttackStats(
    attacks.firstAttackSetOne, //w
    0, // pose
    mainTwo, // main 2 handed
    lightOff, // off hand light
    attacksData
  );
  const wTwoSetOne: WeaponAttackStats = getWeaponAttackStats(
    attacks.secondAttackSetOne,
    1,
    mainTwo,
    lightOff,
    attacksData
  );
  const wAddSetOne: WeaponAttackStats = getWeaponAttackStats(
    attacks.additionalAttackSetOne,
    2,
    mainTwo,
    lightOff,
    attacksData
  );

  lightOff = weaponLight(attacks.secondAttackSetTwo);
  mainTwo = weaponTwoHanded(attacks.firstAttackSetTwo);
  const wOneSetTwo: WeaponAttackStats = getWeaponAttackStats(
    attacks.firstAttackSetTwo,
    0,
    mainTwo,
    lightOff,
    attacksData
  );
  const wTwoSetTwo: WeaponAttackStats = getWeaponAttackStats(
    attacks.secondAttackSetTwo,
    1,
    mainTwo,
    lightOff,
    attacksData
  );
  const wAddSetTwo: WeaponAttackStats = getWeaponAttackStats(
    attacks.additionalAttackSetTwo,
    2,
    mainTwo,
    lightOff,
    attacksData
  );
  return {
    targetMod: attacksData.charTargetMod,
    composedMod: attacksData.charComposedMod,
    titleOne: "Set One",
    setOne: [
      { stat: wOneSetOne, display: getDisplayAttType(wOneSetOne) },
      { stat: wTwoSetOne, display: getDisplayAttType(wTwoSetOne) },
      { stat: wAddSetOne, display: getDisplayAttType(wAddSetOne) }
    ],
    titleTwo: "Set Two",
    setTwo: [
      { stat: wOneSetTwo, display: getDisplayAttType(wOneSetTwo) },
      { stat: wTwoSetTwo, display: getDisplayAttType(wTwoSetTwo) },
      { stat: wAddSetTwo, display: getDisplayAttType(wAddSetTwo) }
    ]
  };
};
