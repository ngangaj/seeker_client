import { create } from "apisauce";
import authtorage from "../auth/storage";
import cache from "../utility/cache";

const apiClient = create({
  baseURL: "http://192.168.43.21:5000/api",
  timeout: 8000,
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authtorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  const result = { ok: true, data };
  const reply = data ? result : response;
  return reply;
};

export default apiClient;
