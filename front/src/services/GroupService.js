import useApi from "src/composables/UseApi";

export default function groupService() {
  const { status, list, create, remove, findById, update } =
    useApi("v0/groups");

  return {
    status,
    list,
    create,
    remove,
    findById,
    update,
  };
}
