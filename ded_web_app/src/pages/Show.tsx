import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { characterPc } from '../components/interfaces';
import { characterEmpty } from '../components/variables';
import { urlChar } from '../components/url';

export function Show() {

    let { charId } = useParams();

    const [char, setChar] = useState< characterPc >( characterEmpty );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resURL = await axios.get(urlChar + '/' + charId);
                setChar(resURL.data);

            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const grapple = char.bab + (Math.floor((char.abilitys.streght-10)/2));

    return (
        <div>            
            <p>name: {char.characterName} / player: {char.playerName}</p>
            <p>race: {char.race}, {char.subRace}</p>
            <p>size: {char.size}, speed: {char.speed} ft. / {char.speed/5} squares</p>
            <p>base attack bonus: +{char.bab}, grapple: {grapple >0 ? '+' : ''}{grapple}</p>
            <p>abilitys: {char.abilitys?
                <>
                <li>STR: {char.abilitys.streght}</li>
                <li>DEX: {char.abilitys.dextrity}</li>
                <li>CON: {char.abilitys.constitution}</li>
                <li>INT: {char.abilitys.intelligence}</li>
                <li>WIS: {char.abilitys.wisdom}</li>
                <li>CHA: {char.abilitys.charisma}</li>
                </>
            :<>...loading abilitys...</>}
            </p>
            <p>ecl: {char.effectiveCharacterLv} {char.classPcList?
                <>
                {char.classPcList.map((c, index) => {
                    return(
                    <li key={index}>{c.className} {c.level}</li>
                )})}
                </>
                :<>...loading class...</>}
            </p>
            <p>hit dice: {char.vitality?.hitDices?
            <>{Object.entries(char.vitality.hitDices).map(([k,v]) => {
                return(
                    <>{v}d{k}{char.abilitys.constitution>=0? '+' : '-'}{Math.floor(v*((char.abilitys.constitution-10)/2))}, </>
                )
            })}
            life: {char.vitality.life},
             hp: {char.vitality.hitPoints}
            </>
            :<p>...loading vitality...</p>
            }</p>
            <p>
            AC: 10
             {char.armorClass.dextrityBonus > 0? '+ dextrity ' + char.armorClass.dextrityBonus : ''}
             {char.armorClass.sizeBonus > 0? '+ size ' + char.armorClass.sizeBonus : ''}
             {char.armorClass.armorBonus > 0? '+ armor ' + char.armorClass.armorBonus : ''}
             {char.armorClass.shildBonus > 0? '+ shild ' + char.armorClass.shildBonus : ''}
             {char.armorClass.enhancementBonuses > 0? '+ enhancement ' + char.armorClass.enhancementBonuses : ''}
             {char.armorClass.deflectionBonuses > 0? '+ deflection ' + char.armorClass.deflectionBonuses : ''}
             {char.armorClass.naturalArmor > 0? '+ natural ' + char.armorClass.naturalArmor : ''}
             {char.armorClass.dodgeBonus > 0? '+ dodge ' + char.armorClass.dodgeBonus : ''}
            </p>
            <p>saving throw: {char.savingThrows?
                <>fort: {char.savingThrows.fortitude}, ref: {char.savingThrows.reflex}, will: {char.savingThrows.will}</>
                :<>...loading saving throw...</>}
            </p>
            <p>skills points: {char.skillPoints} {char.skillsList?
            <>{char.skillsList.map((s, index) => {
                return(
                <div key={index}>{s.classSkill===true? '(x)' : '(o)'} {s.nameSkill} {Math.floor(s.skillRank+s.skillAbility+s.skillBonus)} {s.fieldOfStudy?
                <>{Object.entries(s.fieldOfStudy).map((sf) => {
                    return(
                        <li>
                            <li key={index}>{sf[0]} : {sf[1]}</li>
                        </li>
                    )
                })}</>
                :<></>
                }</div>
            )})}</>
            :<>...loading skills point...</>
            }</p>
            <p>feats: {char.featsList?
            <>{char.featsList.map((f, index) => {
                return(
                    <li key={index}>{f.characterFeatName} {f.characterFeatSpecial===null? <></> : f.characterFeatSpecial}</li>
                )
            })}</>
            :<>...loading feats...</>    
            }</p>
            
        </div>
        
    )

}