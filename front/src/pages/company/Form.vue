<template>
  <q-page padding>
    <div
      class="row q-mt-md q-gutter-x-md q-gutter-y-lg justify-center items-start"
    >
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro de Empresa</p>
      </div>
      <q-form
        class="col-md-10 col-xs-12 col-sm-12 q-gutter-y-sm"
        @submit.prevent="handleSubmit"
      >
        <div class="row">
          <div class="col-lg-9 col-md-8 col-xs-12 col-sm-12 q-mr-xs">
            <q-input
              label="Nome"
              outlined
              v-model="form.name"
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo é obrigatório',
              ]"
            />
          </div>
          <div class="col-lg-2 col-md-3 col-xs-12 col-sm-12">
            <q-input
              label="CNPJ"
              v-model="form.document"
              outlined
              maxlength="19"
              mask="##.###.###/####-##"
              unmasked-value
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo é obrigatório',
              ]"
            />
          </div>
        </div>

        <q-btn
          :label="isUpdate ? 'Atualizar' : 'Salvar'"
          color="primary q-mt-lg q-py-sm"
          :class="$q.platform.is.mobile ? 'full-width' : ''"
          type="submit"
          icon="mdi-check-circle"
        />
        <q-btn
          label="Cancelar"
          color="primary q-mt-lg q-py-sm"
          :class="$q.platform.is.mobile ? 'full-width' : ''"
          flat
          :to="{ name: 'companies' }"
          icon="mdi-close-circle"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import companyService from "../../services/CompanyService";
import useNotify from "../../composables/UseNotify";

export default defineComponent({
  name: "PageFormCompany",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { create, findById, update } = companyService();
    const { notifySuccess, notifyError } = useNotify();

    let company = {};

    const form = ref({
      name: "",
      document: "",
    });

    const isUpdate = computed(() => route.params.id);

    onMounted(() => {
      if (isUpdate.value) {
        handleGetById(isUpdate.value);
      }
    });

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          const result = await update(isUpdate.value, form.value);
          notifySuccess(`${result.name} atualizado com sucesso!`);
        } else {
          const result = await create(form.value);
          notifySuccess(`${result.name} salvo com sucesso!`);
        }
        router.push({ name: "companies" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetById = async (id) => {
      try {
        company = await findById(id);
        form.value = company;
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleSubmit,
      isUpdate,
    };
  },
});
</script>
