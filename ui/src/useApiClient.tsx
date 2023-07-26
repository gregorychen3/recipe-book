import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Recipe } from "../../src/recipe";
import { auth0Config } from "./auth0Config";

axios.defaults.headers.post["Content-Type"] = "application/json";

const useAccessToken = () =>
  useAuth0().getAccessTokenSilently({
    authorizationParams: {
      audience: `https://${auth0Config.domain}/api/v2/`,
      scope: "read:current_user",
    },
  });

export const useApiClient = () =>
  useAccessToken().then((token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return apiClient;
  });

const globalCatchInterceptor = (e: AxiosError) => {
  const method = e.config?.method?.toUpperCase();
  const url = e.config?.url;
  const code = e.response?.status;
  const msg = e.response?.data;
  enqueueSnackbar(
    <div>
      <div>
        {method} {url} returned {code}
      </div>
      <div>{JSON.stringify(msg)}</div>
    </div>,
    {
      variant: "error",
    }
  );
  return Promise.reject(e);
};

axios.interceptors.response.use(null, globalCatchInterceptor);

export const disableGlobalCatchInterceptor = () =>
  axios.interceptors.response.clear();

export const enableGlobalCatchInterceptor = () =>
  axios.interceptors.response.use(null, globalCatchInterceptor);

const apiClient = {
  //
  // video endpoints
  // ---------------

  listRecipes: async () => (await axios.get<Recipe[]>(`/api/recipes`)).data,

  getRecipe: async (id: string) =>
    (await axios.get<Recipe>(`/api/recipes/${id}`)).data,

  createRecipe: async (r: Recipe) =>
    (await axios.post<Recipe>(`/api/recipes`, r)).data,

  updateRecipe: async (r: Recipe) =>
    (await axios.post<Recipe>(`/api/recipes/${r.id}`, r)).data,

  deleteRecipe: async (id: string) =>
    (await axios.delete<{ id: string }>(`/api/recipes/${id}`)).data.id,
};

export type ApiClient = typeof apiClient;
