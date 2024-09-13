export type ThrowDiceProps = {
    dice: number,
    value: number
}

export const ThrowDice: React.FC<ThrowDiceProps> = ({ dice, value }) => {
    return <div>{dice} + {value} = {dice + value}</div>;
  };
  