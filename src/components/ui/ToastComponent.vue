<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div v-for="toast in toasts" :key="toast.id" class="toast-item">
        <div class="toast-content">
          <h4 v-if="toast.title" class="toast-title">{{ toast.title }}</h4>
          <p v-if="toast.description" class="toast-description">{{ toast.description }}</p>
        </div>
        <button class="toast-close" @click="removeToast(toast.id)">×</button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Toast {
  id: number
  title?: string
  description?: string
  duration?: number
}

const toasts = ref<Toast[]>([])

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = Date.now()
  const newToast = { id, ...toast }
  toasts.value.push(newToast)

  if (toast.duration !== Infinity) {
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 3000)
  }
}

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

// Expose methods to parent components
defineExpose({
  addToast,
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 50;
  max-width: 380px;
  pointer-events: none;
}

.toast-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  pointer-events: auto;
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 0.25rem;
}

.toast-description {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #64748b;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: #64748b;
  margin-left: 0.5rem;
}

.toast-close:hover {
  color: #334155;
}

/* Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateY(1rem);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
