<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="drawer = !drawer"
          />

          <q-toolbar-title> Ateuzo IAM </q-toolbar-title>

          <q-btn-dropdown flat color="white" icon="person">
            <q-list>
              <q-item clickable v-close-popup @click="handleLogout">
                <q-item-section>
                  <q-item-label>Sair</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list padding>
            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section> Dashboard </q-item-section>
            </q-item>

            <q-item clickable v-ripple :to="{ name: 'locations' }">
              <q-item-section avatar>
                <q-icon name="mdi-account-check" />
              </q-item-section>

              <q-item-section> Contratações </q-item-section>
            </q-item>

            <q-item clickable v-ripple :to="{ name: 'users' }">
              <q-item-section avatar>
                <q-icon name="mdi-account-multiple" />
              </q-item-section>

              <q-item-section> Usuários </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple :to="{ name: 'companies' }">
              <q-item-section avatar>
                <q-icon name="mdi-office-building" />
              </q-item-section>

              <q-item-section> Empresa </q-item-section>
            </q-item>

            <q-item clickable v-ripple :to="{ name: 'departments' }">
              <q-item-section avatar>
                <q-icon name="mdi-view-carousel" />
              </q-item-section>

              <q-item-section> Departamento </q-item-section>
            </q-item>

            <q-item clickable v-ripple :to="{ name: 'positions' }">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section> Cargos </q-item-section>
            </q-item>

            <q-separator />

            <q-expansion-item
              expand-separator
              icon="mdi-cog"
              label="Configurações"
            >
              <q-item clickable v-ripple :to="{ name: 'groups' }">
                <q-item-section avatar>
                  <q-icon name="null" />
                </q-item-section>

                <q-item-section> Grupos </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </q-scroll-area>
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
  name: "MainLayout",
  setup() {
    const { logout } = useAuthUser();
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
      miniState: ref(true),
      handleLogout,
    };
  },
});
</script>
