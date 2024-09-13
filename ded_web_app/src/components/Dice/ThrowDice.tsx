export type ThrowDiceProps = {
    dice: number,
    value: number
}

export const ThrowDice: React.FC<ThrowDiceProps> = ({ dice, value }) => {
    return <p>{dice} + {value} = {dice + value}</p>
}