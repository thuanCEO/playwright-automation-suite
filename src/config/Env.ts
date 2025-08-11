import path from 'path';
import fs from 'fs';

export type Config = any;

const CONFIG_DIR = path.resolve(__dirname);
const DEFAULT_FILE = path.join(CONFIG_DIR, 'default.json');

function loadJson(filePath: string): any {
    if (!fs.existsSync(filePath)) return {};
    try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch (err) {
        console.error(`Failed to parse config file ${filePath}:`, err);
        return {};
    }
}

function deepMerge(target: any, source: any): any {
    for (const key of Object.keys(source)) {
        if (
            source[key] instanceof Object &&
            !(source[key] instanceof Array) &&
            key in target
        ) {
            target[key] = deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}

export function loadConfig(): Config {
    const nodeEnv = (process.env.TEST_ENV || process.env.NODE_ENV || 'default').toLowerCase();
    const defaultConfig = loadJson(DEFAULT_FILE);

    const envFile = path.join(CONFIG_DIR, `${nodeEnv}.json`);
    const envConfig = loadJson(envFile);

    const merged = deepMerge(JSON.parse(JSON.stringify(defaultConfig)), envConfig);

    if (process.env.API_BASE_URL) merged.api = merged.api || {};
    if (process.env.API_BASE_URL) merged.api.baseURL = process.env.API_BASE_URL;
    if (process.env.WEB_BASE_URL) merged.web = merged.web || {};
    if (process.env.WEB_BASE_URL) merged.web.baseURL = process.env.WEB_BASE_URL;

    return merged;
}

export const config = loadConfig();

export default config;