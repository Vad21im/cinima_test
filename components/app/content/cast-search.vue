<script setup>
const persons = [
  {
    oid: "participant:11",
    person: {
      oid: "person:8",
      first_name: "Александра",
      last_name: "Казачкова",
      assets: [
        {
          oid: "asset:18",
          asset_type: "Photo",
          resize_url:
            "https://storage.yandexcloud.net/transcoder-pictures/metadata/person/8/840438aa596748eba92611b5774db0fd.png?w={w}&h={h}",
        },
      ],
    },
    job: "Режиссер",
    character: null,
  },
  {
    oid: "participant:12",
    person: {
      oid: "person:9",
      first_name: "Алевтина",
      last_name: "Смирнова",
      assets: [
        {
          oid: "asset:19",
          asset_type: "Photo",
          resize_url:
            "https://storage.yandexcloud.net/transcoder-pictures/metadata/person/9/4e134d65e7ca429f93344bfedf2c9451.jpg?w={w}&h={h}",
        },
      ],
    },
    job: "Автор сценария",
    character: null,
  },
];
</script>

<template>
  <div>
    <UiSection id="participants" title="Персоны">
      <ul class="flex flex-col">
        <li v-for="{ person } in persons" :key="person.oid" class="mb-sm">
          <AppContentCastItem :person="person" />
        </li>
      </ul>
    </UiSection>
  </div>
</template>
