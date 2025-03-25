<template>
  <div class="container mx-auto py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center !mb-12">
        <h1 class="text-3xl font-bold mb-2">Color Palette Generator</h1>
        <p class="text-muted-foreground mb-4">
          Press the spacebar or click the refresh button to generate a new palette
        </p>

        <div class="flex justify-center gap-4 mb-6">
          <Tabs>
            <TabsTrigger @onValueChange="handleFormatChange" value="hex"> HEX </TabsTrigger>
            <TabsTrigger @onValueChange="handleFormatChange" value="rgb"> RGB </TabsTrigger>
            <TabsTrigger @onValueChange="handleFormatChange" value="hsl"> HSL </TabsTrigger>
          </Tabs>

          <Button @click="generateColors" variant="outline" class="gap-2 !px-5">
            <RefreshCw class="h-4" />
            Generate
          </Button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
        <Card v-for="color in colors" :key="color.id" class="overflow-hidden">
          <div
            :data-testid="`color-box-${color.id}`"
            class="h-40 flex items-center justify-center relative"
            :style="{ backgroundColor: color.hex }"
          >
            <Button
              variant="outline"
              size="icon"
              :class="`absolute top-2 right-2 bg-white/10 backdrop-blur-sm ${getTextColor(color.hex)}`"
              @click="toggleLock(color.id)"
              :data-testid="`lock-button-${color.id}`"
            >
              <Lock v-if="color.isLocked" class="h-4 w-4 text-black" />
              <Unlock v-else class="text-black h-4 w-4" />
            </Button>
          </div>
          <div class="!p-4 !pt-0">
            <div class="flex justify-between items-center">
              <span class="font-mono text-sm truncate">
                {{ getColorValue(color.hex) }}
              </span>
              <Button
                variant="ghost"
                size="icon"
                @click="copyToClipboard(color.hex)"
                aria-label="Copy color"
                title="Copy color"
                :data-testid="`copy-button-${color.id}`"
              >
                <Copy class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div class="!mt-8 text-center text-sm text-muted-foreground">
        <p>Tip: Lock colors you want to keep before generating a new palette</p>
      </div>
    </div>
  </div>
  <ToastComponent ref="toastRef" />
</template>
<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import Button from './ui/ButtonComponent.vue'
import Card from '@/components/ui/CardComponent.vue'
import Tabs from '@/components/ui/TabList.vue'
import TabsTrigger from '@/components/ui/TabTrigger.vue'
import ToastComponent from '@/components/ui/ToastComponent.vue'
import { Lock, Unlock, Copy, RefreshCw } from 'lucide-vue-next'
import { generateRandomHex, hexToHsl, hexToRgb } from '@/utils/colorUtils'
interface ColorInfo {
  id: number
  hex: string
  isLocked: boolean
}

type ColorFormat = 'hex' | 'rgb' | 'hsl'

const colors = ref<ColorInfo[]>([])
const colorFormat = ref<ColorFormat>('hex')

const generateColors = () => {
  colors.value = Array(5)
    .fill(null)
    .map((_, index) => {
      const existingColor = colors.value[index]

      if (existingColor && existingColor.isLocked) {
        return existingColor
      }

      return {
        id: existingColor?.id || Date.now() + index,
        hex: generateRandomHex(),
        isLocked: false,
      }
    })
}

onMounted(() => {
  generateColors()
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault()
      generateColors()
    }
  }

  window.addEventListener('keydown', handleKeyDown)
})

// Toggle lock state for a color
const toggleLock = (id: number) => {
  colors.value = colors.value.map((color) =>
    color.id === id ? { ...color, isLocked: !color.isLocked } : color,
  )
}

// Get color value based on selected format
const getColorValue = (hex: string) => {
  switch (colorFormat.value) {
    case 'rgb':
      return hexToRgb(hex)
    case 'hsl':
      return hexToHsl(hex)
    default:
      return hex
  }
}

const toastRef = useTemplateRef<typeof ToastComponent>('toastRef')
// Copy color to clipboard
const copyToClipboard = (color: string) => {
  navigator.clipboard.writeText(color)
  toastRef.value?.addToast({
    title: 'Color copied!',
    description: `${color} has been copied to clipboard`,
    duration: 2000,
  })
}
// Determine if text should be light or dark based on background color
const getTextColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  // Calculate perceived brightness (YIQ formula)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'text-black' : 'text-white'
}
const handleFormatChange = (value: string) => {
  colorFormat.value = value as ColorFormat
}
</script>
<style scoped></style>
