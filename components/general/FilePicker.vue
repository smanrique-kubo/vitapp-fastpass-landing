<script setup lang="ts">
import type { InputFile } from "~/interfaces/General.interface";

const { t } = useI18n();

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: [Object, Array],
    required: false,
    default: () => ({}),
  },
  id: {
    type: String,
    required: false,
    default: "inputForUploadImage",
  },
  dropzone: {
    type: Boolean,
    required: false,
    default: false,
  },
  crooper: {
    type: Boolean,
    required: false,
    default: false,
  },
  crooperOption: {
    type: Object,
    required: false,
    default: () => ({}),
  },
  multiple: {
    type: Object,
    default: () => ({
      validate: false,
      max: 5,
    }),
    required: false,
  },
  measures: {
    type: Object,
    required: false,
    default: () => ({
      validate: false,
      width: 0,
      height: 0,
    }),
  },
  size: {
    type: Object,
    required: false,
    default: () => ({
      validate: true,
      size: 2000000,
      message: "2 MB",
    }),
  },
  extension: {
    type: Object,
    required: false,
    default: () => ({
      validate: true,
      regex: /(.jpg|.jpeg|.png)$/i,
      message:
        "La única extensión permitida para subir la imagen es .png .jpg o .jpeg",
      input: "image/png, image/jpeg, image/jpg",
    }),
  },
});

/** variables */
const fileData = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
const refs = ref(null);
const visible = ref(false);
const cropperImg = ref();
const imgCropper = ref();
// methods

const getCropper = async () => {
  const result = await cropperImg.value.getCroppedImageFile();
  if (result) {
    fileData.value = { file: result.file, image: result.base64 };
    visible.value = false;
    imgCropper.value = null;
    resetInput();
  }
};

const getDropzone = () => {
  const dropzoneContainer = document.getElementById(props.id + "-dropzone");
  if (dropzoneContainer) {
    dropzoneContainer.addEventListener("dragover", (e) => {
      e.preventDefault(); // Evitar el comportamiento predeterminado
      dropzoneContainer.classList.add("drop-active");
    });

    dropzoneContainer.addEventListener("dragleave", () => {
      dropzoneContainer.classList.remove("drop-active");
    });

    dropzoneContainer.addEventListener("drop", (e: any) => {
      const fileInput: any = document.getElementById(props.id);
      e.preventDefault();
      dropzoneContainer.classList.remove("drop-active");

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        e.target.files = files;
        if (props.multiple.validate) {
          multipleFiles(e);
        } else {
          fileData.value = {
            image: "",
            file: "",
          };
          oneFile(e);
        }
      }
    });
  }
};

const openFile = () => {
  refs.value.click();
};

const fileOnload = (e, file: File) => {
  if (!fileData?.value?.image) {
    fileData.value = { file, image: "" };
  }
  const result = e.target.result;
  if (!props.crooper) {
    fileData.value = { file, image: result };
  } else {
    imgCropper.value = result;
    visible.value = true;
  }
};

const oneFile = (e) => {
  // ? Define input
  const fileInput = document.getElementById(props.id);
  // ? Define path file
  const filePath = fileInput.value;
  // ? Define extensions
  const allowedExtensions = props.extension.regex;

  const file = fileInput.files[0];
  if (!file) {
    return false;
  }

  // ? Identify the extension from the file selected
  if (props.extension.validate && !allowedExtensions.exec(filePath)) {
    useShowAlert({
      type: "error",
      message: t(props.extension.message),
    });
    fileInput.value = "";

    emit("save-image", "");
    return false;
  }

  if (props.size.validate && file.size > props.size.size) {
    useShowAlert({
      type: "error",
      message:
        "El tamaño de la imagen es mayor al permitido (" +
        props.size.message +
        "). Tamaño actual = " +
        file.size / props.size.size +
        "MB",
    });

    fileInput.value = "";
    emit("save-image", "");
    return false;
  } else if (file.type.includes("image")) {
    const self = props;

    const img = new Image();
    img.onload = function () {
      if (
        props.measures.validate &&
        (this.width.toFixed(0) !== props.measures.width.toString() ||
          this.height.toFixed(0) !== props.measures.height.toString())
      ) {
        useShowAlert({
          type: "error",
          message:
            "Las medidas deben ser: " +
            self.measures.width +
            " * " +
            self.measures.height +
            ". Medidas de tu imagen: " +
            this.width.toFixed(0) +
            " * " +
            this.height.toFixed(0),
        });
        fileInput.value = "";
        emit("save-image", "");
      } else {
        const file = e.target.files[0];
        const imageType = /image.*/;

        if (!file.type.match(imageType)) {
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          fileOnload(event, file);
        };
        reader.readAsDataURL(file);
      }
    };
    img.src = URL.createObjectURL(file);
  } /* else if (file.type.includes("video")) {
    video.value = file;
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      fileInput.src = url;
    }, 500);
    fileInput.value = "";
    emit("save-video", file);
  }  */ else {
    fileData.value = { file, image: "" };
  }
};

