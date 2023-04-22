import { ref } from "vue";
import { phoneMask, cpfMask } from "src/utils/ColumnTableMask";

const columns = [
  {
    name: "name",
    align: "left",
    label: "Nome",
    field: "name",
    sortable: true,
  },
  {
    name: "document",
    align: "left",
    label: "CPF",
    field: (val) => cpfMask(val.document),
    sortable: true,
  },
  {
    name: "email",
    align: "left",
    label: "E-mail",
    field: (val) => val.contact.email,
    sortable: true,
  },
  {
    name: "mobile",
    align: "center",
    label: "Telefone",
    field: (val) => phoneMask(val.contact.mobile),
    sortable: true,
  },
  {
    name: "city",
    align: "left",
    label: "Cidade",
    field: (val) => val.address.city + "/" + val.address.uf,
    sortable: true,
  },
  {
    name: "active",
    align: "center",
    label: "Status",
    field: (val) => (val === true ? "Ativo" : "Inativo"),
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

export { columns, columnsMobile, initialPagination };
