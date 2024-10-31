export const useBreakpoints = () => {
  const { isGreaterOrEquals, isLessThan } = useViewport();

  const isDesktop = computed(() => {
    return isGreaterOrEquals("desktop");
  });

  const isTablet = computed(() => {
    return isGreaterOrEquals("tablet") && isLessThan("desktop");
  });

  const isMobile = computed(() => {
    return isLessThan("tablet");
  });

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};
