export type SavingThrow = {
    fortitude: Number;
    reflex: Number;
    will: Number;
    resistance: Resistance[];
}

export type Resistance = {
    type: string;
    target: string[];
    bonus: Number;
}