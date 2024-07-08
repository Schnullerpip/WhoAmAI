<script lang="ts" setup>
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="message-bubble">
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.message-bubble {
  max-width: 280px;
  border-radius: 7px;
  background-color: white;
  color: black;
  padding: 1px 5px;
  margin-top: 5px;
}
</style>
