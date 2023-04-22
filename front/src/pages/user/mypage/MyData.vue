<template>
  <q-page padding class="q-pa-md">
    <div class="row q-mt-md q-gutter-y-xs justify-center items-start">
      <div class="col-12 text-center">
        <p class="text-h5">Meus Dados</p>
      </div>
    </div>
    <q-card class="my-card" flat>
      <q-tabs
        v-model="tab"
        class="text-teal"
        active-color="primary"
        align="justify"
        indicator-color="primary"
      >
        <q-tab label="Cadastro" name="one" />
        <!-- <q-tab label="Outro" name="two" /> -->
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <div class="row">
            <div class="col-lg-9 col-md-8 col-xs-12 col-sm-12">
              <q-input
                filled
                label="Nome"
                stack-label
                v-model="user_logado.name"
                disable
              />
            </div>
            <div class="col-lg-3 col-md-4 col-xs-12 col-sm-12">
              <q-input
                filled
                disable
                label="CPF"
                stack-label
                v-model="user_logado.document"
                mask="###.###.###-##"
              />
            </div>
          </div>

          <div class="row q-mt-sm">
            <div class="col-lg-9 col-md-8 col-xs-12 col-sm-12">
              <q-input
                label="E-mail"
                filled
                disable
                stack-label
                v-model="user_logado.contact.email"
              />
            </div>

            <div class="col-lg-3 col-md-4 col-xs-12 col-sm-12">
              <q-input
                label="Telefone"
                filled
                disable
                stack-label
                v-model="user_logado.contact.mobile"
                mask="(##)# ####-####"
              />
            </div>
          </div>

          <div class="row q-mt-sm">
            <div class="col-lg-2 col-md-3 col-xs-12 col-sm-12">
              <q-input
                label="CEP"
                filled
                disable
                stack-label
                v-model="user_logado.address.zipcode"
                mask="##.###-####"
              />
            </div>

            <div class="col-lg-7 col-md-6 col-xs-12 col-sm-12">
              <q-input
                label="Logradouro"
                v-model="user_logado.address.street"
                filled
                disable
                stack-label
              />
            </div>

            <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
              <q-input
                label="Número"
                v-model="user_logado.address.builder_number"
                filled
                disable
                stack-label
              />
            </div>
          </div>

          <div class="row q-mt-sm">
            <div class="col-lg-2 col-md-3 col-xs-12 col-sm-12">
              <q-input
                label="Complemento"
                v-model="user_logado.address.complement"
                filled
                disable
                stack-label
              />
            </div>

            <div class="col-lg-4 col-md-3 col-xs-12 col-sm-12">
              <q-input
                label="Bairro"
                v-model="user_logado.address.neighborhood"
                filled
                disable
                stack-label
              />
            </div>

            <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
              <q-input
                label="Cidade"
                v-model="user_logado.address.city"
                filled
                disable
                stack-label
              />
            </div>

            <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12">
              <q-input
                label="UF"
                v-model="user_logado.address.uf"
                filled
                disable
                stack-label
              />
            </div>
          </div>
        </q-tab-panel>

        <!-- <q-tab-panel name="two"> Em breve </q-tab-panel> -->
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import userService from "src/services/UserService";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageMyDataUser",
  setup() {
    const { user } = useAuthUser();
    const { notifyError } = useNotify();
    const user_logado = ref({
      contact: {},
      address: {},
    });
    const tab = ref("one");
    const { findByParams } = userService();

    const findByUserCpf = async () => {
      try {
        const params = { cpf: user.value.document };
        const response = await findByParams(params);
        user_logado.value = response;
      } catch (error) {
        notifyError(error);
      }
    };

    onMounted(() => {
      findByUserCpf();
    });

    return {
      user,
      user_logado,
      tab,
    };
  },
});
</script>
