<template>
  <q-page padding class="q-pa-md">
    <div class="row q-mt-md q-gutter-x-md q-gutter-y-xs justify-center">
      <div class="col-12 text-center">
        <p class="text-h5">Meu Painel</p>
      </div>

      <div class="col-12 text-center">
        <p>Seja bem vindo {{ user.name }}</p>
      </div>

      <div class="col-12 text-center">
        <p>
          Este é o seu ambiente onde está reunido todas as suas informações e
          serviços disponíveis para você.
        </p>
      </div>

      <div class="col-12 text-center">
        <p>Navegue nas opções do menu ao lado e aproveite!</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "PageMyPageUsers",

  setup() {
    const { user } = useAuthUser();

    return {
      user,
    };
  },
});
</script>
