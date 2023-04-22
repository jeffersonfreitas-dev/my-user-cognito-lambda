import { api } from "src/boot/axios";

export default function useBuscaCep(url) {
  const searchCep = async (cep) => {
    const cepValidado = validaCep(cep);
    try {
      const data = await api.get(`${url}/${cepValidado}/json`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const validaCep = (value) => {
    const valida = /^[0-9]{8}$/;
    let cep = value.replace(/\D/g, "");
    if (cep !== "" && valida.test(cep)) {
      return cep;
    } else {
      throw new Error("CEP com formato ou valor inválido!");
    }
  };

  return {
    searchCep,
  };
}
