export type ThrowProps = {
    dice: number,
    value: number
}

export const Throw: React.FC<ThrowProps> = ({ dice, value }) => {
    return <p>{dice} + {value} = {dice + value}</p>
}