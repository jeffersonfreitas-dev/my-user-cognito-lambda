import useApi from "src/composables/UseApi";

export default function departmentService() {
  const { status, list, create, remove, findById, update } =
    useApi("v0/departments");

  return {
    status,
    list,
    create,
    remove,
    findById,
    update,
  };
}
