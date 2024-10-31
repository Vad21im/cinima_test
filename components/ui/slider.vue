<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";

const props = defineProps({
  sliderItems: {
    type: Array,
    default: () => [],
  },
  autoplay: {
    type: [Object, Boolean],
    default: false,
  },
  slidesPerView: {
    type: [Number, String],
    default: "auto",
  },
  navigation: {
    type: Object,
    default: () => ({}),
  },
  pagination: {
    type: Object,
    default: () => ({}),
  },
  breakpoints: {
    type: Object,
    default: () => ({}),
  },
  spaceBetween: {
    type: Number,
    default: 16,
  },
  onInit: {
    type: Function,
    default: () => {},
  },
  paginationRender: {
    type: Function,
    default: () => {},
  },
  navigationVisible: {
    type: Boolean,
    default: false,
  },
  slidePrev: {
    type: Function,
    default: () => {},
  },
  slideNext: {
    type: Function,
    default: () => {},
  },
  id: {
    type: String,
    required: true,
  },
});

const modules = [Navigation, Pagination, Autoplay];
</script>

<template>
  <div class="relative">
    <slot name="navigation">
      <div
        v-if="navigationVisible"
        class="absolute -top-[40px] right-0 flex hidden -translate-y-full gap-sm lg:flex"
      >
        <div
          :id="props.navigation.prevEl"
          class="group cursor-pointer"
          @click="slidePrev"
        >
          <IconArrowTop
            class="h-[24px] w-[24px] rotate-[270deg] text-navy-200 group-[.swiper-button-disabled]:text-grey-900 xl:h-[32px] xl:w-[32px]"
          />
        </div>
        <div
          :id="props.navigation.nextEl"
          class="group cursor-pointer"
          @click="slideNext"
        >
          <IconArrowTop
            class="h-[24px] w-[24px] rotate-[90deg] text-navy-200 group-[.swiper-button-disabled]:text-grey-900 xl:h-[32px] xl:w-[32px]"
          />
        </div>
      </div>
    </slot>
    <swiper
      class="!overflow-visible"
      observer
      observe-parents
      :autoplay="autoplay"
      :navigation="navigation"
      :pagination="pagination"
      :breakpoints="breakpoints"
      :modules="modules"
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      @init="onInit"
      @active-index-change="paginationRender"
      @snap-index-change="paginationRender"
      @pagination-render="paginationRender"
    >
      <swiper-slide v-for="(item, index) in sliderItems" :key="index">
        <slot :item="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>
