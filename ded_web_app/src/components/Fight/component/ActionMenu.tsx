import { useEffect, useMemo, useState } from "react";
import {} from "../../../pages/Fight";
import { DropdownComponent } from "../../DropDown/DropDown";
import { addToDrop } from "../../functions";
import { ItemInPack } from "../../interfaces";
import { ModifiedCharacter } from "../../ModifiedCharacter/interface/ModifiedCharacter";
import {
  ENCHANTMENT_BONUS,
  ModifierEnum
} from "../../Prerequisite/interface/ModifierEnum";
import { TotAndBonusElement } from "../../SummaryChar/component/TotAndBonus";
import { changePosition } from "../function/changePosition";
import { createAttackOptions } from "../function/createAttackOptions";
import { createBorder } from "../function/createBorder";
import {
  createDefenceOptions,
  FightOptions
} from "../function/createDefenceOptions";
import { positionInIndexInMenuBFight } from "../function/Menu";
import { showBabListByIndex } from "../function/showBabListByIndex";
import { showDmgListByIndex } from "../function/showDmgListByIndex";
import { OneAttackOptionsElement } from "./OneAttackOptionsElement";
import { OneDefendOptionsElement } from "./OneDefendOptionsElement";
import { ThrowDice, ThrowDicePropsWeapon } from "./ThrowDice";
import { quiveryFilter } from "../function/quiverFunction";

export type ActionMenuProps = {
  charAB?: [ModifiedCharacter, ModifiedCharacter];
  optionAction?: string;
};

export type ClickMenu = [string | null, string | null, string];

type AttackCounter = {
  [position: string]: [number, boolean | undefined];
};

export type AttackSelection = {
  menu: ClickMenu;
  counters: AttackCounter;
};