const multipleFiles = async (e) => {
  const oldFiles = fileData.value;
  // ? Define input
  const fileInput = document.getElementById(props.id);
  // ? Define path file
  const filePath = fileInput.value;
  // ? Define extensions
  const allowedExtensions = props.extension.regex;

  let files = [];

  for (const fileU of fileInput.files) {
    files.push(fileU);
  }

  files = files.concat(
    Array.isArray(fileData.value) ? fileData.value.map((t) => t.file) : []
  );

  files = files.filter((t) => t instanceof File);

  fileData.value = [];

  if (!files.length) {
    useShowAlert({
      type: "error",
      message: "Selecciona una imagen para continuar",
    });
    fileInput.value = "";
    return;
  }

  if (files.length > props.multiple.max) {
    useShowAlert({
      type: "error",
      message: "Maximo de imagenes permitidas " + props.multiple.max,
    });
    fileInput.value = "";
    return;
  }

  // ? Validar extensiones y convertir a base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  let base64Files = [];

  for (const file of files) {
    const fileName = file.name;

    if (props.extension.validate && !allowedExtensions.exec(filePath)) {
      continue;
    }

    try {
      const base64 = await toBase64(file);
      base64Files.push({ file, image: base64 });
    } catch (error) {
      console.error(`Error al convertir ${fileName} a Base64:`, error);
    }
  }

  base64Files = base64Files.concat(
    Array.isArray(oldFiles) ? oldFiles.filter((t) => t.id) : []
  );

  fileData.value = base64Files;
};

const deleteFiles = (index: number) => {
  fileData.value.splice(index, 1);
};

const onFilePicked = (e) => {
  if (props.multiple.validate) {
    multipleFiles(e);
  } else {
    fileData.value = {
      ...fileData.value,
      image: "",
    };
    oneFile(e);
  }
};

const resetInput = () => {
  const fileInput = document.getElementById(props.id);

  if (fileInput) {
    fileInput.value = "";
  }
};

const canceledCropper = () => {
  if (!props.multiple.validate) {
    fileData.value = {
      image: "",
      file: "",
    };
  }

  visible.value = false;
  imgCropper.value = null;

  resetInput();
};

onMounted(() => {
  nextTick(() => {
    if (props.dropzone) {
      getDropzone();
    }
  });
});

defineExpose({ openFile, deleteFiles });
</script>
<template>
  <div>
    <input
      :id="id"
      :ref="(el) => (refs = el)"
      type="file"
      style="display: none; border: 1px solid orange"
      size="1"
      :accept="extension.input"
      :multiple="multiple.validate"
      @change="onFilePicked"
    />
    <!-- :draggable="false" -->
    <Dialog
      v-model:visible="visible"
      class="general-dialog cropper-image"
      :modal="true"
      :closable="false"
      :pt="{
        root: {
          style: { width: '100%', 'max-width': '431px' },
        },
      }"
      :draggable="false"
    >
      <template #header>
        <h2 class="app-font-semibold text-lg m-0 color-blue">
          {{ t("text.images.edit") }}
        </h2>
      </template>
      <GeneralCropperImg
        v-if="imgCropper"
        :ref="(el) => (cropperImg = el)"
        :image="imgCropper"
        :stencil-props="crooperOption.stencilProps || {}"
        :limitations="crooperOption.limitations || {}"
        :stencilcomponent="crooperOption.stencilcomponent"
        :zoom-available="crooperOption.zoomAvailable"
      />

      <template #footer>
        <Button
          class="app-general-button app-btn-cancel w-full mb-4"
          style="max-width: 129px"
          :label="t('button.cancel')"
          :pt="{
            label: {
              class: 'color-p',
            },
          }"
          @click="canceledCropper"
        />
        <Button
          class="app-general-button app-btn-primary w-full mb-4"
          style="max-width: 129px"
          :label="t('button.save')"
          @click="getCropper"
        />
      </template>
    </Dialog>
  </div>
</template>
