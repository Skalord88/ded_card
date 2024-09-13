export type WeaponThrowDiceProps = {
  dices: number[];
  values: number[];
};

export const WeaponThrowDice: React.FC<WeaponThrowDiceProps> = ({
  dices,
  values
}) => {
  let results: { dice: number; value: number }[] = [];

  for (let i = 0; i < dices.length; i++) {
    results.push({ dice: dices[i], value: values[i] });
  }

  return (
    <>
      {results.map((res, index) => {
        return (
          <p key={index}>
            {res.dice} + {res.value} = {res.dice + res.value}
          </p>
        );
      })}
    </>
  );
};
