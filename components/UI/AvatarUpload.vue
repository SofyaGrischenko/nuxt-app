<template>
  <div class="flex items-center space-x-4 p-6 rounded-lg w-max">
    <button v-if="previewUrl" class="self-end" @click="removeImage">✕</button>
    <label for="avatarUpload" class="cursor-pointer">
      <Avatar
        :image="previewUrl ?? ''"
        :label="previewUrl ? '' : initial"
        shape="circle"
        class="w-28 h-28 text-5xl bg-neutral-500 text-neutral-700"
      />
    </label>
    <div
      class="flex flex-col items-center justify-center p-6 transition-colors duration-200"
      :class="{
        'border-2 rounded-lg': isDragging,
      }"
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <div
        class="flex flex-col items-center text-center"
        :class="{ 'pointer-events-none': isDragging }"
      >
        <label for="avatarUpload" class="cursor-pointer">
          <i class="pi pi-upload mr-2 text-xl" />
          <span class="text-xl">{{ t('profile.upload.title') }}</span>
        </label>
        <span class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          {{ t('profile.upload.caption') }}
        </span>
        <input
          id="avatarUpload"
          type="file"
          accept="image/png, image/jpeg, image/gif"
          class="hidden"
          @change="handleFileChange"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar';

const { t } = useI18n();

const file = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const initial = 'R';

const isDragging = ref(false);

function processFile(selectedFile: File | undefined | null) {
  file.value = null; // Сначала сбрасываем

  if (!selectedFile) {
    return;
  }

  // Проверка типа файла (дополнительная безопасность)
  const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
  if (!allowedTypes.includes(selectedFile.type)) {
    alert('Неверный формат файла. Пожалуйста, выберите PNG, JPG или GIF.');
    return;
  }

  // Проверка размера файла
  if (selectedFile.size > 512 * 1024) {
    alert('Файл слишком большой! Максимальный размер 0.5MB.');
    return;
  }

  // Если все проверки пройдены
  file.value = selectedFile;
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  processFile(target.files?.[0]);
  target.value = '';
};

const onDrop = (event: DragEvent) => {
  isDragging.value = false;
  const droppedFile = event.dataTransfer?.files[0];
  processFile(droppedFile);
};

const removeImage = () => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
  previewUrl.value = null;
  file.value = null;
};

watch(file, (newFile) => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
  if (newFile) {
    previewUrl.value = URL.createObjectURL(newFile);
  } else {
    previewUrl.value = null;
  }
});

onBeforeUnmount(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});
</script>
