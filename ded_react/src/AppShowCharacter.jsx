import { useEffect, useState } from 'react'
import axios from 'axios'

export function AppShowCharacter() {

    let idChar = 1;
    const URL = 'http://localhost:8080/character-card/'+idChar;

    const [char, setChar] = useState("");
    const [abilitys, setAbilitys] = useState("");
    const [classes, setClasses] = useState("");
    const [vitality, setVitality] = useState("");
    const [skills, setSkills] = useState("");
    const [feats, setFeats] = useState("")

    useEffect(() => {
        axios
        .get(URL)
        .then((response) => {
            setChar(response.data);
            setAbilitys(response.data.abilitys);
            setClasses(response.data.classPcList);
            setVitality(response.data.vitality);
            setSkills(response.data.skillsList);
            setFeats(response.data.featsList)
            console.log("API CALLED");
        });
    }, []);

    const grapple = char.bab + (Math.floor((abilitys.streght-10)/2));

    return (
        <div>            
            <p>name: {char.characterName} / player: {char.playerName}</p>
            <p>race: {char.race}, {char.subRace}</p>
            <p>size: {char.size}, speed: {char.speed} ft. / {char.speed/5} squares</p>
            <p>base attack bonus: +{char.bab}, grapple: {grapple >0 ? '+' : ''}{grapple}</p>
            <p>abilitys: {abilitys?
                <>
                <li>STR: {abilitys.streght}</li>
                <li>DEX: {abilitys.dextrity}</li>
                <li>CONS: {abilitys.constitution}</li>
                <li>INT: {abilitys.intelligence}</li>
                <li>WIS: {abilitys.wisdom}</li>
                <li>CHA: {abilitys.charisma}</li>
                </>
            :<>...loading abilitys...</>}
            </p>
            <p>ecl: {char.effectiveCharacterLv} {classes?
                <>
                {char.classPcList.map((c, index) => {
                    return(
                    <li key={index}>{c.className} {c.level}</li>
                )})}
                </>
                :<>...loading class...</>}
            </p>
            <p>hit dice: {char.vitality?.hitDices?
            <>{Object.entries(vitality.hitDices).map(([k,v]) => {
                return(
                    <>{v}d{k}{abilitys.constitution>=0? '+' : '-'}{Math.floor(v*((abilitys.constitution-10)/2))} ({char.vitality.hitPoints} hp), life: {char.vitality.life}</>
                )
            })}</>
            :<p>...loading vitality...</p>
            }</p>
            <p>AC: {char.armorClass?.dextrityBonus?
                <>{10 + 
                char.armorClass.dextrityBonus + char.armorClass.sizeBonus +
                char.armorClass.armorBonus + char.armorClass.shildBonus +
                char.armorClass.enhancementBonuses + char.armorClass.deflectionBonuses +
                char.armorClass.deflectionBonuses + char.armorClass.dodgeBonus
                }, touch: {
                10 +
                char.armorClass.dextrityBonus + char.armorClass.sizeBonus +
                char.armorClass.deflectionBonuses + char.armorClass.dodgeBonus
                }, flat-footed: {
                10 +
                char.armorClass.sizeBonus + char.armorClass.armorBonus +
                char.armorClass.shildBonus + char.armorClass.enhancementBonuses
                }</>
                :<>...loading armor class...</>}    
            </p>
            <p>saving throw: {char.savingThrows?
                <>fort: {char.savingThrows.fortitude}, ref: {char.savingThrows.reflex}, will: {char.savingThrows.will}</>
                :<>...loading saving throw...</>}
            </p>
            <p>skills points: {char.skillPoints} {skills?
            <>{skills.map((s, index) => {
                return(
                <div key={index}>{s.classSkill===true? '(x)' : '(o)'} {s.nameSkill} {Math.floor(s.skillRank+s.skillAbility+s.skillBonus)}</div>
            )})}</>
            :<>...loading skills point...</>
            }</p>
            <p>feats: {feats?
            <>{feats.map((f, index) => {
                return(
                    <li key={index}>{f.characterFeatName} {f.characterFeatSpecial===null? "" : f.characterFeatSpecial}</li>
                )
            })}</>
            :<>...loading feats...</>    
            }</p>
            
        </div>
        
    )

}

export default AppShowCharacter;