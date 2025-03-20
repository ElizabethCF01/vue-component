import { render, screen, fireEvent } from '@testing-library/vue'
import { beforeAll, describe, expect, test, vi } from 'vitest'
import ColorPaletteGenerator from '@/components/ColorPaletteGenerator.vue'

beforeAll(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: vi.fn(), // Mock de la función clipboard.writeText
    },
    writable: true,
  });
});

describe('ColorPaletteGenerator', () => {
  test('copy color to clipboard', async () => {
    const writeTextMock = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()

    render(ColorPaletteGenerator)

    const copyButton = await screen.findAllByRole('button', { name: /copy/i })

    await fireEvent.click(copyButton[0])

    expect(writeTextMock).toHaveBeenCalled()
  })
})
