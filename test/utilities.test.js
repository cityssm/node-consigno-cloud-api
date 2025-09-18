import assert from 'node:assert';
import { describe, it } from 'node:test';
import { formatPhoneNumber } from '../utilities.js';
await describe('ConsignoCloudAPI/utilities', async () => {
    await describe('formatPhoneNumber', async () => {
        const phoneNumberTests = [
            {
                expected: { phone: '+15555555555', phoneExt: '' },
                input: '(555) 555-5555'
            },
            {
                expected: { phone: '+15555555555', phoneExt: '1234' },
                input: '555-555-5555 ext. 1234'
            },
            {
                expected: { phone: '+15555555555', phoneExt: '' },
                input: '+1 (555) 555-5555'
            },
            {
                expected: { phone: '+15555555555', phoneExt: '' },
                input: '1-555-555-5555'
            },
            {
                expected: { phone: '+15555555555', phoneExt: '' },
                input: '5555555555'
            },
            {
                expected: { phone: '+15555555555', phoneExt: '1234' },
                input: '(555) 555-5555 x1234'
            }
        ];
        for (const { expected, input } of phoneNumberTests) {
            await it(`formats ${input}`, () => {
                const result = formatPhoneNumber(input);
                assert.deepEqual(result, expected);
            });
        }
    });
});
