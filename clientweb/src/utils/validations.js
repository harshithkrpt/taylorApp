import { MB } from "./constants";
export const isValidImage = (size) => {
  if (size > 4 * MB) {
    return false;
  }
  return true;
};

export const isNotEmptyString = (str) => str.trim() !== "";
