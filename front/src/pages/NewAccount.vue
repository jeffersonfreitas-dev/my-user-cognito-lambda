<template>
  <q-page padding>
    <q-form
      class="row justify-center items-center q-my-xl"
      @submit.prevent="handleCreate"
    >
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-10 q-gutter-y-md">
        <div class="row q-gutter-md justify-center">
          <q-icon name="mdi-account-edit" color="primary" size="6rem" />
        </div>

        <div class="row q-gutter-md justify-center">
          <p>Criar Nova de Conta</p>
        </div>

        <q-input
          outlined
          v-model="form.name"
          label="Nome"
          type="text"
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo é obrigatório',
          ]"
        />

        <q-input
          outlined
          v-model="form.email"
          label="E-mail"
          type="text"
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo é obrigatório',
          ]"
        />

        <q-input
          outlined
          v-model="form.password"
          label="Senha"
          type="password"
          :rules="[
            (val) =>
              (val && val.length > 8) ||
              'Este campo deve possuir mais que 8 caracteres',
          ]"
        />
        <p>Regras para senha</p>

        <q-btn
          label="Cadastrar"
          color="primary"
          class="full-width q-py-sm q-mt-xl"
          type="submit"
          icon="mdi-account-plus"
        />

        <q-btn
          outlined
          label="Sair"
          color="negative"
          class="full-width"
          :to="{ name: 'login' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import userService from "src/services/UserService";
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageCreate",
  setup() {
    const router = useRouter();
    const { create } = userService();
    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleCreate = async () => {
      try {
        await create(form.value);
        // notifySuccess(
        //   `Usuário(a) ${form.value.name} cadastrado(a) com sucesso! Confirme seu cadastro.`
        // );
        //router.push({ name: "confirmation" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleCreate,
    };
  },
});
</script>
