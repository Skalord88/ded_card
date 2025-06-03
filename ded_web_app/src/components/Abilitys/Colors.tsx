export const abilityBackgroundColor = (
  classSkill: boolean,
  skillAbility: string
) => {
  switch (skillAbility.toUpperCase()) {
    case "STRENGTH":
      return !classSkill
        ? "rpgui-container-framed grey strength"
        : "rpgui-container-framed strength";
    case "DEXTERITY":
      return !classSkill
        ? "rpgui-container-framed grey dexterity"
        : "rpgui-container-framed dexterity";
    case "CONSTITUTION":
      return !classSkill
        ? "rpgui-container-framed grey constitution"
        : "rpgui-container-framed constitution";
    case "INTELLIGENCE":
      return !classSkill
        ? "rpgui-container-framed grey intelligence"
        : "rpgui-container-framed intelligence";
    case "WISDOM":
      return !classSkill
        ? "rpgui-container-framed grey wisdom"
        : "rpgui-container-framed wisdom";
    case "CHARISMA":
      return !classSkill
        ? "rpgui-container-framed grey charisma"
        : "rpgui-container-framed charisma";
    default:
      return "rpgui-container-framed grey";
  }
};
