<template>
  <q-page padding class="q-pa-md">
    <div class="row q-mt-md q-gutter-x-md q-gutter-y-xs justify-center">
      <div class="col-12 text-center">
        <p class="text-h5">Resetar Senha</p>
      </div>

      <div class="col-12 text-center">
        <p>{{ user.name }}</p>
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
