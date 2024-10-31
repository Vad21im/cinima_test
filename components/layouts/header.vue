<script setup lang="ts">
const isLogin = ref(false);

const toggleLogin = () => {
  isLogin.value = !isLogin.value;
};

const { isDesktop } = useBreakpoints();
</script>

<template>

</template>
