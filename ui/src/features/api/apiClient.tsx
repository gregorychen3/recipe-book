import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Recipe } from "../../../../src/recipe";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getApiClient = (opts: {
  token: string;
  notifyOnError?: boolean;
}) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${opts.token}`;
  const notifyOnError = opts.notifyOnError ?? true;

  notifyOnError
    ? enableGlobalCatchInterceptor()
    : disableGlobalCatchInterceptor();

  return {
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
};

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
    { variant: "error" }
  );

  return Promise.reject(e);
};

const disableGlobalCatchInterceptor = () => axios.interceptors.response.clear();
const enableGlobalCatchInterceptor = () =>
  axios.interceptors.response.use(null, globalCatchInterceptor);
