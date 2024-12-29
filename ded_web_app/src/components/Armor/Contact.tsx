import { ArmorModifiersProps } from "./FlatFooted";

export const Contact: React.FC<ArmorModifiersProps> = ({ armorList }) => {

  const contact: number = armorList.reduce((tot, armor) => 
    armor.text === "dexterity" || armor.text === "size" ||
    armor.text === "dodge" || armor.text === "deflection" ?
     tot + armor.signNum.number : tot
    , 0);

    return (
      <>
        <div className="rpgui-container-framed-grey">
          <p>
            {10 + contact}
          </p>
          <p>contact</p>
        </div>
      </>
    );
  };