<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm min-w-36">
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.rounded-lg {
  border-radius: 0.5rem;
}

.border {
  border-width: 1px;
  border-style: solid;
  border-color: hsl(214.3, 31.8%, 91.4%);
}

.bg-card {
  background-color: hsl(0, 0%, 100%);
}

.text-card-foreground {
  color: hsl(222.2, 47.4%, 11.2%);
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.p-6 {
  padding: 1.5rem;
}

.pt-0 {
  padding-top: 0;
}
</style>
