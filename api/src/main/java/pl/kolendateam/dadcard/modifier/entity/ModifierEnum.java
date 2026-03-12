package pl.kolendateam.dadcard.modifier.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ModifierEnum {
  ABILITY_MODIFIER(
    "The bonus or penalty associated with a particular ability score. Ability modifiers apply to die rolls for character actions involving the corresponding abilities.",
    "Ability Modifier"
  ),
  ALCHEMICAL_BONUS(
    "An alchemical bonus is granted by the use of a nonmagical, alchemical substance such as antitoxin.",
    "Alchemical Bonus"
  ),
  ARMOR_BONUS(
    "An armor bonus applies to Armor Class and is granted by armor or by a spell or magical effect that mimics armor. Armor bonuses stack with all other bonuses to Armor Class (even with natural armor bonuses) except other armor bonuses. An armor bonus doesn't apply against touch attacks, except for armor bonuses granted by force effects (such as the mage armor spell) which apply against incorporeal touch attacks, such as that of a shadow.",
    "Armor Bonus"
  ),
  CIRCUMSTANCE_MODIFIER(
    "A circumstance bonus (or penalty) arises from specific conditional factors impacting the success of the task at hand. Circumstance bonuses stack with all other bonuses, including other circumstance bonuses, unless they arise from essentially the same source.",
    "Circumstance Modifier"
  ),
  COMPETENCE_MODIFIER(
    "A competence bonus (or penalty) affects a character's performance of a particular task, as in the case of the bardic ability to inspire competence. Such a bonus may apply on attack rolls, saving throws, skill checks, caster level checks, or any other checks to which a bonus relating to level or skill ranks would normally apply. It does not apply on ability checks, damage rolls, initiative checks, or other rolls that aren't related to a character's level or skill ranks. Multiple competence bonuses don't stack; only the highest bonus applies.",
    "Competence Bonus"
  ),
  DEFLECTION_BONUS(
    "A deflection bonus affects Armor Class and is granted by a spell or magic effect that makes attacks veer off harmlessly. Deflection bonuses stack with all other bonuses to AC except other deflection bonuses. A deflection bonus applies against touch attacks.",
    "Deflection Bonus"
  ),
  DODGE_BONUS(
    "A dodge bonus improves Armor Class (and sometimes Reflex saves) resulting from physical skill at avoiding blows and other ill effects. Dodge bonuses are never granted by spells or magic items. Any situation or effect (except wearing armor) that negates a character's Dexterity bonus also negates any dodge bonuses the character may have. Dodge bonuses stack with all other bonuses to AC, even other dodge bonuses. Dodge bonuses apply against touch attacks.",
    "Dodge Bonus"
  ),
  INSIGHT_BONUS(
    "An insight bonus improves performance of a given activity by granting the character an almost precognitive knowledge of what might occur. Multiple insight bonuses on the same character or object do not stack. Only the highest insight bonus applies.",
    "Insight Bonus"
  ),
  LUCK_MODIFIER(
    "A luck modifier represents good (or bad) fortune. Multiple luck bonuses on the same character or object do not stack. Only the highest luck bonus applies.",
    "Luck Modifier"
  ),
  MORALE_MODIFIER(
    "A morale bonus represents the effects of greater hope, courage, and determination (or hopelessness, cowardice, and despair in the case of a morale penalty). Multiple morale bonuses on the same character do not stack. Only the highest morale bonus applies. Nonintelligent creatures (creatures with an Intelligence of 0 or no Intelligence at all) cannot benefit from morale bonuses.",
    "Morale Bonus"
  ),
  NATURAL_ARMOR_BONUS(
    "A natural armor bonus improves Armor Class resulting from a creature's naturally tough hide. Natural armor bonuses stack with all other bonuses to Armor Class (even with armor bonuses) except other natural armor bonuses. Some magical effects (such as the barkskin spell) grant an enhancement bonus to the creature's existing natural armor bonus, which has the effect of increasing the natural armor's overall bonus to Armor Class. A natural armor bonus doesn't apply against touch attacks.",
    "Natural Armor Bonus"
  ),
  PROFANE_MODIFIER(
    "A profane bonus (or penalty) stems from the power of evil. Multiple profane bonuses on the same character or object do not stack. Only the highest profane bonus applies.",
    "Profane Bonus"
  ),
  RACIAL_BONUS(
    "A bonus granted because of the culture a particular creature was brought up in or because of innate characteristics of that type of creature. If a creature's race changes (for instance, if it dies and is reincarnated), it loses all racial bonuses it had in its previous form.",
    "Racial Bonus"
  ),
  RESISTANCE_BONUS(
    "A resistance bonus affects saving throws, providing extra protection against harm. Multiple resistance bonuses on the same character or object do not stack. Only the highest resistance bonus applies.",
    "Resistance Bonus"
  ),
  SACRED_MODIFIER(
    "A sacred bonus (or penalty) stems from the power of good. Multiple sacred bonuses on the same character or object do not stack. Only the highest sacred bonus applies.",
    "Sacred Bonus"
  ),
  SHIELD_BONUS(
    "A shield bonus improves Armor Class and is granted by a shield or by a spell or magic effect that mimics a shield. Shield bonuses stack with all other bonuses to AC except other shield bonuses. A magic shield typically grants an enhancement bonus to the shield's shield bonus, which has the effect of increasing the shield's overall bonus to AC. A shield bonus granted by a spell or magic item typically takes the form of an invisible, tangible field of force that protects the recipient. A shield bonus doesn't apply against touch attacks.",
    "Shield Bonus"
  ),
  SIZE_BONUS(
    "A size bonus or penalty is derived from a creature's size category. Size modifiers of different kinds apply to Armor Class, attack rolls, Hide checks, grapple checks, and various other checks.",
    "Size Bonus"
  ),

  FEAT("Feat"),
  ITEM("Item"),
  DOMAIN("Domain"),
  PROFICIENCY("Proficiency"),
  CASTER("Caster"),
  SELECTED("Selected"),
  WEAPON_TYPE("Weapon Type"),
  ARMOR_TYPE("Armor Type"),

  // ability
  STRENGTH,
  DEXTERITY,
  CONSTITUTION,
  INTELLIGENCE,
  WISDOM,
  CHARISMA,

  // armor
  SIZE_MODIFIER, //+
  ARMOR_SIZE, //+
  NO_ARMOR,
  LIGHT_ARMOR,
  MEDIUM_ARMOR,
  HEAVY_ARMOR,
  OPPORTUNITY,

  // attack
  MELEE("all melee weapons", "Melee"),
  DISTANCE("all ranged weapons", "Distance"),
  GRAPPLE("Grapple"),
  BULL_RUSH("Bull Rush"),
  DISARM("Disarm"),
  OVERRUN("Overrun"),
  SUNDER("Sunder"),
  BAB("", "Base Attack Bonus"),
  ATTACK_ROLL("", "Attack Roll"),
  THROWN("all weapons thrown", "Thrown"),
  SLING,
  MOUNTED_RANGED,

  // movment
  SPEED,
  FLY,
  FALL,

  // skills
  SKILL,
  STUDY,
  EXTRA_SKILLS_POINTS,
  APPRAISE,
  BALANCE,
  BLUFF,
  CLIMB,
  CONCENTRATION,
  CRAFT,
  DIPLOMACY,
  DISABLE_DEVICE,
  DISGUISE,
  ESCAPE_ARTIST,
  GATHER_INFORMATION,
  HANDLE_ANIMAL,
  HIDE,
  HEAL,
  INTIMIDATE,
  JUMP,
  KNOWLEDGE,
  LISTEN,
  MOVE_SILENTLY,
  PERFORM,
  PROFESSION,
  RIDE,
  SEARCH,
  SENSE_MOTIVE,
  SLEIGHT_OF_HAND,
  SPEAK_LANGUAGE,
  SPELLCRAFT,
  SPOT,
  SURVIVAL,
  SWIM,
  TUMBLE,
  USE_MAGIC_DEVICE,
  USE_ROPE,

  // study
  ARCANA,
  ARCHITECTURE,
  HISTORY,
  NATURE,
  RELIGION,
  PLANE,

  // feat
  EXTRA_FEAT,
  FIGHTER,
  MONK,
  RANGER,
  ROGUE,

  // saving
  SAVING("Saving Throw"),
  FORTITUDE("Fortitude"),
  REFLEX("Reflex"),
  WILL("Will"),
  ENCHANTMENT,
  FEY("Fey"),

  // immunity
  IMMUNITY("Immunity"),
  RESISTANCE("Resistance"),
  VULNERABILITY,
  FEAR("Fear"),
  DISEASES("Diseases"),
  POISON("Poison"),
  PHANTASMS("Phantasms"),
  PARALYSIS("Paralysis"),
  MAGIC("Magic"),
  NATURAL("Natural"),
  SLEEP("Sleep"),
  ACID("Acid"),
  COLD("Cold"),
  ELECTRICITY("Electricity"),
  FIRE("Fire"),
  WATER("Water"),

  // active
  INITIATIVE("Initiative"),
  RAGE("Rage"),
  BARDIC_MUSIC("Bardic Music"),
  BARDIC_KNOWLEDGE("Bardic Knowledge"),
  TURN_UNDEAD("Turn Undead"),
  REBUKE_UNDEAD("Rebuke Undead"),
  WILD_EMPATHY("Wild Empathy"),
  WILD_SHAPE("Wild Shape"),
  FLURRY_BLOWS("Flurry of Blows"),
  KI_STRIKE("Ki Strike"),
  QUIVERING_PALM("Quivering Palm"),
  SMITE("Smite"),
  LAY_ON_HANDS("Lay on Hands"),
  FAVORED_ENEMY("Favored Enemy"),
  SNEAK_ATTACK("Sneak Attack"),
  POWER_ATTACK("Power Attack"),
  COMBAT_EXPERTISE("Combat Expertise"),
  LEADERSHIP("Leadership"),
  MANYSHOT("Manyshot"),
  POINT_BLANK_SHOT("Point-Blank Shot"),
  CONCEALMENT("Concealment"),
  RICOCHET("Ricochet"),

  // favored
  VAMPIRE("Vampire"),
  UNDEAD("Undead"),
  GIANT("Giant"),
  FIRE_GIANT("Fire Giant"),
  HUMANOID("Humanoid"),
  GNOLL("Gnoll"),
  GOBLINOIDS("Goblinoids"),
  ORCS("Orcs"),
  ABERRATIONS("Aberrations"),

  // defence
  UNCANNY_DODGE,
  DAMAGE_REDUCTION,
  DAMAGE_REDUCTION_11,
  DAMAGE_REDUCTION_12,
  SPELL_RESISTANCE,
  VS_SPELL_RESISTANCE,
  HD,
  EVASION,
  LEVEL,
  DODGE,

  // targets
  TRAP("Trap"),
  SHORT_RANGE("Short Range"),

  // weapon
  DAMAGE("Damage"),
  COMPOSITE("Composite"),
  IMPROVED_CRITICAL("Improved Critical"),
  WEAPON_SPECIALIZATION,
  WEAPON_FOUS,
  SIMPLE("Simple"),
  MARTIAL("Martial"),
  EXOTIC("Exotic"),
  RANGED("Ranged"),

  GAUNTLET,
  UNARMED_STRIKE,
  DAGGER,
  DAGGER_PUNCHING,
  GAUNTLET_SPIKED,
  MACE_LIGHT,
  SICKLE,
  CLUB,
  MACE_HEAVY,
  MORNINGSTAR,
  SHORTSPEAR,
  LONGSPEAR,
  QUARTERSTAFF,
  SPEAR,
  CROSSBOW_HEAVY,
  BOLT_CROSSBOW,
  CROSSBOW_LIGHT,
  DART,
  JAVELIN,
  BULLETS_SLING,
  AXE_THROWING,
  HAMMER_LIGHT,
  HANDAXE,
  KUKRI,
  PICK_LIGHT,
  SAP,
  SHIELD_LIGHT,
  SPIKED_ARMOR,
  SPIKED_SHIELD_LIGHT,
  SWORD_SHORT,
  BATTLEAXE,
  FLAIL,
  LONGSWORD,
  PICK_HEAVY,
  RAPIER,
  SCIMITAR,
  SHIELD_HEAVY,
  SPIKED_SHIELD_HEAVY,
  TRIDENT,
  WARHAMMER,
  FALCHION,
  GLAIVE,
  GREATAXE,
  GREATCLUB,
  FLAIL_HEAVY,
  GREATSWORD,
  GUISARME,
  HALBERD,
  LANCE,
  RANSEUR,
  SCYTHE,
  LONGBOW,
  ARROW,
  LONGBOW_COMPOSITE,
  SHORTBOW,
  SHORTBOW_COMPOSITE,
  KAMA,
  NUNCHAKU,
  SAI,
  SIANGHAM,
  SWORD_BASTARD,
  WARAXE_DWARVEN,
  WHIP,
  AXE_ORC_DOUBLE,
  CHAIN_SPIKED,
  FLAIL_DIRE,
  HAMMER_GNOME_HOOKED,
  SWORD_TWO_BLADED,
  URGROSH_DWARVEN,
  BOLAS,
  CROSSBOW_HAND,
  CROSSBOW_REPEATING_HEAVY,
  CROSSBOW_REPEATING_LIGHT,
  NET,
  SHURIKEN,
  WARSLING,

  // Magic
  SPELL_DIFFICULTY("Spell Difficulty"),

  // School
  SCHOOL("School"),
  CONJURATION("Conjuration"),
  CALLING("Calling"),
  CREATION("Creation"),
  HEALING("Healing"),
  SUMMONING("Summoning"),
  TELEPORTATION("Teleportation"),
  DIVINATION("Divination"),
  SCRYING("Scrying"),
  CHARM("Charm"),
  COMPULSION("Compulsion"),
  EVOCATION("Evocation"),
  ILLUSION("Illusion"),
  FIGMENT("Figment"),
  GLAMER("Glamer"),
  PATTERN("Pattern"),
  PHANTASM("Phantasm"),
  SHADOW("Shadow"),
  NECROMANCY("Necromancy"),
  TRANSMUTATION("Transmutation"),
  AIR("Air"),
  CHAOTIC("Chaotic"),
  DARKNESS("Darkness"),
  DEATH("Death"),
  EARTH("Earth"),
  EVIL("Evil"),
  FORCE("Force"),
  GOOD("Good"),
  LANGUAGE_DEPENDENT("Language Dependent"),
  LAWFUL("Lawful"),
  LIGHT("Light"),
  MIND_AFFECTING("Mind Affecting"),
  SONIC("Sonic"),
  LUCK("Luck"),
  UNIVERSAL("Universal"),

  SUPERNATURAL("Supernatural"),
  EXTRAORDINARY("Extraordinary"),
  SPELL_LIKE("Spell Like"),
  CLASS_HD("Class Hit Dice"),
  HALF_HD("Half Hit Dice"),
  RACE_HD("Race Hit Dice"),
  HALF_RACE("Half Race Bonus"),
  HALF_COS("Half Consitution Bonus"),
  HALF_CHA("Half Charisma Bonus"),
  CHA("Charisma"),
  COS("Consitution");

  private final String description;
  private final String text;

  // 🔥 Permette di ricevere "good" dal frontend
  @JsonCreator
  public static ModifierEnum fromText(String value) {
    if (value == null) {
      return null;
    }

    for (ModifierEnum a : values()) {
      // match by text (frontend style)
      if (
        a.text != null && !a.text.isBlank() && a.text.equalsIgnoreCase(value)
      ) {
        return a;
      }

      // match by enum name (DB / backend style)
      if (a.name().equalsIgnoreCase(value)) {
        return a;
      }
    }

    throw new IllegalArgumentException("Invalid modifier enum value: " + value);
  }

  ModifierEnum() {
    this.description = "";
    this.text = "";
  }

  ModifierEnum(String text) {
    this.description = "";
    this.text = text;
  }

  ModifierEnum(String description, String text) {
    this.description = description;
    this.text = text;
  }

  public String getDescription() {
    return description;
  }

  public String getText() {
    return text;
  }
}
