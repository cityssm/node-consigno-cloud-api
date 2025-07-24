import eslintConfigCityssm, {
  type Config,
  cspellWords,
  tseslint
} from 'eslint-config-cityssm'

const config = tseslint.config(...eslintConfigCityssm, {
  files: ['**/*.ts'],
  rules: {
    '@cspell/spellchecker': [
      'warn',
      {
        cspell: {
          words: [
            ...cspellWords,
            'certifio',
            'certifiocloud',
            'consigno',
            'esig',
            'freezone',
            'pdfa',
            'undownloaded'
          ]
        }
      }
    ]
  }
}) as Config

export default config
