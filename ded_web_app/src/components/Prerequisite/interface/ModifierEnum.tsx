export type ModifierEnum = {
  description?: string;
  text: string;
};

export const ABILITY_MODIFIER: ModifierEnum = {
  description:
    "The bonus or penalty associated with a particular ability score. Ability modifiers apply to die rolls for character actions involving the corresponding abilities.",
  text: "Ability Modifier"
};
export const ALCHEMICAL_BONUS: ModifierEnum = {
  description:
    "An alchemical bonus is granted by the use of a nonmagical, alchemical substance such as antitoxin.",
  text: "Alchemical Bonus"
};
export const ARMOR_BONUS: ModifierEnum = {
  description:
    "An armor bonus applies to Armor Class and is granted by armor or by a spell or magical effect that mimics armor. Armor bonuses stack with all other bonuses to Armor Class (even with natural armor bonuses) except other armor bonuses. An armor bonus doesn't apply against touch attacks, except for armor bonuses granted by force effects (such as the mage armor spell) which apply against incorporeal touch attacks, such as that of a shadow.",
  text: "Armor Bonus"
};
export const CIRCUMSTANCE_MODIFIER: ModifierEnum = {
  description:
    "A circumstance bonus (or penalty) arises from specific conditional factors impacting the success of the task at hand. Circumstance bonuses stack with all other bonuses, including other circumstance bonuses, unless they arise from essentially the same source.",
  text: "Circumstance Modifier"
};
export const COMPETENCE_MODIFIER: ModifierEnum = {
  description:
    "A competence bonus (or penalty) affects a character's performance of a particular task, as in the case of the bardic ability to inspire competence. Such a bonus may apply on attack rolls, saving throws, skill checks, caster level checks, or any other checks to which a bonus relating to level or skill ranks would normally apply. It does not apply on ability checks, damage rolls, initiative checks, or other rolls that aren't related to a character's level or skill ranks. Multiple competence bonuses don't stack; only the highest bonus applies.",
  text: "Competence Bonus"
};
export const DEFLECTION_BONUS: ModifierEnum = {
  description:
    "A deflection bonus affects Armor Class and is granted by a spell or magic effect that makes attacks veer off harmlessly. Deflection bonuses stack with all other bonuses to AC except other deflection bonuses. A deflection bonus applies against touch attacks.",
  text: "Deflection Bonus"
};
export const DODGE_BONUS: ModifierEnum = {
  description:
    "A dodge bonus improves Armor Class (and sometimes Reflex saves) resulting from physical skill at avoiding blows and other ill effects. Dodge bonuses are never granted by spells or magic items. Any situation or effect (except wearing armor) that negates a character's Dexterity bonus also negates any dodge bonuses the character may have. Dodge bonuses stack with all other bonuses to AC, even other dodge bonuses. Dodge bonuses apply against touch attacks.",
  text: "Dodge Bonus"
};
export const ENCHANTMENT_BONUS: ModifierEnum = {
  description:
    "An enhancement bonus represents an increase in the sturdiness and/or effectiveness of armor or natural armor, or the effectiveness of a weapon, or a general bonus to an ability score. Multiple enhancement bonuses on the same object (in the case of armor and weapons), creature (in the case of natural armor), or ability score do not stack. Only the highest enhancement bonus applies. Since enhancement bonuses to armor or natural armor effectively increase the armor or natural armor's bonus to AC, they don't apply against touch attacks.",
  text: "Enchantment Bonus"
};
export const INSIGHT_BONUS: ModifierEnum = {
  description:
    "An insight bonus improves performance of a given activity by granting the character an almost precognitive knowledge of what might occur. Multiple insight bonuses on the same character or object do not stack. Only the highest insight bonus applies.",
  text: "Insight Bonus"
};
export const LUCK_MODIFIER: ModifierEnum = {
  description:
    "A luck modifier represents good (or bad) fortune. Multiple luck bonuses on the same character or object do not stack. Only the highest luck bonus applies.",
  text: "Luck Modifier"
};
export const MORALE_MODIFIER: ModifierEnum = {
  description:
    "A morale bonus represents the effects of greater hope, courage, and determination (or hopelessness, cowardice, and despair in the case of a morale penalty). Multiple morale bonuses on the same character do not stack. Only the highest morale bonus applies. Nonintelligent creatures (creatures with an Intelligence of 0 or no Intelligence at all) cannot benefit from morale bonuses.",
  text: "Morale Bonus"
};
export const NATURAL_ARMOR_BONUS: ModifierEnum = {
  description:
    "A natural armor bonus improves Armor Class resulting from a creature's naturally tough hide. Natural armor bonuses stack with all other bonuses to Armor Class (even with armor bonuses) except other natural armor bonuses. Some magical effects (such as the barkskin spell) grant an enhancement bonus to the creature's existing natural armor bonus, which has the effect of increasing the natural armor's overall bonus to Armor Class. A natural armor bonus doesn't apply against touch attacks.",
  text: "Natural Armor Bonus"
};
export const PROFANE_MODIFIER: ModifierEnum = {
  description:
    "A profane bonus (or penalty) stems from the power of evil. Multiple profane bonuses on the same character or object do not stack. Only the highest profane bonus applies.",
  text: "Profane Bonus"
};
export const RACIAL_BONUS: ModifierEnum = {
  description:
    "A bonus granted because of the culture a particular creature was brought up in or because of innate characteristics of that type of creature. If a creature's race changes (for instance, if it dies and is reincarnated} it loses all racial bonuses it had in its previous form.",
  text: "Racial Bonus"
};
export const RESISTANCE_BONUS: ModifierEnum = {
  description:
    "A resistance bonus affects saving throws, providing extra protection against harm. Multiple resistance bonuses on the same character or object do not stack. Only the highest resistance bonus applies.",
  text: "Resistance Bonus"
};
export const SACRED_MODIFIER: ModifierEnum = {
  description:
    "A sacred bonus (or penalty) stems from the power of good. Multiple sacred bonuses on the same character or object do not stack. Only the highest sacred bonus applies.",
  text: "Sacred Bonus"
};
export const SHIELD_BONUS: ModifierEnum = {
  description:
    "A shield bonus improves Armor Class and is granted by a shield or by a spell or magic effect that mimics a shield. Shield bonuses stack with all other bonuses to AC except other shield bonuses. A magic shield typically grants an enhancement bonus to the shield's shield bonus, which has the effect of increasing the shield's overall bonus to AC. A shield bonus granted by a spell or magic item typically takes the form of an invisible, tangible field of force that protects the recipient. A shield bonus doesn't apply against touch attacks.",
  text: "Shield Bonus"
};
export const SIZE_BONUS: ModifierEnum = {
  description:
    "A size bonus or penalty is derived from a creature's size category. Size modifiers of different kinds apply to Armor Class, attack rolls, Hide checks, grapple checks, and various other checks.",
  text: "Size Bonus"
};
export const EMPTY_BONUS: ModifierEnum = {
  description: "",
  text: ""
};
export const BASE_VALUE: ModifierEnum = {
  description: "",
  text: "Base Value"
};

export const modifierEnumList: ModifierEnum[] = [
  ABILITY_MODIFIER,
  ALCHEMICAL_BONUS,
  ARMOR_BONUS,
  CIRCUMSTANCE_MODIFIER,
  COMPETENCE_MODIFIER,
  DEFLECTION_BONUS,
  DODGE_BONUS,
  INSIGHT_BONUS,
  LUCK_MODIFIER,
  MORALE_MODIFIER,
  NATURAL_ARMOR_BONUS,
  PROFANE_MODIFIER,
  RACIAL_BONUS,
  RESISTANCE_BONUS,
  SACRED_MODIFIER,
  SHIELD_BONUS,
  SIZE_BONUS
];

export const STRENGTH_MODIFIER: ModifierEnum = {
  description: "Strength",
  text: "Strength modifiers"
};
