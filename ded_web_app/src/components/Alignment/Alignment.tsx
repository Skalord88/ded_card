export type Alignment = {
    id: number
    name: AlignmentEnum
    description: string
    opposingAlignment: string
}

export enum AlignmentEnum {
    LG = "Lawful Good",
    NG = "Neutral Good",
    CG = "Chaotic Good",
    LN = "Lawful Neutral",
    N = "Neutral",
    CN = "Chaotic Neutral",
    LE = "Lawful Evil",
    NE = "Neutral Evil",
    CE = "Chaotic Evil"
}