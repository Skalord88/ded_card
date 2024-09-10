import { ArmorModifiersProps } from "./FlatFooted";

export const Contact: React.FC<ArmorModifiersProps> = ({ armorModifiers }) => {
    return (
      <>
        <div className="rpgui-container-framed-grey">
          <p style={{ flex: 1 }}>
            {10 + armorModifiers.size + armorModifiers.dodge + armorModifiers.deflection}
          </p>
          <p style={{ flex: 1 }}>contact</p>
        </div>
      </>
    );
  };