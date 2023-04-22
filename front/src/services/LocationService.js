import useApi from "src/composables/UseApi";

export default function userService() {
  const { status, list, create, remove, findById, update, findByParams } =
    useApi("v0/locations");

  return {
    status,
    list,
    create,
    remove,
    findById,
    update,
    findByParams,
  };
}
