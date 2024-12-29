import { ArmorList } from "./interface/ArmorInterface";

export type ArmorModifiersProps = {
  armorList: ArmorList
}

export const FlatFooted: React.FC<ArmorModifiersProps> = ({ armorList }) => {

  const flatFooted: number = armorList.reduce((tot, armor) => 
    armor.text === "armor" || armor.text === "shield" ||
    armor.text === "size" || armor.text === "natural" ||
    armor.text === "deflection" ?
     tot + armor.signNum.number : tot
    , 0);

  return (
    <>
      <div className="rpgui-container-framed-grey">
        <p>
          {10 + flatFooted}
        </p>
        <p>flat-footed</p>
      </div>
    </>
  );
};