<template>
  <q-page padding>
    <div class="row">
      <q-table
        :rows="locations"
        :columns="$q.platform.is.mobile ? columnsMobile : columns"
        row-key="id"
        flat
        class="col-12 q-mb-md"
        v-model:pagination="initialPagination"
        :loading="loading"
        :filter="filter"
        hide-pagination
      >
        <template v-slot:top>
          <span class="text-h6" v-if="$q.platform.is.desktop"
            >Listagem de Contratações</span
          >
          <q-space />
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Procurar"
            class="q-mr-sm"
          >
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
          <q-btn
            label="Cadastrar"
            padding="10px 12px"
            color="primary"
            icon="mdi-plus"
            dense
            :to="{ name: 'form-location' }"
            v-if="$q.platform.is.desktop"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-account-details-outline"
              color="secondary"
              dense
              size="sm"
              @click="handleDetail(props.row)"
            >
              <q-tooltip> Detalhes </q-tooltip>
            </q-btn>
            <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip> Editar </q-tooltip>
            </q-btn>
            <q-btn
              icon="mdi-delete-outline"
              color="negative"
              dense
              size="sm"
              @click="handleRemove(props.row)"
            >
              <q-tooltip> Deletar </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="row justify-center" v-if="locations.length > 0">
      <q-pagination
        v-model="initialPagination.page"
        :max="pagesNumber"
        direction-links
        @update:model-value="handleScrollToTop"
      />
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      v-if="$q.platform.is.mobile"
    >
      <q-btn
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-location' }"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import locationService from "src/services/LocationService";
import { columns, columnsMobile, initialPagination } from "./table";
import useNotify from "src/composables/UseNotify";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageListLocations",

  setup() {
    const { list, remove } = locationService();
    const { notifyError, notifySuccess } = useNotify();
    const locations = ref([]);
    const loading = ref(true);
    const $q = useQuasar();
    const router = useRouter();
    const filter = ref("");

    const handleList = async () => {
      try {
        loading.value = true;
        locations.value = await list();
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleRemove = async (entity) => {
      try {
        $q.dialog({
          title: "Deletar",
          message: `Deseja realmente excluir o registro ${entity.user.name} ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(entity.uuid);
          notifySuccess(`${entity.name} excluído(a) com sucesso!`);
          handleList();
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleEdit = (entity) => {
      router.push({ name: "form-location", params: { id: entity.uuid } });
    };

    const handleDetail = (entity) => {
      router.push({ name: "datail-location", params: { id: entity.uuid } });
    };

    const handleScrollToTop = () => {
      window.scroll({ top: 0, behavior: "smooth" });
    };

    onMounted(() => {
      handleList();
    });

    return {
      columns,
      columnsMobile,
      locations,
      loading,
      handleEdit,
      handleDetail,
      filter,
      handleRemove,
      initialPagination,
      handleScrollToTop,
      pagesNumber: computed(() =>
        Math.ceil(locations.value.length / initialPagination.value.rowsPerPage)
      ),
    };
  },
});
</script>
