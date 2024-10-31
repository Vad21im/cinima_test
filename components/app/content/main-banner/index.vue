<script setup>
const pageStore = useMainPageStore();
const sliders = pageStore?.page?.slides || [];
const activeBanner = ref(sliders[0]);
const handleChangeSlide = (slide) => (activeBanner.value = slide);

const activeBannerVal = computed(() => {
  const data = activeBanner.value?.title;
  if (!data) return null;

  return {
    name: data.title,
    genre: useJoin(data.genres, ", "),
    air_date: data.air_date,
    end_date: data.end_date,
    ageRating: data.age,
    description: data.synopsis,
    image: getAfisha(data.assets),
    labels: data?.labels || [],
    link: data.url,
    movieUrl: getMinAgeVersionUrl(
      useGet(activeBanner, "value.preview.versions"),
    ),
    firstTrailerUrl: getMinAgeVersionUrl(
      useGet(activeBanner, "value.trailer.versions"),
    ),
  };
});
</script>

<template>
  <AppContentBanner :banner-val="activeBannerVal" is-main-banner>
    <div class="relative z-20 w-fit">
      <AppContentMainBannerControl
        :sliders="sliders"
        :active-banner="activeBanner"
        @on-change-slide="handleChangeSlide"
      />
    </div>
  </AppContentBanner>
</template>
