import useApi from "src/composables/UseApi";

export default function companyService() {
  const { status, list, create, remove, findById, update } =
    useApi("v0/companies");

  return {
    status,
    list,
    create,
    remove,
    findById,
    update,
  };
}
