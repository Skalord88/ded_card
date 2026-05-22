import { FeatPc } from "./Interface/FeatInterface";

export const serchFeatsTwoAttacks = [40, 58];

export const findIdsFeatsInList = <T,>(
  list: (T | undefined | null)[],
  getIds: (item: T) => number[] | null | undefined,
  search: string,
  baseValue: number = 1
): number => {
  return (
    baseValue +
    list.filter((item) => {
      if (item == null) {
        return false;
      }

      const ids = getIds(item) ?? [];

      if (search === "Feat") {
        return serchFeatsTwoAttacks.some((i) => ids.includes(i));
      }

      return false;
    }).length
  );
};
