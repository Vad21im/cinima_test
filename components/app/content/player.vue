<script setup lang="ts">
import { NutPlayer } from "nutplayer";

const { data } = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const isPlayerHidden = ref(false);
const playerContainer = ref(null);
// глобальный указатель на данный плеер, используется в попапах плеера
// для остановки текущего перед запуском нового плеера в попапе
const player = useState("main-player");

onMounted(async () => {
  const playbackUrl = getMinAgeVersionUrl(data.versions);
  player.value = await NutPlayer.create(playerContainer.value, {
    playerUrl: "/js/nutplayer.global.js",
    width: "100%",
    height: "100%",
  });
  player.value.load(playbackUrl, { adConfig: {} });
});

const onThumbnailClick = () => {
  isPlayerHidden.value = !isPlayerHidden.value;
  player.value.play();
};
</script>

<template>
  <div
    class="relative aspect-[16/9] w-full cursor-pointer"
    @click="onThumbnailClick"
  >
    <div v-show="!isPlayerHidden">
      <IconPlayerPlay class="absolute inset-0 block size-16 m-auto" />
      <NuxtImg
        preload
        :src="getScreenshot(data.assets)"
        :alt="data.title"
        class="aspect-[16/9] w-full object-cover"
      />
    </div>
    <div
      v-show="isPlayerHidden"
      ref="playerContainer"
      class="aspect-[16/9] w-full"
    ></div>
  </div>
</template>
