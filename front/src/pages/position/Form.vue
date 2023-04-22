<template>
  <q-page padding>
    <div
      class="row q-mt-md q-gutter-x-md q-gutter-y-lg justify-center items-start"
    >
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro de Cargo</p>
      </div>
      <q-form
        class="col-md-10 col-xs-12 col-sm-12 q-gutter-y-sm"
        @submit.prevent="handleSubmit"
      >
        <div class="row">
          <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">
            <q-input
              label="Nome"
              outlined
              v-model="form.name"
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
          :to="{ name: 'positions' }"
          icon="mdi-close-circle"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import positionService from "../../services/PositionService";
import useNotify from "../../composables/UseNotify";

export default defineComponent({
  name: "PageFormPosition",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { create, findById, update } = positionService();
    const { notifySuccess, notifyError } = useNotify();

    let position = {};

    const form = ref({
      name: "",
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
        router.push({ name: "positions" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetById = async (id) => {
      try {
        position = await findById(id);
        form.value = position;
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
