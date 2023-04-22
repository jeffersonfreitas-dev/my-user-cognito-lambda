<template>
  <q-page padding class="q-pa-md">
    <div
      class="row q-mt-md q-gutter-x-md q-gutter-y-lg justify-center items-start"
    >
      <div class="col-12 text-center">
        <p class="text-h5">Cadastro de Usuário</p>
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
              label="CPF"
              v-model="form.document"
              outlined
              mask="###.###.###-##"
              unmasked-value
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo é obrigatório',
              ]"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-9 col-md-8 col-xs-12 col-sm-12 q-mr-xs">
            <q-input
              outlined
              label="E-mail"
              v-model="form.contact.email"
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo é obrigatório',
              ]"
            />
          </div>

          <div class="col-lg-2 col-md-3 col-xs-12 col-sm-12">
            <q-input
              label="Telefone"
              v-model="form.contact.mobile"
              mask="(##)# ####-####"
              outlined
              unmasked-value
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo é obrigatório',
              ]"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-2 col-md-2 col-xs-12 col-sm-12 q-mr-xs">
            <q-input
              label="CEP"
              v-model="form.address.zipcode"
              mask="##.###-####"
              outlined
              unmasked-value
              maxlength="10"
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo é obrigatório',
              ]"
              @blur="handleBuscaCep"
            />
          </div>

          <div class="col-lg-7 col-md-7 col-xs-12 col-sm-12 q-mr-xs">
            <q-input
              label="Logradouro"
              v-model="form.address.street"
              outlined
            />
          </div>

          <div class="col-lg-2 col-md-2 col-xs-12 col-sm-12">
            <q-input
              label="Número"
              v-model="form.address.builder_number"
              outlined
            />
          </div>
        </div>

        <div class="row">
          <div class="col-lg-2 col-md-2 col-xs-12 col-sm-12 q-mr-xs">
            <q-input
              label="Complemento"
              v-model="form.address.complement"
              outlined
            />
          </div>

          <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12 q-mr-xs">
            <q-input
              label="Bairro"
              v-model="form.address.neighborhood"
              outlined
            />
          </div>

          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12 q-mr-xs">
            <q-input label="Cidade" v-model="form.address.city" outlined />
          </div>

          <div class="col-lg-2 col-md-2 col-xs-12 col-sm-12">
            <q-input label="UF" v-model="form.address.uf" outlined />
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
          :to="{ name: 'users' }"
          icon="mdi-close-circle"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import userService from "../../services/UserService";
import useNotify from "../../composables/UseNotify";
import viaCepService from "src/services/ViaCepService";

export default defineComponent({
  name: "PageFormUser",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { searchCep } = viaCepService();
    const { create, findById, update } = userService();
    const { notifySuccess, notifyError, notifyWarning } = useNotify();
    const optionsManager = ref([]);

    let user = {};

    const form = ref({
      name: "",
      document: "",
      contact: {
        email: "",
        mobile: "",
      },
      address: {
        zipcode: "",
        street: "",
        builder_number: "",
        complement: "",
        neighborhood: "",
        city: "",
        uf: "",
      },
    });

    const isUpdate = computed(() => route.params.id);

    onMounted(() => {
      if (isUpdate.value) {
        handleGetById(isUpdate.value);
      }
    });

    const handleBuscaCep = async () => {
      try {
        const result = await searchCep(form.value.address.zipcode);
        if (result.data.erro) {
          notifyWarning(
            "CEP não encontrado! Caso esteja correto, favor preencha o endereço manualmente"
          );
        } else {
          form.value.address.street = result.data.logradouro;
          form.value.address.complement = result.data.complemento;
          form.value.address.neighborhood = result.data.bairro;
          form.value.address.city = result.data.localidade;
          form.value.address.uf = result.data.uf;
        }
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          const result = await update(isUpdate.value, form.value);
          notifySuccess(`${result.name} atualizado com sucesso!`);
        } else {
          const result = await create(form.value);
          notifySuccess(`${result.name} salvo com sucesso!`);
        }
        router.push({ name: "users" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetById = async (id) => {
      try {
        user = await findById(id);
        form.value = user;
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleSubmit,
      isUpdate,
      handleBuscaCep,
    };
  },
});
</script>
