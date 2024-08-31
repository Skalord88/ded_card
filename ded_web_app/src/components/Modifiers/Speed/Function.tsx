import { Feat } from "../../Feats/Interface/FeatInterface";
import { CharacterPc, ClassPc } from "../../interfaces";
import { SubRace } from "../../Race/Interfaces";
import { Modifiers } from "../ModifierInterface";

export function CountSpeed(char: CharacterPc): number{
    let speed: number = CountRaceSpeed(char.race);
    speed += CountClassSpeed(char.classPcList);
    speed += CountFeatsSpeed(char.featsList);

    return speed;
}

export function CountModifiersSpeed(modifiers: Modifiers[]){
    const speed = modifiers.reduce((total, modifier) => {
        return modifier.modifier === 'SPEED' ? total + modifier.bonus : total;
    }, 0);
    return speed;
}

export function CountRaceSpeed(race: SubRace){
    return CountModifiersSpeed(race.modifiers)
}
export function CountClassSpeed(classi: ClassPc[]){
    let speed = 0;
    classi.forEach(classe => {
        classe.feats.forEach(feat => {
            speed += CountModifiersSpeed(feat.modifiers)
        })
    })
    return speed;
}

export function CountFeatsSpeed(feats: Feat[]){
    let speed = 0;
    feats.forEach(feat => {
        speed += CountModifiersSpeed(feat.modifiers)
    })
    return speed;
}