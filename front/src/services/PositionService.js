import useApi from "src/composables/UseApi";

export default function positionService() {
  const { status, list, create, remove, findById, update } =
    useApi("v0/positions");

  return {
    status,
    list,
    create,
    remove,
    findById,
    update,
  };
}
