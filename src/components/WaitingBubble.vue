<script setup lang="ts">

</script>

<template>
  <div class="waiting-bubble">
    <p class="dot" style="animation-delay: 0ms">\</p>
    <p class="dot" style="animation-delay: 100ms">:3</p>
    <p class="dot" style="animation-delay: 200ms">/</p>
  </div>
</template>

<style scoped>
.waiting-bubble {
  max-width: 280px;
  border-radius: 7px;
  background-color: white;
  color: black;
  padding: 1px 5px;
  margin-top: 5px;

  display: flex;
  flex-direction: row;
  justify-content: center;
}

.dot {
  animation: bounce 0.5s alternate infinite ease;
}

@keyframes bounce {
  to {
    transform: translateY(-5px);
  }
}
</style>