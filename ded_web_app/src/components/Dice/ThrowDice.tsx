export type ThrowDiceProps = {
    dice?: number,
    value: number,
    target?: number
}

export const ThrowDice: React.FC<ThrowDiceProps> = ({ dice, value }) => {
    return <p>
        {dice ?? 0}{value > 0 ? " + " : " "}{value} = {dice ?? 0 + value}
        </p>;
  };

export const ThrownResultat: React.FC<ThrowDiceProps> = ({value, target}) => {
    return <p>{value > (target ?? 0) ? "hit!" : "miss :("}</p>
}