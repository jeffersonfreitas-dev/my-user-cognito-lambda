import useApi from "src/composables/UseApi";

export default function userService() {
  const { create } = useApi("sign-up");

  return {
    create,
  };
}
