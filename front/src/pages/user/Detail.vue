<template>
  <q-page padding class="q-pa-md">
    <div
      class="row q-mt-md q-gutter-x-md q-gutter-y-lg justify-center items-start"
    >
      <div class="col-12 text-center">
        <p class="text-h5">Detalhes</p>
        <p v-if="user">{{ user.name }}</p>
      </div>

      <div class="row">
        <q-btn
          label="MyPage"
          color="primary"
          rounded
          @click="handleGoToMyPage"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "PageFormUser",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { user } = useAuthUser();

    const { login } = useAuthUser();

    const handleGoToMyPage = async () => {
      // const idUser = route.params.id;
      // router.push({ name: "mypage", params: { id: idUser } });
      console.log(user);
    };
    return {
      handleGoToMyPage,
      user,
    };
  },
});
</script>
