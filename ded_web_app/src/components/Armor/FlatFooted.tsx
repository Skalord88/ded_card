import { ArmorModifiers } from "./ArmorInterface";

export type ArmorModifiersProps = {
  armorModifiers: ArmorModifiers
}

export const FlatFooted: React.FC<ArmorModifiersProps> = ({ armorModifiers }) => {
  return (
    <>
      <div className="rpgui-container-framed-grey">
        <p style={{ flex: 1 }}>
          {10 + armorModifiers.size + armorModifiers.armor + armorModifiers.shiled + armorModifiers.natural + armorModifiers.deflection}
        </p>
        <p style={{ flex: 1 }}>flat-footed</p>
      </div>
    </>
  );
};