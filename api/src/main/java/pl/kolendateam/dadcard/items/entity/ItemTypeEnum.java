package pl.kolendateam.dadcard.items.entity;

public enum ItemTypeEnum {
  WEAPON("Weapon description"),
  COMPOSITE_BOW("Composite Bow description"),
  ARMOR("Armor description"),
  ARMOR_SHIELD("Armor Shield description"),
  SHIELD("Shield description"),
  POTION(
    "A potion is a magic liquid that produces its effect when imbibed. Magic oils are similar to potions, except that oils are applied externally rather than imbibed. A potion or oil can be used only once. It can duplicate the effect of a spell of up to 3rd level that has a casting time of less than 1 minute.\r\n" + //
    "\r\n" + //
    "Potions are like spells cast upon the imbiber. The character taking the potion doesn’t get to make any decisions about the effect —the caster who brewed the potion has already done so. The drinker of a potion is both the effective target and the caster of the effect (though the potion indicates the caster level, the drinker still controls the effect).\r\n" + //
    "\r\n" + //
    "The person applying an oil is the effective caster, but the object is the target.\r\n" + //
    "\r\n" + //
    "Physical Description\r\n" + //
    "A typical potion or oil consists of 1 ounce of liquid held in a ceramic or glass vial fitted with a tight stopper. The stoppered container is usually no more than 1 inch wide and 2 inches high. The vial has AC 13, 1 hit point, hardness 1, and a break DC of 12. Vials hold 1 ounce of liquid.\r\n" + //
    "\r\n" + //
    "Identifying Potions\r\n" + //
    "In addition to the standard methods of identification, PCs can sample from each container they find to attempt to determine the nature of the liquid inside. An experienced character learns to identify potions by memory—for example, the last time she tasted a liquid that reminded her of almonds, it turned out to be a potion of cure moderate wounds.\r\n" + //
    "\r\n" + //
    "Activation\r\n" + //
    "Drinking a potion or applying an oil requires no special skill. The user merely removes the stopper and swallows the potion or smears on the oil. The following rules govern potion and oil use.\r\n" + //
    "\r\n" + //
    "Drinking a potion or using an oil on an item of gear is a standard action. The potion or oil takes effect immediately. Using a potion or oil provokes attacks of opportunity. A successful attack (including grappling attacks) against the character forces a Concentration check (as for casting a spell). If the character fails this check, she cannot drink the potion. An enemy may direct an attack of opportunity against the potion or oil container rather than against the character. A successful attack of this sort can destroy the container.\r\n" + //
    "\r\n" + //
    "A creature must be able to swallow a potion or smear on an oil. Because of this, incorporeal creatures cannot use potions or oils.\r\n" + //
    "\r\n" + //
    "Any corporeal creature can imbibe a potion. The potion must be swallowed. Any corporeal creature can use an oil.\r\n" + //
    "\r\n" + //
    "A character can carefully administer a potion to an unconscious creature as a full-round action, trickling the liquid down the creature’s throat. Likewise, it takes a full-round action to apply an oil to an unconscious creature."
  ),
  OIL(
    "A potion is a magic liquid that produces its effect when imbibed. Magic oils are similar to potions, except that oils are applied externally rather than imbibed. A potion or oil can be used only once. It can duplicate the effect of a spell of up to 3rd level that has a casting time of less than 1 minute.\r\n" + //
    "\r\n" + //
    "Potions are like spells cast upon the imbiber. The character taking the potion doesn’t get to make any decisions about the effect —the caster who brewed the potion has already done so. The drinker of a potion is both the effective target and the caster of the effect (though the potion indicates the caster level, the drinker still controls the effect).\r\n" + //
    "\r\n" + //
    "The person applying an oil is the effective caster, but the object is the target.\r\n" + //
    "\r\n" + //
    "Physical Description\r\n" + //
    "A typical potion or oil consists of 1 ounce of liquid held in a ceramic or glass vial fitted with a tight stopper. The stoppered container is usually no more than 1 inch wide and 2 inches high. The vial has AC 13, 1 hit point, hardness 1, and a break DC of 12. Vials hold 1 ounce of liquid.\r\n" + //
    "\r\n" + //
    "Identifying Potions\r\n" + //
    "In addition to the standard methods of identification, PCs can sample from each container they find to attempt to determine the nature of the liquid inside. An experienced character learns to identify potions by memory—for example, the last time she tasted a liquid that reminded her of almonds, it turned out to be a potion of cure moderate wounds.\r\n" + //
    "\r\n" + //
    "Activation\r\n" + //
    "Drinking a potion or applying an oil requires no special skill. The user merely removes the stopper and swallows the potion or smears on the oil. The following rules govern potion and oil use.\r\n" + //
    "\r\n" + //
    "Drinking a potion or using an oil on an item of gear is a standard action. The potion or oil takes effect immediately. Using a potion or oil provokes attacks of opportunity. A successful attack (including grappling attacks) against the character forces a Concentration check (as for casting a spell). If the character fails this check, she cannot drink the potion. An enemy may direct an attack of opportunity against the potion or oil container rather than against the character. A successful attack of this sort can destroy the container.\r\n" + //
    "\r\n" + //
    "A creature must be able to swallow a potion or smear on an oil. Because of this, incorporeal creatures cannot use potions or oils.\r\n" + //
    "\r\n" + //
    "Any corporeal creature can imbibe a potion. The potion must be swallowed. Any corporeal creature can use an oil.\r\n" + //
    "\r\n" + //
    "A character can carefully administer a potion to an unconscious creature as a full-round action, trickling the liquid down the creature’s throat. Likewise, it takes a full-round action to apply an oil to an unconscious creature."
  ),
  RING(
    "Rings bestow magical powers upon their wearers. Only a rare few have charges. Anyone can use a ring.\r\n" + //
    "\r\n" + //
    "A character can only effectively wear two magic rings. A third magic ring doesn’t work if the wearer is already wearing two magic rings.\r\n" + //
    "\r\n" + //
    "Physical Description\r\n" + //
    "Rings have no appreciable weight. Although exceptions exist that are crafted from glass or bone, the vast majority of rings are forged from metal—usually precious metals such as gold, silver, and platinum. A ring has AC 13, 2 hit points, hardness 10, and a break DC of 25.\r\n" + //
    "\r\n" + //
    "Activation\r\n" + //
    "Usually, a ring’s ability is activated by a command word (a standard action that does not provoke attacks of opportunity) or it works continually. Some rings have exceptional activation methods, according to their descriptions."
  ),
  ROD(
    "Rods are scepterlike devices that have unique magical powers and do not usually have charges. Anyone can use a rod.\r\n" + //
    "\r\n" + //
    "Physical Description\r\n" + //
    "Rods weigh approximately 5 pounds.\r\n" + //
    "\r\n" + //
    "They range from 2 feet to 3 feet long and are usually made of iron or some other metal. (Many, as noted in their descriptions, can function as light maces or clubs due to their sturdy construction.)\r\n" + //
    "\r\n" + //
    "These sturdy items have AC 9, 10 hit points, hardness 10, and a break DC of 27."
  ),
  ROD_METAMAGIC(
    "Metamagic rods hold the essence of a metamagic feat but do not change the spell slot of the altered spell. All the rods described here are use-activated (but casting spells in a threatened area still draws an attack of opportunity). A caster may only use one metamagic rod on any given spell, but it is permissible to combine a rod with metamagic feats possessed by the rod’s wielder. In this case, only the feats possessed by the wielder adjust the spell slot of the spell being cast.\r\n" + //
    "\r\n" + //
    "Possession of a metamagic rod does not confer the associated feat on the owner, only the ability to use the given feat a specified number of times per day. A sorcerer still must take a full-round action when using a metamagic rod, just as if using a metamagic feat he possesses.\r\n" + //
    "\r\n" + //
    "Lesser and Greater Metamagic Rods\r\n" + //
    "Normal metamagic rods can be used with spells of 6th level or lower. Lesser rods can be used with spells of 3rd level or lower, while greater rods can be used with spells of 9th level or lower."
  ),
  SCROLL(
    "A scroll is a spell (or collection of spells) that has been stored in written form. A spell on a scroll can be used only once. The writing vanishes from the scroll when the spell is activated. Using a scroll is basically like casting a spell.\r\n" + //
    "\r\n" + //
    "Physical Description\r\n" + //
    "A scroll is a heavy sheet of fine vellum or high-quality paper. An area about 8 ½ inches wide and 11 inches long is sufficient to hold one spell. The sheet is reinforced at the top and bottom with strips of leather slightly longer than the sheet is wide. A scroll holding more than one spell has the same width (about 8 ½ inches) but is an extra foot or so long for each extra spell. Scrolls that hold three or more spells are usually fitted with reinforcing rods at each end rather than simple strips of leather. A scroll has AC 9, 1 hit point, hardness 0, and a break DC of 8.\r\n" + //
    "\r\n" + //
    "To protect it from wrinkling or tearing, a scroll is rolled up from both ends to form a double cylinder. (This also helps the user unroll the scroll quickly.) The scroll is placed in a tube of ivory, jade, leather, metal, or wood. Most scroll cases are inscribed with magic symbols which often identify the owner or the spells stored on the scrolls inside. The symbols often hide magic traps.\r\n" + //
    "\r\n" + //
    "Activation\r\n" + //
    "To activate a scroll, a spellcaster must read the spell written on it. Doing so involves several steps and conditions.\r\n" + //
    "\r\n" + //
    "Decipher the Writing\r\n" + //
    "The writing on a scroll must be deciphered before a character can use it or know exactly what spell it contains. This requires a read magic spell or a successful Spellcraft check (DC 20 + spell level).\r\n" + //
    "\r\n" + //
    "Deciphering a scroll to determine its contents does not activate its magic unless it is a specially prepared cursed scroll. A character can decipher the writing on a scroll in advance so that he or she can proceed directly to the next step when the time comes to use the scroll.\r\n" + //
    "\r\n" + //
    "Activate the Spell\r\n" + //
    "Activating a scroll requires reading the spell from the scroll. The character must be able to see and read the writing on the scroll. Activating a scroll spell requires no material components or focus. (The creator of the scroll provided these when scribing the scroll.) Note that some spells are effective only when cast on an item or items. In such a case, the scroll user must provide the item when activating the spell. Activating a scroll spell is subject to disruption just as casting a normally prepared spell would be. Using a scroll is like casting a spell for purposes of arcane spell failure chance.\r\n" + //
    "\r\n" + //
    "To have any chance of activating a scroll spell, the scroll user must meet the following requirements.\r\n" + //
    "\r\n" + //
    "The spell must be of the correct type (arcane or divine). Arcane spellcasters (wizards, sorcerers, and bards) can only use scrolls containing arcane spells, and divine spellcasters (clerics, druids, paladins, and rangers) can only use scrolls containing divine spells. (The type of scroll a character creates is also determined by his or her class.)\r\n" + //
    "The user must have the spell on his or her class list.\r\n" + //
    "The user must have the requisite ability score.\r\n" + //
    "If the user meets all the requirements noted above, and her caster level is at least equal to the spell’s caster level, she can automatically activate the spell without a check. If she meets all three requirements but her own caster level is lower than the scroll spell’s caster level, then she has to make a caster level check (DC = scroll’s caster level + 1) to cast the spell successfully. If she fails, she must make a DC 5 Wisdom check to avoid a mishap (see Scroll Mishaps, below). A natural roll of 1 always fails, whatever the modifiers.\r\n" + //
    "\r\n" + //
    "Determine Effect\r\n" + //
    "A spell successfully activated from a scroll works exactly like a spell prepared and cast the normal way. Assume the scroll spell’s caster level is always the minimum level required to cast the spell for the character who scribed the scroll (usually twice the spell’s level, minus 1), unless the caster specifically desires otherwise.\r\n" + //
    "\r\n" + //
    "The writing for an activated spell disappears from the scroll.\r\n" + //
    "\r\n" + //
    "Scroll Mishaps\r\n" + //
    "When a mishap occurs, the spell on the scroll has a reversed or harmful effect. Possible mishaps are given below.\r\n" + //
    "\r\n" + //
    "A surge of uncontrolled magical energy deals 1d6 points of damage per spell level to the scroll user.\r\n" + //
    "Spell strikes the scroll user or an ally instead of the intended target, or a random target nearby if the scroll user was the intended recipient.\r\n" + //
    "Spell takes effect at some random location within spell range.\r\n" + //
    "Spell’s effect on the target is contrary to the spell’s normal effect.\r\n" + //
    "The scroll user suffers some minor but bizarre effect related to the spell in some way. Most such effects should last only as long as the original spell’s duration, or 2d10 minutes for instantaneous spells.\r\n" + //
    "Some innocuous item or items appear in the spell’s area.\r\n" + //
    "Spell has delayed effect. Sometime within the next 1d12 hours, the spell activates. If the scroll user was the intended recipient, the spell takes effect normally. If the user was not the intended recipient, the spell goes off in the general direction of the original recipient or target, up to the spell’s maximum range, if the target has moved away.\r\n" + //
    "Several arcane spells are different in level for sorcerers and wizards than they are for bards. Such spells appear on the table at the level appropriate to a sorcerer or wizard (considered the default because bards typically don’t involve themselves in scribing scrolls).\r\n" + //
    "\r\n" + //
    "Likewise, some divine spells are different in level for clerics and druids than they are for paladins and rangers. Such spells appear at the level appropriate to a cleric or druid (considered the default because paladins and rangers typically don’t involve themselves in scribing scrolls).\r\n" + //
    "\r\n" + //
    "If a divine spell is cast at different levels by clerics and druids, it appears at the level appropriate to a cleric (considered the default choice between clerics and druids).\r\n" + //
    "\r\n" + //
    "Many spells are either arcane or divine, depending on the class of the caster. Such spells appear on both lists at the level appropriate to the class of the arcane or divine caster."
  ),
  SCROLL_ARCANE("Arcane Scroll description"),
  SCROLL_DIVINE("Divine Scroll description"),
  STAFF(
    "A staff is a long shaft of wood that stores several spells. Unlike wands, which can contain a wide variety of spells, each staff is of a certain kind and holds specific spells. A staff has 50 charges when created.\r\n" + //
    "\r\n" + //
    "Physical Description\r\n" + //
    "A typical staff is 4 feet to 7 feet long and 2 inches to 3 inches thick, weighing about 5 pounds. Most staffs are wood, but a rare few are bone, metal, or even glass. (These are extremely exotic.) Staffs often have a gem or some device at their tip or are shod in metal at one or both ends. Staffs are often decorated with carvings or runes. A typical staff is like a walking stick, quarterstaff, or cudgel. It has AC 7, 10 hit points, hardness 5, and a break DC of 24.\r\n" + //
    "\r\n" + //
    "Activation\r\n" + //
    "Staffs use the spell trigger activation method, so casting a spell from a staff is usually a standard action that doesn’t provoke attacks of opportunity. (If the spell being cast, however, has a longer casting time than 1 standard action, it takes that long to cast the spell from a staff.) To activate a staff, a character must hold it forth in at least one hand (or whatever passes for a hand, for nonhumanoid creatures).\r\n" + //
    "\r\n" + //
    "Staff Descriptions" + //
    "\r\n" + //
    "Staffs use the wielder’s ability score and relevant feats to set the DC for saves against their spells. Unlike with other sorts of magic items, the wielder can use his caster level when activating the power of a staff if it’s higher than the caster level of the staff." + //
    "\r\n" + //
    "This means that staffs are far more potent in the hands of a powerful spellcaster. Because they use the wielder’s ability score to set the save DC for the spell, spells from a staff are often harder to resist than ones from other magic items, which use the minimum ability score required to cast the spell. Not only are aspects of the spell dependant on caster level (range, duration, and so on) potentially higher, but spells from a staff are harder to dispel and have a better chance of overcoming a target’s spell resistance." + //
    "\r\n" + //
    "Furthermore, a staff can hold a spell of any level, unlike a wand, which is limited to spells of 4th level or lower. The minimum caster level of a staff is 8th. Standard staffs are described below."
  ),
  WAND(
    "A wand is a thin baton that contains a single spell of 4th level or lower. Each wand has 50 charges when created, and each charge expended allows the user to use the wand’s spell one time. A wand that runs out of charges is just a stick.\r\n" + //
    "\r\n" + //
    "Physical Description\r\n" + //
    "A typical wand is 6 inches to 12 inches long and about ¼ inch thick, and often weighs no more than 1 ounce. Most wands are wood, but some are bone. A rare few are metal, glass, or even ceramic, but these are quite exotic. Occasionally, a wand has a gem or some device at its tip, and most are decorated with carvings or runes. A typical wand has AC 7, 5 hit points, hardness 5, and a break DC of 16.\r\n" + //
    "\r\n" + //
    "Activation\r\n" + //
    "Wands use the spell trigger activation method, so casting a spell from a wand is usually a standard action that doesn’t provoke attacks of opportunity. (If the spell being cast, however, has a longer casting time than 1 standard action, it takes that long to cast the spell from a wand.) To activate a wand, a character must hold it in hand (or whatever passes for a hand, for nonhumanoid creatures) and point it in the general direction of the target or area. A wand may be used while grappling or while swallowed whole."
  ),
  WONDROUS_ITEM("Wondrous Item description"),
  MAGIC_ITEM("Magic Item description"),
  COMMON_ITEM("Common Item description"),
  ITEM("Generic Item description");

  private final String description;

  ItemTypeEnum(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }
}
