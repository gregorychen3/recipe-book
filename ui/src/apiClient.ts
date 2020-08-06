import axios, { AxiosPromise } from "axios";
import { IRecipeModel } from "../../src/db/recipe";
import { IRecipe } from "../../src/types";

axios.defaults.headers.post["Content-Type"] = "application/json";

const apiClient = {
  createRecipe: (recipe: IRecipe): AxiosPromise<IRecipeModel> => {
    const path = `/api/recipes`;
    return axios.post(path, recipe);
  },
  fetchRecipes: (): AxiosPromise<IRecipeModel[]> => {
    const path = `/api/recipes`;
    return axios.get(path);
  },
  fetchRecipe: (recipeId: string): AxiosPromise<IRecipeModel> => {
    const path = `/api/recipes/${recipeId}`;
    return axios.get(path);
  },
  updateRecipe: (id: string, recipe: IRecipe): AxiosPromise<IRecipeModel> => {
    const path = `/api/recipes/${id}`;
    return axios.post(path, recipe);
  },
  deleteRecipe: (recipeId: string): AxiosPromise<{ id: string }> => {
    const path = `/api/recipes/${recipeId}`;
    return axios.delete(path);
  },
};

export const setAuthorizationHeader = (val: string) => (axios.defaults.headers.common["Authorization"] = val);
export const clearAuthorizationHeader = () => delete axios.defaults.headers.common["Authorization"];

export default apiClient;
