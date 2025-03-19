<template>
  <button :class="`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`">
    <slot />
  </button>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  variant: {
    type: String as PropType<'default' | 'outline' | 'ghost' | 'link'>,
    default: 'default',
  },
  size: {
    type: String as PropType<'default' | 'sm' | 'lg' | 'icon'>,
    default: 'default',
  },
})
const variantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
}

const sizeClasses = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
</script>
<style scoped>
.bg-primary {
  background-color: hsl(222.2, 47.4%, 11.2%);
}

.text-primary-foreground {
  color: hsl(210, 40%, 98%);
}

.hover\:bg-primary\/90:hover {
  background-color: hsl(222.2, 47.4%, 11.2%, 0.9);
}

.border-input {
  border-color: hsl(214.3, 31.8%, 91.4%);
}

.bg-background {
  background-color: hsl(0, 0%, 100%);
}

.hover\:bg-accent:hover {
  background-color: hsl(210, 40%, 96.1%);
}

.hover\:text-accent-foreground:hover {
  color: hsl(222.2, 47.4%, 11.2%);
}

.text-primary {
  color: hsl(222.2, 47.4%, 11.2%);
}

.focus-visible\:ring-ring:focus-visible {
  --ring-color: hsl(215, 20.2%, 65.1%);
}

.focus-visible\:ring-offset-2:focus-visible {
  --ring-offset-width: 2px;
}

.disabled\:opacity-50:disabled {
  opacity: 0.5;
}
</style>
