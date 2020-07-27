import { IIngredient } from "../../../../src/types";

export const formatIngredient = (i: IIngredient) => {
  let ret = "";
  i.qty && (ret += `${i.qty} `);
  i.unit && (ret += `${i.unit} `);
  ret += i.name;
  return ret;
};
