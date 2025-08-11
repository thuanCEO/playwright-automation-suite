import type { ReporterDescription } from '@playwright/test';

export const Reporter: { reporter: ReporterDescription[] } = {
    reporter: [
        ['html', { open: 'always' }],
    ]
};