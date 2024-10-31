<script setup>
/**
 * Компонент слайдера, который содержит в себе просто настройки для стандартного
 * компонента слайдера components/ui/slider, в себя принимает слот элемента
 * отображаемые в слайдере. Можно сказать, что это Ui компонент, и
 * в себе он не должен содержать никакой логики по тому, что отображать в
 * слайдере
 * @props {Array} [sliderItems=[]] - массив данных для элементов слайдера,
 * например данные фильмов для вывода карточек фильмов внутри слайдера
 * @props {string} id - уникальный id слайдера, сделан для того, чтобы не было
 * пересечения в работе нескольких слайдеров на одной странице
 * @props {"horizontal" | "vertical"} [variant=horizontal] - варианты отображения
 * слайдера, на данный момент "horizontal" | "vertical",
 * отличаются количеством выводимых элементов на
 * экран при различных на брейкпоинтах
 * @slot default - дефолтный слот, который принимает компонент или верстку,
 * отображаемую в каждом элементе массива
 * @example
 * <AppContentSlider
 *   id="movies"
 *   v-slot="slotProps"
 *   :slider-items="movies"
 *   variant="vertical"
 * >
 *   <AppContentCardVertical :data="slotProps.item" />
 * </AppContentSlider>
 */
const { sliderItems, id, variant } = defineProps({
  sliderItems: {
    type: Array,
    default: () => [],
  },
  id: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "horizontal",
  },
});

const swiperInstance = ref();

const onInit = (swiper) => {
  swiperInstance.value = swiper;
};

const mapBreakpoints = {
  horizontal: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    450: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1500: { slidesPerView: 4 },
  },
  vertical: {
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    450: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    1024: {
      slidesPerView: 5,
      spaceBetween: 24,
    },
    1500: { slidesPerView: 6 },
  },
};

const breakpoints = computed(() => {
  return mapBreakpoints[variant];
});

const navigationVisible = computed(() => {
  return !(sliderItems.length <= swiperInstance.value?.params.slidesPerView);
});

const slidePrev = () => {
  swiperInstance.value.slidePrev();
};

const slideNext = () => {
  swiperInstance.value.slideNext();
};

const navigation = {
  enabled: true,
  nextEl: `#nextButton-${id}`,
  prevEl: `#prevButton-${id}`,
};
</script>

<template>
  <UiSlider
    :id="id"
    v-slot="slotProps"
    :slider-items="sliderItems"
    :navigation="navigation"
    :navigation-visible="navigationVisible"
    :breakpoints="breakpoints"
    :space-between="24"
    :slides-per-view="4"
    :slide-prev="slidePrev"
    :slide-next="slideNext"
    :on-init="onInit"
    :swiper-instance="swiperInstance"
  >
    <slot :item="slotProps.item" />
  </UiSlider>
</template>
