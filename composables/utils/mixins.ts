import { DateTime } from "luxon";
import { storeToRefs } from "pinia";

// interfaces
interface showAlertI {
  title?: string;
  message: string;
  type?: string; // success, info, warn, error
  duration?: number; // Delay in milliseconds to close the message automatically
}
export const useCalculateWeigth = (weight: number) => {
  if (weight < 0) throw new Error("El valor no puede ser negativo");
  if (weight === 0) return "0 g";

  const zeros = (numStr: string) => {
    let resultado = numStr.replace(/0+$/, "");
    if (resultado.endsWith(".")) resultado = resultado.slice(0, -1);
    return resultado;
  };

  if (weight < 1000) {
    return zeros(weight.toFixed(3)) + " g";
  } else if (weight < 1000000) {
    return zeros((weight / 1000).toFixed(2)) + " kg";
  } else {
    return zeros((weight / 1000000).toFixed(2)) + " t";
  }
};

export const useParseJson = (_json: any) => {
  try {
    return JSON.parse(_json);
  } catch (error) {
    return {};
  }
};

export const useLoading = (value: boolean) => {
  const mainStore = useMainStore();
  const { loading } = storeToRefs(mainStore);

  loading.value = value;
};
export const truncateText = (text: string, maxWords: number) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};
export const useCheckTrue = () => {
  const mainStore = useMainStore();
  const { check } = storeToRefs(mainStore);

  check.value = true;
};
export const useCheckFalse = (callback?) => {
  const mainStore = useMainStore();
  const { check } = storeToRefs(mainStore);

  setTimeout(() => {
    check.value = false;
    if (callback && typeof callback === "function") {
      callback();
    }
  }, 3000);
};
export const useSearchItemJson = (path: string, obj: any) => {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    const matches = key.match(/(\w+)(\[(\d+)\])?/);

    if (matches) {
      const property = matches[1];
      const index = matches[3];
      result = Object.keys(result || {}).length > 0 ? result : {};
      if (
        typeof result !== "undefined" &&
        Object.prototype.hasOwnProperty.call(result, property)
      ) {
        result = result[property];

        if (index !== undefined) {
          result = result[index];
        }
      } else {
        return undefined || null || "";
      }
    } else {
      return undefined || null || "";
    }
  }

  return result;
};

export const useShowAlert = (config: showAlertI) => {
  const nuxtApp = useNuxtApp();
  const toast: any = nuxtApp.$toast;
  config.duration = config.duration || 3500;

  toast.removeAllGroups();

  toast.add({
    severity: config.type,
    summary: config.title,
    detail: config.message,
    life: config.duration,
  });
};

export const useFormatDate = (date: string, type: string) => {
  let dateFormat = "-";

  const parsedDate = DateTime.fromISO(date);

  if (type === "date-send") {
    dateFormat = parsedDate.toFormat("yyyy-MM-dd");
  }

  if (type === "date-table") {
    dateFormat = parsedDate.toFormat("dd-MM-yyyy");
  }

  return dateFormat;
};
export const useFormatPrice = (_value: any) => {
  try {
    const valueNumber = parseFloat(_value);

    const priceFormat = valueNumber.toLocaleString("es-CO");

    return "$" + priceFormat + "COP";
  } catch (error) {
    console.error("Error", error);
    return "$0COP";
  }
};

export const getActiveTime = (hours: number) => {
  if (hours < 0 || isNaN(hours)) {
    return "Sin actividad en la aplicación";
  }

  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let timeValue: number;
  let timeUnit: string;

  if (years >= 1) {
    timeValue = years;
    timeUnit = years === 1 ? "año" : "años";
  } else if (months >= 1) {
    timeValue = months;
    timeUnit = months === 1 ? "mes" : "meses";
  } else if (days >= 1) {
    timeValue = days;
    timeUnit = days === 1 ? "día" : "días";
  } else {
    timeValue = Math.round(hours);
    timeUnit = hours === 1 ? "hora" : "horas";
  }

  return `${timeValue} ${timeUnit} `;
};
