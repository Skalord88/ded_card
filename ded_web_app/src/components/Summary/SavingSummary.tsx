import { savingThrows } from "../interfaces"
import { SavingProps } from "../Saving/Saving"

export type SavingSummaryProps = {
    saving: SavingProps
}

export const SavingSummary: React.FC<SavingSummaryProps> = ({ saving }) => {
    return(
        <p>
            Fort: {saving?.forTot.number}
            {" / Ref: "}
            {saving?.refTot.number}
            {" / Will: "}
            {saving?.willTot.number}
          </p>
    )
}

export const SavingSummaryOnlyChar: React.FC<savingThrows> = ({ fortitude, reflex, will }) => {
    return(
        <p>
            Fort: {fortitude}
            {" / Ref: "}
            {reflex}
            {" / Will: "}
            {will}
          </p>
    )
}