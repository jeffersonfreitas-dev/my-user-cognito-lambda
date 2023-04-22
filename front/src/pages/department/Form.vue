<template>
  <q-page padding>
    <div
      class="row q-mt-md q-gutter-x-md q-gutter-y-lg justify-center items-start"
    >
      <div class="col-12 text-center">
        <p class="text-h6">Cadastro de Departamento</p>
      </div>
      <q-form
        class="col-md-10 col-xs-12 col-sm-12 q-gutter-y-sm"
        @submit.prevent="handleSubmit"
      >
        <div class="row">
          <div
            :class="
              isUpdate
                ? 'col-12'
                : 'col-lg-8 col-md-7 col-xs-12 col-sm-12 q-mr-xs'
            "
          >
            <q-input
              label="Nome do Departamento"
              v-model="form.name"
              outlined
              :rules="[
                (val) => (val && val.length > 0) || 'Este campo é obrigatório',
              ]"
            />
          </div>
          <div class="col-lg-3 col-md-4 col-xs-12 col-sm-12" v-if="!isUpdate">
            <q-select
              outlined
              v-model="form.manager"
              :options="optionsManager"
              label="Gerente/Supervisor"
              option-value="uuid"
              option-label="name"
              map-options
              emit-value
              :rules="[(val) => !!val || 'Este campo é obrigatório']"
            />
          </div>
        </div>

        <div class="row" v-if="!isUpdate">
          <div class="col-lg-7 col-md-7 col-xs-12 col-sm-12 q-mr-xs q-mb-lg">
            <q-select
              outlined
              v-model="choosedGroup"
              :options="optionsGroups"
              label="Grupos de Acesso"
              option-value="uuid"
              option-label="name"
              map-options
            />
          </div>
          <div class="col-lg-3 col-md-3 col-xs-12 col-sm-12 q-mr-xs q-mb-lg">
            <q-select
              outlined
              v-model="choosedGroupType"
              :options="groupOptions"
              label="Tipos de Acesso"
              :disable="!choosedGroup"
              option-value="value"
              option-label="name"
              map-options
            />
          </div>
          <div class="col-lg-1 col-md-1 col-xs-12 col-sm-12 q-mr-xs">
            <q-btn
              color="primary"
              :disable="!choosedGroup"
              :flat="$q.platform.is.mobile"
              :outline="$q.platform.is.desktop"
              class="q-py-md q-px-lg"
              @click="handleAddGroup"
              :label="$q.platform.is.mobile ? 'Adicionar Grupo' : 'Adicionar'"
              :class="$q.platform.is.mobile ? 'full-width' : ''"
            />
          </div>
        </div>

        <div class="row" v-if="groups.length > 0 && !isUpdate">
          <div class="col-lg-11 col-md-11 col-xs-12 col-sm-12">
            <q-table
              :rows="groups"
              :columns="columnsSecondary"
              row-key="id"
              flat
              hide-pagination
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="q-gutter-x-sm">
                  <q-btn
                    icon="mdi-delete-outline"
                    color="negative"
                    dense
                    size="sm"
                    @click="handleRemoveGroup(props.row)"
                  >
                    <q-tooltip> Deletar </q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-5 col-md-2 col-xs-12 col-sm-12">
            <q-btn
              label="Cancelar"
              outline
              color="primary"
              :class="$q.platform.is.mobile ? 'full-width q-mb-sm' : 'q-mr-sm'"
              :to="{ name: 'departments' }"
              icon="mdi-close-circle"
            />
            <q-btn
              :label="isUpdate ? 'Atualizar' : 'Salvar'"
              color="primary"
              :class="$q.platform.is.mobile ? 'full-width' : ''"
              type="submit"
              icon="mdi-check-circle"
            />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import departmentService from "../../services/DepartmentService";
import userService from "../../services/UserService";
import groupService from "src/services/GroupService";
import useNotify from "../../composables/UseNotify";
import { columnsSecondary } from "./table";

export default defineComponent({
  name: "PageFormDepartment",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { create, findById, update } = departmentService();
    const { list } = userService();
    const { notifySuccess, notifyError } = useNotify();
    const optionsManager = ref([]);
    const optionsGroups = ref([]);
    const $groupService = groupService();

    const department = ref({});
    const choosedGroup = ref();
    const choosedGroupType = ref();
    const groups = ref([]);

    const groupOptions = [
      { name: "Padrão", value: "DEFAULT" },
      { name: "Escolhido", value: "CHOOSED" },
    ];

    const form = ref({
      name: "",
      manager: "",
      groups: [],
    });

    const isUpdate = computed(() => route.params.id);

    onMounted(() => {
      if (isUpdate.value) {
        handleGetById(isUpdate.value);
      }
      handleListUsers();
      handleListGroup();
    });

    const handleListUsers = async () => {
      try {
        const result = await list();
        optionsManager.value = result;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleListGroup = async () => {
      try {
        const result = await $groupService.list();
        optionsGroups.value = result;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleSubmit = async () => {
      groups.value.forEach((v) => {
        form.value.groups.push({ uuid: v.uuid, type: v.type });
      });

      try {
        if (isUpdate.value) {
          const result = await update(isUpdate.value, form.value);
          notifySuccess(`${result.name} atualizado com sucesso!`);
        } else {
          const result = await create(form.value);
          notifySuccess(`${result.name} salvo com sucesso!`);
        }
        router.push({ name: "departments" });
      } catch (error) {
        form.value.groups = [];
        notifyError(error.message);
      }
    };

    const handleGetById = async (id) => {
      try {
        department.value = await findById(id);
        form.value = department.value;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleAddGroup = () => {
      if (
        choosedGroup.value !== null &&
        !groups.value.includes(choosedGroup.value)
      ) {
        const group = choosedGroup.value;
        group.type = choosedGroupType.value.value;
        groups.value.push(group);
      }
      choosedGroup.value = null;
      choosedGroupType.value = null;
    };

    const handleRemoveGroup = (entity) => {
      const index = groups.value.indexOf(entity);
      groups.value.splice(index, 1);
    };

    return {
      form,
      groups,
      columnsSecondary,
      choosedGroup,
      choosedGroupType,
      handleRemoveGroup,
      handleSubmit,
      optionsGroups,
      isUpdate,
      groupOptions,
      handleAddGroup,
      optionsManager,
    };
  },
});
</script>
