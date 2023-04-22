import { ref } from "vue";

const columns = [
  {
    name: "name",
    align: "left",
    label: "Nome",
    field: "name",
    sortable: true,
  },
  {
    name: "actions",
    align: "right",
    label: "",
    field: "actions",
    sortable: false,
  },
];

const initialPagination = ref({
  page: 1,
  rowsPerPage: 10,
});

export { columns, initialPagination };
