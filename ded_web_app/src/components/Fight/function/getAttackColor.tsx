export const getAttackColor = (ranged: boolean, thrown?: boolean): string => {
  // Thrown
  // if (thrown !== undefined) return thrown ? "ranged" : "melee";

  return thrown !== undefined || ranged ? "ranged" : "melee";
};
