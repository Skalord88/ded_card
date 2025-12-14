export type Alignment = {
    id: number
    name: string
    description: string
    opposingAlignment: string
}

export const AlignmentMap: Record<string, string> = {
    LG: "Lawful Good",
    NG: "Neutral Good",
    CG: "Chaotic Good",
    LN: "Lawful Neutral",
    N: "Neutral",
    CN: "Chaotic Neutral",
    LE: "Lawful Evil",
    NE: "Neutral Evil",
    CE: "Chaotic Evil"
};

