import { useParams } from "react-router-dom";
import { Armor, Item, Weapon, characterPc } from "../components/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlChar, urlItems } from "../components/url";

export function Items() {
    const { charId } = useParams();

    const [char, setChar] = useState<characterPc>();

    const [items, setItems] = useState<Item[]>([])
    const [armors, setArmors] = useState<Armor[]>([])
    const [weapons, setWeapons] = useState<Weapon[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resChar = await axios.get(urlChar + "/" + charId);
                setChar(resChar.data)

                const resItems = await axios.get(urlItems);
                setItems(resItems.data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);

    useEffect(() => {

        let armorsList: Armor[] = items.filter(
            item => {if(item.itemType === "ARMOR"){
                return item
            }}) as Armor[];
        setArmors(armorsList);

        let weaponsList: Weapon[] = items.filter(
            item => {if(item.itemType === "WEAPON"){
                return item
            }}) as Weapon[];
        setWeapons(weaponsList);
    },[items])

    return (
        <>
        <div>
            {char?.characterName}
        </div>
        <div>
            Armors:
            {armors.map(armor => {
                return (
                    /// non funzia AC
                    <ul>{armor.name} {armor.armorClass.armorBonus}</ul>
                )
            })}
        </div>
        <div>
            Weapons:
            {weapons.map(weapon => {
                return (
                    <ul>{weapon.name}</ul>
                )
            })}
        </div>
        </>
    )
}