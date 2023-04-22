import { api } from "src/boot/axios";

const URL_BASE = "https://be5ts7zrm8.execute-api.us-east-1.amazonaws.com/Dev";

export default function useApi(url) {
  const create = async (data) => {
    console.log(data);
    try {
      const response = await api.post(`${URL_BASE}/${url}`, data, {
        headers: {
          "Access-Control-Allow-Origin": "'*'",
          "Access-Control-Allow-Headers":
            "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
          "Access-Control-Allow-Methods": "'OPTIONS,POST'",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      errorMessage(error);
    }
  };

  const errorMessage = (error_msg) => {
    let error = "";
    if (
      error_msg.message === "Request failed with status code 400" &&
      error_msg.response
    ) {
      const errors = error_msg.response;
      if (errors.data.message !== "") {
        error = errors.data.message + ":";
      }

      if (errors.data.errors) {
        errors.data.errors.forEach((e) => {
          const ee = e.replace("[", "").replace("]", "");
          error = error + "  " + ee + ": ";
        });
      }
    } else {
      error = translateErrorMessage(error_msg);
    }
    throw new Error(error);
  };

  const translateErrorMessage = (error) => {
    switch (error.message) {
      case "Network Error":
        return "Erro ao estabelecer comunicação com o servidor";
      case "Request failed with status code 403":
        return "Você não tem permissão para acessar este recurso";
      case "Request failed with status code 401":
        return "Você não tem acesso. Realize um novo login";
      default:
        return error;
    }
  };

  return {
    create,
  };
}
