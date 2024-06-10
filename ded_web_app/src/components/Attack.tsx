import { useState } from "react";
import {
  SzithMorcaneSentryOne,
  SzithMorcaneSentryThree,
  SzithMorcaneSentryTwo
} from "./Monsters";
import { Monster, MonsterAttack } from "./interfaces";
import { randomInt } from "crypto";
import { CountMonsterArmor } from "./functions";

export function FightAttack() {
  const [attacker, setAttacker] = useState<Monster>();
  const [defender, setDefender] = useState<Monster>();
  const [att, setAtt] = useState<MonsterAttack>();

  const list = [
    SzithMorcaneSentryOne,
    SzithMorcaneSentryTwo,
    SzithMorcaneSentryThree
  ];

  const handleAttack = (a: MonsterAttack, d: Monster) => {
    let hit = false;
    const dAC = CountMonsterArmor(d.armorClass);
    a.attack.forEach(attacco => {
        // const d: number = randomInt(1,20)
        // (d + attacco >= dAC)? hit = true : hit = false
    })
  };

  return (
    <>
      <p>select fighters:</p>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <ul>
            <p>Attacker</p>
            {list.map((monster) => {
              return (
                <>
                  <li key={monster.id} onClick={() => setAttacker(monster)}>
                    {monster.characterName}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <ul>
            <p>Defender</p>
            {list.map((monster) => {
              return (
                <>
                  <li key={monster.id} onClick={() => setDefender(monster)}>
                    {monster.characterName}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
      <br></br>
      <div style={{ display: "flex" }}>
        {attacker ? (
          <div style={{ flex: 2 }}>
            <p>{attacker.characterName}:</p>
            {attacker.attacks.map((a) => {
              return (
                <>
                  <p onClick={() => setAtt(a)}>
                    {a.attack.map((n) => {
                      return <>+{n}</>;
                    })}{" "}
                    {a.weapon} {a.damage} {a.critic}
                  </p>
                </>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        {defender ? (
          <div style={{ flex: 1 }}>
            <p>{defender.characterName}</p>
            <>
              {att ? (
                <>
                  <button onClick={() => handleAttack(att, defender)}>
                    attack!
                  </button>
                </>
              ) : (
                <></>
              )}
            </>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
