import { ArmorModifiersProps } from "./FlatFooted";

export const TotalArmor: React.FC<ArmorModifiersProps> = ({ armorModifiers }) => {
    return (
      <>
        <div className="rpgui-container-framed-grey">
          <p style={{ flex: 1 }}>
            {
            10 + 
            armorModifiers.armor + armorModifiers.shiled + armorModifiers.dextrity +
            armorModifiers.size + armorModifiers.natural + armorModifiers.dodge + armorModifiers.deflection
            }
          </p>
          <p style={{ flex: 1, backgroundColor: 'gray' }}>total</p>
        </div>
      </>
    );
  };