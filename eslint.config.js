import eslintConfigCityssm, { defineConfig } from 'eslint-config-cityssm';
import { cspellWords } from 'eslint-config-cityssm/exports.js';
const config = defineConfig(eslintConfigCityssm, {
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
});
export default config;
