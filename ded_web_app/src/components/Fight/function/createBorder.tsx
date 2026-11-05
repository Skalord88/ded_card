export const createBorder = (
  selected: boolean
): string => {

  return selected
    ? "rpgui-container-framed golden"
    : "rpgui-container-framed grey";
};