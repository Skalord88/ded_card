import { FormattingText } from "../../../Formatting/Function"
import { SignAndCount } from "../../../functions"
import { Shield } from "../../../interfaces"
import { Popup } from "../../../Popup/Popup"

export type ShieldInventoryComponentProps = {
    shield: Shield
  }
  
  export const ShieldInventoryComponent: React.FC<ShieldInventoryComponentProps> = ({
    shield
  }) => {
    return (
      <>
      <div style={{ gridColumn: 1, fontSize: '80%' }}>
            <p style={{backgroundColor: 'grey'}}>Name</p>
              <p><Popup text={shield.name} popText={shield.description} /></p>
          </div>
          <div style={{ gridColumn: 2, fontSize: '80%' }}>
            <p style={{backgroundColor: 'grey'}}>Armor Type</p>
            <p>{FormattingText(shield.armorType)}</p>
          </div>
          <div style={{ gridColumn: 3, fontSize: '80%' }}>
            <p style={{backgroundColor: 'grey'}}>Enchantment</p>
            <p>{SignAndCount([shield.enchantment.enchantment]).sign}{shield.enchantment.enchantment}</p>
          </div>

          <div style={{ gridColumn: 5, fontSize: '80%' }}>
            <p style={{backgroundColor: 'grey'}}>Material</p>
            <p>{shield.material}</p>
          </div>
          <div style={{ gridColumn: 6, fontSize: '80%' }}>
            <p style={{backgroundColor: 'grey'}}>Penality</p>
            <p>{shield.penality}</p>
          </div>
          <div style={{ gridColumn: 7, fontSize: '80%' }}>
            <p style={{backgroundColor: 'grey'}}>Failure</p>
            <p>{shield.failure}%</p>
          </div>
          <div style={{ gridColumn: 9, fontSize: '80%' }}>
            <p style={{backgroundColor: 'grey'}}>Weight</p>
            <p>{shield.weight}</p>
          </div>
          </>
    )
  }
  