<template>
  <q-page padding class="q-pa-md">
    <div
      class="row q-mt-md q-gutter-x-md q-gutter-y-lg justify-center items-start"
    >
      <div class="col-12 text-center">
        <p class="text-h5">Contratação de Usuário</p>
      </div>
      <q-form
        class="col-md-10 col-xs-12 col-sm-12 q-gutter-y-sm"
        @submit.prevent="handleSubmit"
      >
        <div class="row">
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12 q-mr-xs">
            <q-input
              label="Registro"
              v-model="form.register"
              outlined
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo é obrigatório',
              ]"
            />
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12 q-mr-xs">
            <q-input
              outlined
              v-model="date"
              label="Data Admissão"
              mask="##/##/####"
              @blur="handlerOnExitInputDatePicker"
              :rules="[(val) => val && val.length === 10]"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="date"
                      mask="DD/MM/YYYY"
                      @click="handleClosePicker"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Fechar"
                          color="primary"
                          flat
                          @click="handleClosePicker"
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-lg-5 col-md-5 col-xs-12 col-sm-12">
            <q-select
              outlined
              v-model="form.company_id"
              :options="optionsCompanies"
              label="Empresa"
              option-value="uuid"
              option-label="name"
              map-options
              emit-value
              :rules="[(val) => !!val || 'Este campo é obrigatório']"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-12 text-start">
            <p class="text-h7">Escolha o Usuário(a)</p>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12 q-mr-xs">
            <q-select
              outlined
              v-model="form.user_id"
              :options="optionsUsers"
              label="Usuário"
              option-value="uuid"
              option-label="name"
              map-options
              emit-value
              :rules="[(val) => !!val || 'Este campo é obrigatório']"
            />
          </div>
          <!-- <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <q-input label="CPF" disable outlined />
          </div> -->
        </div>

        <div class="row">
          <div class="col-12 text-start">
            <p class="text-h7">Escolha o Departamento</p>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12 q-mr-xs">
            <q-select
              outlined
              v-model="form.department_id"
              :options="optionsDepartments"
              label="Departamento"
              option-value="uuid"
              option-label="name"
              map-options
              emit-value
              :rules="[(val) => !!val || 'Este campo é obrigatório']"
            />
          </div>
          <!-- <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
            <q-input label="Gestor" disable outlined />
          </div> -->
        </div>

        <div class="ro">
          <div class="col-12 text-start">
            <p class="text-h7">Escolha o Cargo</p>
          </div>
        </div>

        <div class="row">
          <div class="col-lg-11 col-md-11 col-sm-12 col-xs-12 q-mr-xs">
            <q-select
              outlined
              v-model="form.position_id"
              :options="optionsPositions"
              label="Cargo"
              option-value="uuid"
              option-label="name"
              map-options
              emit-value
              :rules="[(val) => !!val || 'Este campo é obrigatório']"
            />
          </div>
        </div>

        <q-btn
          :label="isUpdate ? 'Atualizar' : 'Salvar'"
          color="primary q-mt-lg q-py-sm"
          :class="$q.platform.is.mobile ? 'full-width' : 'q-mr-sm'"
          type="submit"
          icon="mdi-check-circle"
        />
        <q-btn
          label="Cancelar"
          outline
          color="primary q-mt-lg q-py-sm"
          :class="$q.platform.is.mobile ? 'full-width' : ''"
          :to="{ name: 'locations' }"
          icon="mdi-close-circle"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import locationService from "../../services/LocationService";
import companyService from "src/services/CompanyService";
import userService from "src/services/UserService";
import departmentService from "src/services/DepartmentService";
import useNotify from "../../composables/UseNotify";
import positionService from "src/services/PositionService";

export default defineComponent({
  name: "PageFormLocation",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { create, findById, update } = locationService();
    const { list } = companyService();
    const $userService = userService();
    const $departmentService = departmentService();
    const $positionService = positionService();
    const { notifySuccess, notifyError } = useNotify();

    let location = {};
    const optionsCompanies = ref([]);
    const optionsUsers = ref([]);
    const optionsDepartments = ref([]);
    const optionsPositions = ref([]);
    const date = ref();

    const form = ref({
      register: "",
      initial_date: new Date(),
      company_id: "",
      user_id: "",
      department_id: "",
      position_id: "",
    });

    const isUpdate = computed(() => route.params.id);

    const fetchAllCompanies = async () => {
      optionsCompanies.value = await list();
    };

    const fetchAllUsers = async () => {
      optionsUsers.value = await $userService.list();
    };

    const fetchAllDepartments = async () => {
      optionsDepartments.value = await $departmentService.list();
    };

    const fetchAllPositions = async () => {
      optionsPositions.value = await $positionService.list();
    };

    onMounted(() => {
      if (isUpdate.value) {
        handleGetById(isUpdate.value);
      }
      fetchAllDepartments();
      fetchAllCompanies();
      fetchAllPositions();
      fetchAllUsers();
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
        router.push({ name: "locations" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleClosePicker = () => {
      form.value.initial_date = date;
    };

    const handlerOnExitInputDatePicker = () => {
      form.value.initial_date = date;
    };

    const handleGetById = async (id) => {
      try {
        location = await findById(id);
        form.value = location;
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleSubmit,
      isUpdate,
      date,
      handleClosePicker,
      handlerOnExitInputDatePicker,
      optionsCompanies,
      optionsUsers,
      optionsDepartments,
      optionsPositions,
    };
  },
});
</script>
