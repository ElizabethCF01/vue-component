<template>
  <button :class="`tabs-trigger ${isSelected ? 'tabs-trigger-active' : ''}`" @click="onClick">
    <slot />
  </button>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  selectedValue: {
    type: String,
    default: '',
  },
  triggerValue: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['click'])
const isSelected = ref(props.selectedValue == props.triggerValue)

const onClick = () => {
  emit('click', props.triggerValue)
}
</script>
<style scoped>
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
</style>