export const ActionMenu: React.FC<ActionMenuProps> = ({
  charAB,
  optionAction
}) => {
  const [attackSelection, setAttackSelection] = useState<AttackSelection>({
    menu: ["w1", null, "A"],
    counters: {
      w1: [0, undefined],
      w2: [0, undefined],
      wA: [0, undefined],
      w21: [0, undefined],
      w22: [0, undefined],
      wA2: [0, undefined]
    }
  });
  const [ammoSelection, setAmmoSelection] = useState<{
    position: string;
    ammoName: string;
    ammo: {
      bonus: number;
      text?: string;
      pop: ModifierEnum;
    };
  } | null>(null);

  const defenceOptions: FightOptions[] =
    charAB && charAB.length > 1
      ? createDefenceOptions(charAB[1], optionAction)
      : [];

  const attackOptions = useMemo(
    () =>
      charAB && charAB.length > 0
        ? createAttackOptions(charAB[0], optionAction)
        : [],
    [charAB, optionAction]
  );

  const deselectAttackSelection = (index: string) => {
    setAttackSelection((prev) => ({
      ...prev,
      menu: [
        prev.menu[0] === index ? null : prev.menu[0],
        prev.menu[1] === index ? null : prev.menu[1],
        prev.menu[2]
      ]
    }));
  };

  const handleWeaponClick = (position: string, isThrown?: boolean) => {
    setAttackSelection((prev) => {
      const oldMenu = prev.menu;
      const newMenu = changePosition(position, prev);

      const oldCounter = prev.counters[position] ?? 0;

      const addingSecondWeapon =
        oldMenu[0] !== null && oldMenu[1] === null && oldMenu[0] !== position;

      const counter = addingSecondWeapon ? 1 : oldCounter[0] === 0 ? 1 : 0;

      return {
        menu: newMenu,
        counters: {
          ...prev.counters,
          [position]:
            isThrown !== undefined ? [counter, isThrown] : [counter, undefined]
        }
      };
    });
  };

  const handleThrowClick = (position: string, isThrown: boolean) => {
    setAttackSelection((prev) => ({
      ...prev,
      counters: {
        ...prev.counters,
        [position]: [
          prev.counters[position]
            ? prev.counters[position][0]
            : prev.counters[position],
          isThrown
        ]
      }
    }));
  };

  const handleAmmoSelection = (a: ItemInPack, index: string) => {
    setAmmoSelection({
      position: index,
      ammoName: a.item.name || "ammo",
      ammo: {
        bonus: a.item.enchantmentBonus ?? 0,
        pop:
          a.item.enchantmentBonus !== -1
            ? ENCHANTMENT_BONUS
            : { text: "perfect ammo" }
      }
    });
  };

  useEffect(() => {
    if (ammoSelection && ammoSelection.position !== attackSelection.menu[0]) {
      setAmmoSelection(null);
    }
  }, [attackSelection, ammoSelection]);

  const throwDiceWeapon = useMemo(() => {
    const positions = [attackSelection.menu[0], attackSelection.menu[1]];

    return positions.map((position) => {
      if (position === null) {
        return null;
      }

      const att = attackOptions.find((a) => a.area === position);

      if (!att?.element?.weapon) {
        return null;
      }

      const element = att.element;

      const listBabBonus = [
        element.listBabMeleeSpecificBonus ?? [],
        element.listBabRangedSpecificBonus ?? [],
        element.listBabMeleeTwoWeaponSpecificBonus ?? [],
        element.listBabRangedTwoWeaponSpecificBonus ?? []
      ];

      const listDamage = [
        element.toListMeleeDamage ?? [],
        element.toListRangedDamage ?? [],
        element.toListMeleeTwoWeaponDamage ?? [],
        element.toListRangedTwoWeaponDamage ?? []
      ];

      const ranged = element.weaponRanged ?? false;

      const counter = attackSelection.counters[position];

      const hasTwoWeapons =
        attackSelection.menu[0] !== null && attackSelection.menu[1] !== null;

      // 1. Calcolo base delle liste
      const listBab: TotAndBonusElement[][] = showBabListByIndex(
        listBabBonus,
        hasTwoWeapons,
        counter[0],
        ranged,
        element.weaponThrown ?? false,
        counter[1],
        element.weaponTwoHanded ?? false
      );

      const listDmg: TotAndBonusElement[] = showDmgListByIndex(
        listDamage,
        hasTwoWeapons,
        counter[0],
        ranged,
        element.weaponThrown ?? false,
        counter[1],
        element.weaponTwoHanded ?? false
      );

      // 2. Logica Ammunition vs Weapon Enhancement (3.5e Rule: Take the Better)
      const isNewAmmoSelected = ammoSelection?.position === position;

      const newListBab = isNewAmmoSelected
        ? listBab.map((babArr) =>
            babArr.map((el) => {
              if (el.text === "enchantmentBonus") {
                return {
                  ...el,
                  bonus: Math.max(el.bonus, ammoSelection!.ammo.bonus),
                  text:
                    ammoSelection!.ammo.bonus > el.bonus
                      ? "enchantmentBonus (ammo)"
                      : el.text
                };
              }
              return el;
            })
          )
        : listBab;

      const newListDamage = isNewAmmoSelected
        ? listDmg.map((dmgEl) => {
            if (dmgEl.text === "enchantmentBonus") {
              return {
                ...dmgEl,
                bonus: Math.max(dmgEl.bonus, ammoSelection!.ammo.bonus)
              };
            }
            return dmgEl;
          })
        : listDmg;

      // 3. Restituisce l'oggetto finale
      return {
        position,
        weapon: element.weapon,
        listBab: newListBab,
        listDamage: newListDamage // Usa la lista aggiornata
      };
    }) as [ThrowDicePropsWeapon | null, ThrowDicePropsWeapon | null];
  }, [attackSelection, attackOptions, ammoSelection]);

  const quiver =
    charAB && charAB[0].inventory?.quiver
      ? addToDrop(charAB[0].inventory?.quiver, (a) => a.item.name ?? "ammo")
      : null;
  return (
    <div
      className="rpgui-container-framed grey"
      style={{ flex: 3, display: "flex" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateAreas: `
              "w1 w2"
              "wA ."
              "w21 w22"
              "w2A ."
            `,
          gap: 4
        }}
      >
        {attackOptions.map((att, indexAtt) => {
          if (att.show === false) return null;
          const actualListBab =
            throwDiceWeapon[0]?.position === att.area
              ? throwDiceWeapon[0]?.listBab
              : throwDiceWeapon[1]?.position === att.area
                ? throwDiceWeapon[1]?.listBab
                : [];
          const actualListDamage =
            throwDiceWeapon[0]?.position === att.area
              ? throwDiceWeapon[0]?.listDamage
              : throwDiceWeapon[1]?.position === att.area
                ? throwDiceWeapon[1]?.listDamage
                : [];

          const currentCounter = attackSelection.counters[att.area];
          const counter = Array.isArray(currentCounter)
            ? currentCounter[0]
            : currentCounter;
          return (
            <div style={{ gridArea: att.area }} key={indexAtt}>
              {/* <p>{attackSelection.counters[att.area]}</p> */}
              <OneAttackOptionsElement
                att={att}
                myIndex={att.area}
                indexOne={attackSelection.menu[0]}
                indexTwo={attackSelection.menu[1]}
                onAction={(isThrown, toTwo) =>
                  handleWeaponClick(
                    att.area,
                    isThrown
                    // , toTwo
                  )
                }
                onThrow={(isThrown) => handleThrowClick(att.area, isThrown)}
                // onToTwo={(toTwo) => handleWeaponClick(att.area, toTwo)}
                onDeAction={() => deselectAttackSelection(att.area)}
                counter={counter}
                listBabBonus={actualListBab}
                listDamage={actualListDamage}
              />
              {att.element?.weaponRanged &&
                quiver &&
                att.area === attackSelection.menu[0] && (
                  <div>
                    <p>Quiver: {ammoSelection?.ammoName}</p>
                    <DropdownComponent
                      options={quiveryFilter(
                        att?.element?.weapon?.weaponName ?? "",
                        quiver
                      )}
                      onAction={(a) => handleAmmoSelection(a, att.area)}
                    />
                  </div>
                )}
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1 }} className="rpgui-container-framed grey">
        {throwDiceWeapon && (
          <ThrowDice
            weapons={throwDiceWeapon}
            target={
              defenceOptions[
                positionInIndexInMenuBFight(attackSelection.menu[2])
              ].number
            }
          />
        )}
      </div>
      <div style={{ flex: 1 }}>
        {defenceOptions.map((ca, indexCA) => {
          const border: string = createBorder(
            attackSelection.menu[2] ===
              (indexCA === 0 ? "A" : indexCA === 1 ? "B" : "C")
          );
          return (
            <div
              key={indexCA}
              className={border}
              onClick={() =>
                handleWeaponClick(
                  indexCA === 0 ? "A" : indexCA === 1 ? "B" : "C"
                )
              }
            >
              {optionAction && (
                <OneDefendOptionsElement
                  option={optionAction}
                  index={indexCA}
                  def={ca}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
