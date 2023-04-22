import { ref } from "vue";

const columns = [
  {
    name: "name",
    align: "left",
    label: "Nome",
    field: "name",
    sortable: true,
  },
  // {
  //   name: "name",
  //   align: "left",
  //   label: "Gerente/Supervisor",
  //   field: (val) => val.manager.name,
  //   sortable: true,
  // },
  {
    name: "actions",
    align: "right",
    label: "",
    field: "actions",
    sortable: false,
  },
];

const columnsMobile = [
  {
    name: "name",
    align: "left",
    label: "Nome Grupo",
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

const columnsSecondary = [
  {
    name: "name",
    align: "left",
    label: "",
    field: (val) => val.name,
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

export { columns, columnsMobile, columnsSecondary, initialPagination };
