import { findFeatById } from "../Feats/function";
import {
  BonusAbilities,
  weaponLight,
  weaponRanged,
  weaponThrown,
  weaponTwoHanded
} from "../functions";
import { Attacks, Enchantment, SpecialAttacks, Weapon } from "../interfaces";
import { findAttackRollPrerequisite } from "../Prerequisite/functions/findSpecificPrerequisite";
import {
  AttackRollElement,
  CharToModify,
  FeatsFromChar
} from "../Prerequisite/functions/modifyCharacter";
import { Prerequisite } from "../Prerequisite/interface/Prerequisite";
import { noneWeapon } from "../variables";
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

export const modifyAttacks = (char: CharToModify): Attacks => {
  const attacks: Attacks = char.attacks;
  const weaponList: Weapon[] = [
    char.inventory.weaponOne,
    char.inventory.weaponTwo,
    char.inventory.weaponThree,
    char.inventory.weaponFour,
    char.inventory.weaponFive
  ];
  return {
    ...attacks,
    firstAttackSetOne:
      weaponList.find((weapon) =>
        weapon !== null && attacks.firstAttackSetOne
          ? weapon.id === attacks.firstAttackSetOne.id
          : false
      ) || noneWeapon,
    secondAttackSetOne:
      weaponList.find((weapon) =>
        weapon && attacks.secondAttackSetOne
          ? weapon.id === attacks.secondAttackSetOne.id
          : false
      ) || noneWeapon,
    additionalAttackSetOne:
      weaponList.find((weapon) =>
        weapon && attacks.additionalAttackSetOne
          ? weapon.id === attacks.additionalAttackSetOne.id
          : false
      ) || noneWeapon,

    firstAttackSetTwo:
      weaponList.find((weapon) =>
        weapon && attacks.firstAttackSetTwo
          ? weapon.id === attacks.firstAttackSetTwo.id
          : false
      ) || noneWeapon,
    secondAttackSetTwo:
      weaponList.find((weapon) =>
        weapon && attacks.secondAttackSetTwo
          ? weapon.id === attacks.secondAttackSetTwo.id
          : false
      ) || noneWeapon,
    additionalAttackSetTwo:
      weaponList.find((weapon) =>
        weapon && attacks.additionalAttackSetTwo
          ? weapon.id === attacks.additionalAttackSetTwo.id
          : false
      ) || noneWeapon
  };
};

function collectPrerequisites(weapon: Weapon): Prerequisite[] {
  const prerequisites: Prerequisite[] = [];

  // Aggiungi il prerequisite della weapon se non è null
  if (weapon.modifiers) {
    prerequisites.push(weapon.modifiers);
  }

  // Aggiungi i prerequisite degli enchantment se non sono nulli
  const enchantmentPrerequisites = weapon.enchantment
    .map((enchantment) => enchantment.modifiers)
    .filter((modifier) => modifier !== null) as Prerequisite[];

  // Combina i risultati
  prerequisites.push(...enchantmentPrerequisites);

  return prerequisites;
}

function collectMono(prerequisites: Prerequisite[]): number {
  return prerequisites.reduce((maxBonus, pre) => {
    const bonus = pre.attackRoll?.bonus ?? 0; // Ottieni il bonus o 0 se non definito
    return Math.max(maxBonus, Number(bonus)); // Confronta il massimo corrente con il bonus attuale
  }, 0);
}

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
      twoFighting: findFeatById(char.feats, [115]),
      grtTwoFighting: findFeatById(char.feats, [40]),
      impTwoFighting: findFeatById(char.feats, [59])
    },
    charMonoMod: char.attackRoll.mono.reduce(
      (tot, at) => tot + Number(at.bonus),
      0
    ),
    charTargetMod: char.attackRoll.target,
    charComposedMod: char.attackRoll.composed
  };
};

export type WeaponAttackStats = {
  weapon: Weapon;
  pose: number; // 0 = main, 1 = off, 2 = add
  mainTwo: Boolean;
  attacksStr: number[];
  attacksDex: number[];
  malusTwo: number;
  dmgMelee: number;
  dmgDistance: number;
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
  let attack: number = 0;
  if (!offLight && (pose === 0 || pose === 2)) attack = -6;
  if (!offLight && pose === 1) attack = -10;
  if (offLight && (pose === 0 || pose === 2)) attack = -4;
  if (offLight && pose === 1) attack = -8;
  if (feats.twoFighting.twoFighting && pose === 1) attack = -4;
  if (feats.twoFighting.twoFighting && offLight) attack = -2;

  return attack;
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
  const attNoZero: number[] = att.filter((att) => att > 0);
  const enchanment: number = w.enchantment.reduce(
    (tot, enchantment) => tot + enchantment.enchantment,
    0
  );
  const enchanmentDmg: number = w.enchantment.reduce(
    (tot, enchantment) => tot + enchantment.enchantment,
    0
  );
  const composite: number = compositeBns(w.enchantment);
  return {
    weapon: w,
    pose: pose,
    mainTwo: mainTwo,
    attacksStr: attNoZero.map(
      (att) => att + attacksData.strenght + attacksData.charMonoMod + enchanment
    ),
    attacksDex: attNoZero.map(
      (att) =>
        att + attacksData.dexterity + attacksData.charMonoMod + enchanment
    ),
    malusTwo: getMalus(pose, offLight, attacksData),
    dmgMelee:
      attacksData.strenght +
      (weaponTwoHanded(w) ? Math.floor(attacksData.strenght / 2) : 0) +
      enchanmentDmg,
    dmgDistance: enchanmentDmg + composite
  };
};

