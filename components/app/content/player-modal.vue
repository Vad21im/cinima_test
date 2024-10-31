<script setup lang="ts">
/**
 * Wrapper-компонент для показа модалки с плеером по клику на "оборачиваемый"
 * элемент.
 */
const { to } = defineProps({
  /**
   * Параметр to – это playbackUrl, ссылка на m3u8.
   * Название парамера сделано аналогично параметру NuxtLink,
   * для упрощения кода.
   */
  to: {
    type: String,
    required: true,
  },
});

// TODO: создать интегрфейс а-ля useModal & useModalPlayer
const player = useState("player");
const showModal = useState("showModal");

const playerStart = () => {
  player.value.load(to, { adConfig: {} });
  showModal.value = true;

  const { isDesktop } = useDevice();
  // на мобильных плеер перестает работать при autoplay
  if (isDesktop) {
    // TODO: убрать setTimeout, когда поймем в чем дело. Кажется,
    // между событием canplay и тем как плеер реально готов есть что-то еще.
    const play = setTimeout(() => player.value.play(), 100);
    player.value.on("canplay", () => play);
  }
};
</script>

<template>
  <div @click="playerStart" class="cursor-pointer">
    <slot />
  </div>
</template>
