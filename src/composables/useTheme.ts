import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const currentTheme = ref<Theme>('light')

export function useTheme() {
  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    document.body.setAttribute('data-theme', currentTheme.value)
  }

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    document.body.setAttribute('data-theme', theme)
  }

  return {
    currentTheme,
    toggleTheme,
    setTheme
  }
}
