import axios from "axios";
import { CharacterPc } from "../interfaces";
import { urlChar } from "../url";

export const getCharFromDB = async (charId: string): Promise<CharacterPc> => {

  const resURL = await axios.get(urlChar + "/" + charId);
  return resURL.data;

};
