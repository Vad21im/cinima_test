<script setup lang="ts">

</script>

<template>
  <div class="flex min-h-screen flex-col" :class="`bg-${theme}`">
    <LayoutsHeader />
    <slot />
    <LayoutsFooter />
  </div>
</template>
