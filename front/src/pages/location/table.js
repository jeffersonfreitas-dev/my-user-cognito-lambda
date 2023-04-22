import { ref } from "vue";
import { cpfMask } from "src/utils/ColumnTableMask";

const columns = [
  {
    name: "register",
    align: "left",
    label: "Registro",
    field: "register",
    sortable: true,
  },
  {
    name: "name",
    align: "left",
    label: "Nome",
    field: (val) => val.user.name,
    sortable: true,
  },
  {
    name: "document",
    align: "left",
    label: "CPF",
    field: (val) => cpfMask(val.user.document),
    sortable: true,
  },
  {
    name: "initialDate",
    align: "left",
    label: "Admissão",
    field: "initial_date",
    sortable: true,
  },
  {
    name: "company",
    align: "left",
    label: "Empresa",
    field: (val) => val.company.name,
    sortable: true,
  },
  {
    name: "department",
    align: "left",
    label: "Departamento",
    field: (val) => val.department.name,
    sortable: true,
  },
  {
    name: "position",
    align: "left",
    label: "Cargo",
    field: (val) => val.position.name,
    sortable: true,
  },
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "status",
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

const columnsMobile = [
  {
    name: "name",
    align: "left",
    label: "Nome",
    field: (val) => val.user.name,
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

export { columns, columnsMobile, initialPagination };
