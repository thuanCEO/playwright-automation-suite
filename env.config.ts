import * as dotenv from "dotenv";
import fs from 'fs';
dotenv.config();

console.log(process.env.BASE_URL);

const envPath = require('path').resolve(__dirname, 'src/config/ConfigUrl.json');
const env = JSON.parse(fs.readFileSync(envPath, 'utf-8'));

export const currentEnv = process.env.NODE_ENV || 'dev_en';

export const orangeHrmUrl: string = env[currentEnv].orangeHrmUrl;
export const testArchitectUrl: string = env[currentEnv].testArchitectUrl;
export const apiUrl: string = env[currentEnv].apiUrl;
export const playwrightUrl: string = env[currentEnv].playwrighttUrl;

console.log('Current ENV:', currentEnv);

