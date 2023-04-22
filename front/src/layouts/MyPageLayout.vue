<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>Ateuzo IAM</q-toolbar-title>
          <q-btn
            flat
            @click="drawer = !drawer"
            round
            dense
            icon="menu"
            v-if="$q.platform.is.mobile"
          />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above>
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
            <q-item clickable v-ripple :to="{ name: 'mydata' }">
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section> Meus Dados </q-item-section>
            </q-item>

            <q-item clickable v-ripple :to="{ name: 'password-reset' }">
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section> Resetar Senha </q-item-section>
            </q-item>

            <q-item clickable v-ripple :to="{ name: 'user-messages' }">
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section> Mensagens </q-item-section>
            </q-item>

            <!-- <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="mdi-account-multiple" />
              </q-item-section>

              <q-item-section> Colaboradores </q-item-section>
            </q-item> -->

            <!-- <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section> Configuração </q-item-section>
            </q-item> -->

            <q-item clickable v-ripple @click="handleLogout">
              <q-item-section avatar>
                <q-icon name="close" />
              </q-item-section>

              <q-item-section> Sair </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 155px"
        >
          <div class="absolute-center bg-transparent">
            <div class="row justify-center">
              <q-avatar size="95px" class="q-mb-xs">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </div>
            <div class="row justify-center" v-if="user">
              <div class="justify-start">
                <div class="text-weight-bold">{{ user.name }}</div>
              </div>
            </div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MyPageLayout",
  setup() {
    const { user, logout } = useAuthUser();
    const $q = useQuasar();
    const router = useRouter();

    const handleLogout = () => {
      $q.dialog({
        title: "Sair",
        message: "Deseja realmente sair?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout();
        router.replace({ name: "login" });
      });
    };

    return {
      drawer: ref(false),
      handleLogout,
      user,
    };
  },
});
</script>
