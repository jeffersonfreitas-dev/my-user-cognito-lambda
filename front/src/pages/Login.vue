<template>
  <q-page padding>
    <q-form
      :class="
        $q.platform.is.desktop
          ? 'row justify-center items-center q-my-xl q-py-xl q-gutter-y-xl'
          : 'row justify-center items-center'
      "
      @submit.prevent="handleLogin"
    >
      <div class="col-lg-3 col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <div class="row q-gutter-md justify-center">
          <q-icon name="mdi-account-lock" color="primary" size="6rem" />
        </div>
        <q-input outlined v-model="form.username" label="E-mail" type="text">
          <template v-slot:prepend>
            <q-icon name="mdi-email-lock" />
          </template>
        </q-input>

        <q-input outlined v-model="form.password" label="Senha" type="password">
          <template v-slot:prepend>
            <q-icon name="mdi-lock-outline" />
          </template>
        </q-input>

        <div class="row justify-end">
          <q-btn
            flat
            color="primary"
            label="Criar uma Conta"
            icon="mdi-account-edit"
            :to="{ name: 'new_account' }"
          />
        </div>

        <div class="full-width">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width q-py-sm"
            type="submit"
            icon="mdi-location-enter"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRoute, useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";
export default defineComponent({
  name: "PageLogin",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { login, isLoggedIn, userExists } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const form = ref({
      username: "",
      password: "",
    });

    onMounted(() => {
      // if (isLoggedIn) {
      //   router.push({ name: "dashboard" });
      // }
    });

    const handleLogin = async () => {
      try {
        await login(form.value.username, form.value.password);
        notifySuccess(`Seja bem vindo(a) ${form.value.username}`);
        if (route.redirectedFrom && route.redirectedFrom.name === "admin") {
          router.push({ name: "mypage" });
        } else {
          router.push({ name: "dashboard" });
        }
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
