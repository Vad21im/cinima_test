/**
 * Функционал use-хелперов для работы с контентом типа Сериал/Шоу.
 */
export const useSeries = () => {
  /**
   * Текущий/выбранный эпизод/серия выбранного Сериала.
   */
  const selectedEpisode = computed(() => {
    // FIXME этот код вызывается всегда не зависимо от того, страница какого типа контента открыта
    //       надо передалать
    // FIXME на странице сезона выполняется многократно - не круто
    const route = useRoute();
    const contentId = useGet(route, "params.id");

    let seasonId = useGet(route, "query.season");
    let episodeId = useGet(route, "params.episode_id");

    if (!contentId || !episodeId) {
      // Без этих параметров определить текущий эпизод не возможно
      return null;
    }

    if (seasonId) {
      seasonId = `season:${seasonId}`;
    }
    episodeId = `episode:${episodeId}`;

    const series = useContentStore().getContent(contentId);

    let episodes = [];
    if (seasonId) {
      episodes = series.seasonsContent[seasonId];
    } else {
      // Если эпизод не указан, проверил все доступные эпизоды сериала.
      // В норме этот код не должен вызываться
      episodes = useFlatten(useValues(series.seasonsContent));
    }
    return useFind(episodes, ["oid", episodeId]);
  });

  return {
    selectedEpisode,
  };
};
