import { FeatPc } from "./Interface/FeatInterface";

export function FindFightingFeats(feats: FeatPc[]): number[] {
    let idFeats: number[] = []
        
        feats.forEach(f => {if(
            f.feat.id === 116 ||
            f.feat.id === 117 ||
            f.feat.id === 118 ||
            f.feat.id === 120 
        ) idFeats.push(f.feat.id)})

    return idFeats;
    }