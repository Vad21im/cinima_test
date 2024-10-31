<script setup lang="ts">
import { getIdFromOID } from "~/utils";

const route = useRoute();

const getContent = () => useContentStore().getContent(route.params.id);

const seasons = computed(() => getContent()?.seasons);

const selectedSeasonId = computed(
  () =>
    "season:" +
    useGet(route, "query.season", getIdFromOID(seasons.value?.[0].oid)),
);

const selectedSeasonContent = computed(
  () => getContent()?.seasonsContent[selectedSeasonId.value],
);

const switchSeason = (oid) => {
  const router = useRouter();
  const season = getContent()?.seasonsContent[oid];
  const firstEpisodeId = getIdFromOID(season[0].oid);

  router.push({
    params: { ...router.params, episode_id: firstEpisodeId },
    query: { ...route.query, season: getIdFromOID(oid) },
  });
};
</script>

<template>
  <div id="seasons" class="overflow-hidden">
    <UiSection v-if="useSize(seasons)" title="Сезоны и серии">
      <UiTabs :default-value="selectedSeasonId">
        <UiTabsList class="mb-base">
          <UiTabsTrigger
            v-for="{ oid, number } in seasons"
            :key="oid"
            :value="oid"
            @click="switchSeason(oid)"
          >
            Сезон {{ number }}
          </UiTabsTrigger>
        </UiTabsList>

        <UiTabsContent
          v-for="season in seasons"
          :key="season.oid"
          :value="season.oid"
        >
          <AppContentSlider
            :id="getIdFromOID(season.oid)"
            v-slot="slotProps"
            :slider-items="selectedSeasonContent"
          >
            <AppContentCard :data="slotProps.item" :preview="false" />
          </AppContentSlider>
        </UiTabsContent>
      </UiTabs>
    </UiSection>
  </div>
</template>
