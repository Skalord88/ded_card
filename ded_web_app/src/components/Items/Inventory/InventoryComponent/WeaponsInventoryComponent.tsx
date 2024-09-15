import { FormattingText } from "../../../Formatting/Function"
import { SignAndCount, SignNumber, SignNumberEnchant, WeaponTwoHanded } from "../../../functions"
import { Shield, Weapon } from "../../../interfaces"
import { Popup } from "../../../Popup/Popup"

export type WeaponsInventoryComponentProps = {
    weapon1: Weapon
    weapon2: Weapon
    weapon3: Weapon
    weapon4: Weapon
    weapon5: Weapon
  }
  
  export const WeaponsInventoryComponent: React.FC<WeaponsInventoryComponentProps> = ({
    weapon1,
    weapon2,
    weapon3,
    weapon4,
    weapon5
  }) => {

    return (
      <>
      <div style={{ gridColumn: 1 }}>
            <p style={{backgroundColor: 'grey'}}>Size</p>
              <p>{weapon1.size}</p>
              <p>{weapon2.size}</p>
              <p>{weapon3.size}</p>
              <p>{weapon4.size}</p>
              <p>{weapon5.size}</p>
          </div>
          <div style={{ gridColumn: 2 }}>
            <p style={{backgroundColor: 'grey'}}>Name</p>
              <p><Popup text={weapon1.name} popText={weapon1.description} /></p>
              <p><Popup text={weapon2.name} popText={weapon2.description} /></p>
              <p><Popup text={weapon3.name} popText={weapon3.description} /></p>
              <p><Popup text={weapon4.name} popText={weapon4.description} /></p>
              <p><Popup text={weapon5.name} popText={weapon5.description} /></p>
          </div>
          <div style={{ gridColumn: 3 }}>
            <p style={{backgroundColor: 'grey'}}>Enchantment</p>
            <p>{SignNumberEnchant(weapon1.enchantment.enchantment)}</p>
            <p>{SignNumberEnchant(weapon2.enchantment.enchantment)}</p>
            <p>{SignNumberEnchant(weapon3.enchantment.enchantment)}</p>
            <p>{SignNumberEnchant(weapon4.enchantment.enchantment)}</p>
            <p>{SignNumberEnchant(weapon5.enchantment.enchantment)}</p>
          </div>

          <div style={{ gridColumn: 4 }}>
            <p style={{backgroundColor: 'grey'}}>Hands</p>
            <p>{WeaponTwoHanded(weapon1)? 2 : 1}</p>
            <p>{WeaponTwoHanded(weapon2)? 2 : 1}</p>
            <p>{WeaponTwoHanded(weapon3)? 2 : 1}</p>
            <p>{WeaponTwoHanded(weapon4)? 2 : 1}</p>
            <p>{WeaponTwoHanded(weapon5)? 2 : 1}</p>
          </div>
          <div style={{ gridColumn: 5 }}>
            <p style={{backgroundColor: 'grey'}}>Material</p>
            <p>{weapon1.material}</p>
            <p>{weapon2.material}</p>
            <p>{weapon3.material}</p>
            <p>{weapon4.material}</p>
            <p>{weapon5.material}</p>
          </div>

          <div style={{ gridColumn: 9 }}>
            <p style={{backgroundColor: 'grey'}}>Weight</p>
            <p>{weapon1.weight}</p>
            <p>{weapon2.weight}</p>
            <p>{weapon3.weight}</p>
            <p>{weapon4.weight}</p>
            <p>{weapon5.weight}</p>
          </div>
          </>
    )
  }
  