export type DisplayAttType = [
  { show: Boolean; type: string; att: number[]; dmg: number },
  { show: Boolean; type: string; att: number[]; dmg: number },
  { show: Boolean; type: string; att: number[]; dmg: number },
  { show: Boolean; type: string; att: number[]; dmg: number }
];

export const getShowMelee = (
  pose: number,
  mainTwo: Boolean,
  ranged: Boolean,
  twoHand: Boolean
): Boolean => {
  // pose 0 and 2
  if (pose === 0 || pose === 2) {
    if (ranged) return false;
  }
  // pose 1
  if (pose === 1) {
    if (mainTwo) return false;
  }
  return true;
};
export const getShowMelTwoHand = (
  pose: number,
  mainTwo: Boolean,
  ranged: Boolean,
  twoHand: Boolean
): Boolean => {
  // pose 0 and 2
  if (pose === 0 || pose === 2) {
    if (ranged) return false;
    if (twoHand) return false;
  }
  // pose 1
  if (pose === 1) {
    if (mainTwo) return false;
  }
  return true;
};
export const getShowDistance = (
  pose: number,
  mainTwo: Boolean,
  ranged: Boolean,
  thrown: Boolean,
  twoHand: Boolean
): Boolean => {
  // pose 0 and 2
  if (pose === 0 || pose === 2) {
    if (thrown) return true;
    if (ranged) return true;
  }
  // pose 1
  if (pose === 1) {
    if (mainTwo) return false;
    if (thrown) return true;
    if (ranged) return true;
  }
  return false;
};
export const getShowDisTwoHand = (
  pose: number,
  mainTwo: Boolean,
  ranged: Boolean,
  thrown: Boolean,
  twoHand: Boolean
): Boolean => {
  // pose 0 and 2
  if (pose === 0 || pose === 2) {
    if (thrown) return true;
    if (ranged) return true;
  }
  // pose 1
  if (pose === 1) {
    if (mainTwo) return false;
    if (thrown) return true;
    if (ranged) return true;
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
      att: weaponStat.attacksStr.map((att) => att + weaponStat.malusTwo),
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
      att: weaponStat.attacksDex.map((att) => att + weaponStat.malusTwo),
      dmg: weaponStat.dmgDistance
    }
  ];
};

export type AttacksSet = {
  stat: WeaponAttackStats;
  display: DisplayAttType;
}[];

export type AttackElement = {
  titleOne: string;
  targetMod: AttackRoll[];
  composedMod: Prerequisite[];
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

export const createAttackDisplay = (char: CharToModify): AttackElement => {
  const attacksData: AttacksData = getAttacksData(char);
  let lightOff: Boolean = weaponLight(char.attacks.secondAttackSetOne);
  let mainTwo: Boolean = weaponTwoHanded(char.attacks.firstAttackSetOne);
  const wOneSetOne: WeaponAttackStats = getWeaponAttackStats(
    char.attacks.firstAttackSetOne,
    0,
    true,
    lightOff,
    attacksData
  );
  const wTwoSetOne: WeaponAttackStats = getWeaponAttackStats(
    char.attacks.secondAttackSetOne,
    1,
    mainTwo,
    lightOff,
    attacksData
  );
  const wAddSetOne: WeaponAttackStats = getWeaponAttackStats(
    char.attacks.additionalAttackSetOne,
    2,
    true,
    lightOff,
    attacksData
  );

  lightOff = weaponLight(char.attacks.secondAttackSetTwo);
  mainTwo = weaponTwoHanded(char.attacks.firstAttackSetTwo);
  const wOneSetTwo: WeaponAttackStats = getWeaponAttackStats(
    char.attacks.firstAttackSetTwo,
    0,
    true,
    lightOff,
    attacksData
  );
  const wTwoSetTwo: WeaponAttackStats = getWeaponAttackStats(
    char.attacks.secondAttackSetTwo,
    1,
    mainTwo,
    lightOff,
    attacksData
  );
  const wAddSetTwo: WeaponAttackStats = getWeaponAttackStats(
    char.attacks.additionalAttackSetTwo,
    2,
    true,
    lightOff,
    attacksData
  );
  return {
    titleOne: "Set One",
    targetMod: attacksData.charTargetMod,
    composedMod: attacksData.charComposedMod,
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
