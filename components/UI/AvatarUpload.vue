<template>
  <div class="flex items-center space-x-4 p-6 rounded-lg w-max">
    <label for="avatarUpload" class="cursor-pointer">
      <Avatar
        :image="previewUrl ?? ''"
        :label="previewUrl ? '' : initial"
        shape="circle"
        class="w-28 h-28 text-5xl bg-neutral-500 text-neutral-700"
      />
    </label>
    <button v-if="previewUrl" class="self-start" @click="removeImage">✕</button>
    <div
      class="flex flex-col items-center justify-center p-6 transition-colors duration-200"
      :class="{
        'border-2 rounded-lg border-dashed': isDragging,
      }"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent
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
        />
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

const processFile = (selectedFile: File | undefined | null) => {
  file.value = null;

  if (!selectedFile) {
    return;
  }

  const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
  if (!allowedTypes.includes(selectedFile.type)) {
    alert('wrong file format');
    return;
  }

  if (selectedFile.size > 512 * 1024) {
    alert('file is too big, max size 0.5Mb');
    return;
  }

  file.value = selectedFile;
};

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
