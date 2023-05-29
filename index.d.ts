declare module 'nuxt/schema' {
  interface NuxtConfig {
    build?: {
      transpile: string[]
    }

    css: string[]

    googleFonts: {
      families: Record<string, boolean>
    }

    imports?: {
      dirs: string[]
    }

    modules: string[]

    pinia: {
      autoImports: string[] | [string, string[]]
    }

    typescript: {
      strict: boolean
    }

    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: string
          }
        }
      }
      define: {
        'process.env.DEBUG': boolean
      }
    }
  }
}
