import { SavingProps } from "../Saving/Saving"

export type SavingSummaryProps = {
    saving: SavingProps | undefined
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