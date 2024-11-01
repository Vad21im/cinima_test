import { defineStore } from "pinia";

const API_PERSON_CONTENT = (person_id) =>
  `persons/persons/${person_id}`;

export const usePersonStore = defineStore("person", () => {
  
  const person = ref({})

  const loadData = async (person_id) => {
    const fetcher = async () => {
      const fetch = useNuxtApp().$apiNg

      const person = await fetch(API_PERSON_CONTENT(person_id))
      return { person };
    }

    const { data } = await useAsyncData(
      "person",
      async () => await fetcher(),
      { deep: false },
    )

    person.value = data.value?.person
  }

  return { person,  loadData }
})
