package pl.kolendateam.dadcard.items.entity;

import java.util.ArrayList;
import java.util.HashMap;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.kolendateam.dadcard.items.armor.entity.Armors;
import pl.kolendateam.dadcard.items.armor.entity.Shields;
import pl.kolendateam.dadcard.items.weapons.entity.Weapons;
import pl.kolendateam.dadcard.items.wondrous_items.entity.WondrousItems;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {

  Armors armor;
  Shields shild;
  Weapons weaponOne;
  Weapons weaponTwo;
  Weapons weaponThree;
  Weapons weaponFour;
  Weapons weaponFive;
  ArrayList<Weapons> weaponList;
  HashMap<String, WondrousItems[]> body;
  ArrayList<WondrousItems> backpack;
  // public Inventory() {
  //   this.armor = new Armors();
  //   this.shild = new Shields();
  //   this.weaponOne = new Weapons();
  //   this.weaponTwo = new Weapons();
  //   this.weaponThree = new Weapons();
  //   this.weaponFour = new Weapons();
  //   this.weaponFive = new Weapons();
  //   this.weaponList = new ArrayList<Weapons>();
  //   this.body = new HashMap<String, WondrousItems[]>();
  //   WondrousItems item = new WondrousItems();
  //   WondrousItems[] items = new WondrousItems[] { item };
  //   body.put("head", items);
  //   body.put("arms", items);
  //   items = new WondrousItems[] { item, item };
  //   body.put("hands", items);
  //   items = new WondrousItems[] { item };
  //   body.put("neck", items);
  //   body.put("cloth", items);
  //   body.put("legs", items);
  //   this.backpack = new ArrayList<WondrousItems>();
  // }
}
