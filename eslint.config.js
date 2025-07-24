import eslintConfigCityssm, { cspellWords, tseslint } from 'eslint-config-cityssm';
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
});
export default config;
