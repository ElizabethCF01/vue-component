<template>
  <div class="tabs">
    <div class="tabs-list gap-2">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped>
.tabs {
  display: inline-flex;
  flex-direction: column;
}

.tabs-list {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: hsl(210, 40%, 96.1%);
  padding: 0.25rem;
}

.tabs-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.tabs-trigger:hover {
  background-color: hsl(0, 0%, 100%, 0.5);
}

.tabs-trigger-active {
  background-color: hsl(0, 0%, 100%);
  color: hsl(222.2, 47.4%, 11.2%);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.tabs-content {
  margin-top: 0.5rem;
}
</style>
