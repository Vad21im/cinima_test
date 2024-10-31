<script setup>
const contentStore = useContentStore();
const { params } = useRoute();

const movie = contentStore.getContent(params.id);

// TODO переделать сложностнонику ниже на lodash

const personsByRole = computed(() => {
  const val = {};
  for (const p of useGet(movie, "participants", [])) {
    if (val[p.job]) {
      val[p.job].push(p);
    } else {
      val[p.job] = [p];
    }
  }
  return val;
});

const listsBlock = ref(null);

let observer;

const setListsHeight = () => {
  let listsBlockHeight = 0;
  const listsGap = 40;
  const lists = listsBlock.value?.children;
  const listsArray = Array.from(lists);
  const listsHeight = listsArray.map((list) => list.offsetHeight);
  const maxHeight = Math.max(...listsHeight);
  const minHeight = Math.min(...listsHeight) + listsGap;
  const setListsBlockHeight = () =>
    (listsBlock.value.style.height = `${listsBlockHeight}px`);

  listsBlockHeight = maxHeight;
  setListsBlockHeight();

  const options = {
    root: listsBlock.value,
  };

  const callback = function (entries) {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].intersectionRatio !== 1) {
        listsBlockHeight += minHeight;
        setListsBlockHeight();
        return;
      }
    }
  };

  observer = new IntersectionObserver(callback, options);

  listsArray.forEach((list) => {
    observer?.observe(list);
  });
};

onMounted(() => {
  //  useGet(personsByRole) при маунте возвращает не 0 значение
  if (!useSize(useGet(movie, "participants", []))) return;

  setListsHeight();
});

onUnmounted(() => {
  observer?.disconnect();
});

const name = (person) => `${person.last_name} ${person.first_name}`;
const src = "/avatars/avatar-example-2.jpg"; // TODO
</script>

<template>
  <UiSection
    v-if="useSize(personsByRole)"
    id="participants"
    title="Актеры и съемочная группа"
  >
    <div
      ref="listsBlock"
      class="flex flex-col content-start items-start justify-start gap-base max-lg:!h-auto lg:flex-wrap"
    >
      <div v-for="(persons, role) in personsByRole" :key="role">
        <h3 class="text-lg font-bold mb-sm xl:text-xl">{{ role }}</h3>
        <ul class="flex flex-col">
          <li v-for="{ person } in persons" :key="person.oid" class="mb-sm">
            <AppContentCastItem :person="person" />
          </li>
        </ul>
      </div>
    </div>
  </UiSection>
</template>
