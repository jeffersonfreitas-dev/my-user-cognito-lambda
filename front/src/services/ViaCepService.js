import useBuscaCep from "src/composables/UseBuscaCep";

export default function viaCepService() {
  const { searchCep } = useBuscaCep("https://viacep.com.br/ws/");

  return {
    searchCep,
  };
}
