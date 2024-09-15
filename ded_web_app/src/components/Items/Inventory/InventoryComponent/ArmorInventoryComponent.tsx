import { FormattingText } from "../../../Formatting/Function"
import { SignAndCount } from "../../../functions"
import { Armor } from "../../../interfaces"
import { Popup } from "../../../Popup/Popup"

export type ArmorInventoryComponentProps = {
    armor: Armor
  }
  
  export const ArmorInventoryComponent: React.FC<ArmorInventoryComponentProps> = ({
    armor
  }) => {
    const armorSpeed = (armor: Armor): number => {
      if(armor.armorType === 'HEAVY_ARMOR') return 3
      if(armor.armorType === 'MEDIUM_ARMOR' && armor.material === 'METAL') return 3
      if(armor.armorType === 'MEDIUM_ARMOR' && armor.material === 'LEATHER') return 1.5
      return 0;
    }
    const speed: number = armorSpeed(armor)
    return (
      <>
      <div style={{ gridColumn: 1 }}>
            <p style={{backgroundColor: 'grey'}}>Name</p>
              <p><Popup text={armor.name} popText={armor.description} /></p>
          </div>
          <div style={{ gridColumn: 2 }}>
            <p style={{backgroundColor: 'grey'}}>Armor Type</p>
            <p>{FormattingText(armor.armorType)}</p>
          </div>
          <div style={{ gridColumn: 3 }}>
            <p style={{backgroundColor: 'grey'}}>Enchantment</p>
            <p>{SignAndCount([armor.enchantment.enchantment]).sign}{armor.enchantment.enchantment}</p>
          </div>
          <div style={{ gridColumn: 4 }}>
            <p style={{backgroundColor: 'grey'}}>Max Dex</p>
            <p>{armor.maxDex}</p>
          </div>
          <div style={{ gridColumn: 5 }}>
            <p style={{backgroundColor: 'grey'}}>Material</p>
            <p>{armor.material}</p>
          </div>
          <div style={{ gridColumn: 6 }}>
            <p style={{backgroundColor: 'grey'}}>Penality</p>
            <p>{armor.penality}</p>
          </div>
          <div style={{ gridColumn: 7 }}>
            <p style={{backgroundColor: 'grey'}}>Failure</p>
            <p>{armor.failure}%</p>
          </div>
          <div style={{ gridColumn: 8 }}>
            <p style={{backgroundColor: 'grey'}}>Speed</p>
            <p>-{speed}</p>
          </div>
          <div style={{ gridColumn: 9 }}>
            <p style={{backgroundColor: 'grey'}}>Weight</p>
            <p>{armor.weight}</p>
          </div>
          </>
    )
  }
  