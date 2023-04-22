import { ref } from "vue";
import { api } from "src/boot/axios";
import qs from "qs";

const user = ref(null);
const token = ref("");
const URL_BASE = "http://localhost:8080";
const REALMS = "iam_ateuzo";
const API_URL = `${URL_BASE}/realms/${REALMS}/protocol/openid-connect/token`;
const CLIENT_ID = "frontend";

export default function useAuthUser() {
  const login = async (username, password) => {
    try {
      token.value = await getToken(username, password);
      const user_json = getUserJsonFromToken();
      user.value = user_json;
    } catch (error) {
      throw new Error(error);
    }
  };

  const logout = async () => {
    user.value = null;
    token.value = "";
  };

  const getUserJsonFromToken = () => {
    if (token.value) {
      const access_token = token.value.data.access_token;
      var base64Url = access_token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    }
  };

  const getToken = async (username, password) => {
    const resp = await api
      .post(API_URL, getStringify(username, password), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .catch(function (err) {
        if (err.response.status === 401) {
          throw new Error(
            "Não autorizado. Verifique se informou o usuário e senha corretamente"
          );
        }
        throw new Error(err);
      });
    return resp;
  };

  const getStringify = (username, password) => {
    return qs.stringify({
      username: username,
      password: password,
      client_id: CLIENT_ID,
      grant_type: "password",
    });
  };

  const isLoggedIn = () => {
    return !!user.value;
  };

  const tokenIsValid = () => {};

  return {
    user,
    token,
    isLoggedIn,
    login,
    logout,
  };
}
