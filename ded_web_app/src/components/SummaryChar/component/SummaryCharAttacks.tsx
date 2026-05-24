import {
    MapAllAttacks,
    SummaryCharProps,
    TotAndBonus,
    TotAndBonusElement
} from "../SummaryChar";

export type SummaryCharAttacksTemplateProps = {
  children: React.ReactNode;
};

export const SummaryCharAttacksTemplate: React.FC<
  SummaryCharAttacksTemplateProps
> = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gap: "10px",
        alignItems: "center"
      }}
    >
      {children}
    </div>
  );
};

export const SummaryCharAttacks: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const meleeAttackList: TotAndBonusElement[] = [
    ...(modCharacter.attacks?.firstMelee.listBabMeleeSpecificBonus?.[0] || [])
  ];

  const meleeDamageList: TotAndBonusElement[] =
    modCharacter.attacks?.firstMelee?.toListMeleeDamage || [];

  const rangedAttackList: TotAndBonusElement[] = [
    ...(modCharacter.attacks?.firstRanged?.listBabRangedSpecificBonus?.[0] ||
      [])
  ];

  const rangedDamageList: TotAndBonusElement[] = [
    ...(modCharacter.attacks?.firstRanged?.toListRangedDamage || [])
  ];
  return (
    <>
      <div>
        <p>Attack:</p>
      </div>
      <div>
        {/* Melee */}
        <SummaryCharAttacksTemplate>
          <TotAndBonus show={false} firstSign={true} list={meleeAttackList} />

          <div>
            <span>{modCharacter.attacks?.firstMelee?.weapon?.name}</span>
          </div>

          <div>
            <span>{modCharacter.attacks?.firstMelee?.weapon?.damage}</span>

            <TotAndBonus show={false} firstSign={true} list={meleeDamageList} />
          </div>
        </SummaryCharAttacksTemplate>

        {/* Ranged */}
        {modCharacter.attacks?.firstRanged && (
          <SummaryCharAttacksTemplate>
            <div>
              <TotAndBonus
                show={false}
                firstSign={true}
                list={rangedAttackList}
              />
            </div>

            <div>
              <span>{modCharacter.attacks.firstRanged.weapon?.name}</span>
            </div>

            <div>
              <span>{modCharacter.attacks?.firstRanged?.weapon?.damage}</span>

              <TotAndBonus
                show={false}
                firstSign={true}
                list={rangedDamageList}
              />
            </div>
          </SummaryCharAttacksTemplate>
        )}
      </div>
      <div>
        <p>Full Attack:</p>
      </div>
      <div>
        <MapAllAttacks modCharacter={modCharacter} />
      </div>
    </>
  );
};
