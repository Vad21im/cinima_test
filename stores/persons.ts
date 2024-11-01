import { defineStore } from "pinia"

const API_PERSON_CONTENT = (person_id) => `persons/persons/${person_id}`

export const usePersonsStore = defineStore("persons", () => {
  const persons = ref([]);

  const loadData = async (personIds) => {
    const promises = personIds.map(async (personId) => {
      const fetcher = async () => {
        const fetch = useNuxtApp().$apiNg
        const person = await fetch(API_PERSON_CONTENT(personId));
        return person; 
      }
      const { data } = await useAsyncData(`person-${personId}`, fetcher, { deep: false });
      return data.value;
    })

    const results = await Promise.all(promises);
    persons.value = results;
  }

  return { persons, loadData };
})
