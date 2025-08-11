import { LanguageEnum } from '@enums/LanguageEnum';
import { EnvironmentEnum } from '@enums/EnvironmentEnum';
import { BrowserEnum } from '@enums/BrowserEnum';

export const PlatForm = {
    environment: (process.env.TEST_ENV as EnvironmentEnum) || EnvironmentEnum.DEV,
    language: process.env.LANG as LanguageEnum || LanguageEnum.EN,
    browser: (process.env.BROWSER as BrowserEnum) || BrowserEnum.CHROMIUM,
};