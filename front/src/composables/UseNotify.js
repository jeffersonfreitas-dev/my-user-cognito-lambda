import { useQuasar } from "quasar";

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message) => {
    $q.notify({
      type: "positive",
      position: "top-right",
      message: message || "Sucesso!",
    });
  };

  const notifyError = (message) => {
    $q.notify({
      type: "negative",
      position: "top-right",
      message: message || "Ocorreu um erro!",
    });
  };

  const notifyWarning = (message) => {
    $q.notify({
      type: "warning",
      position: "top-right",
      message: message || "Atenção!",
    });
  };

  const notifyInfo = (message) => {
    $q.notify({
      type: "info",
      position: "top-right",
      message: message || "Informação!",
    });
  };

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
  };
}
