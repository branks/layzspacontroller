import fs from 'fs';
import { Config } from '../../../types/types';

const CONFIG_PATH = process.env.PATH_TO_CONFIG;
let CONFIG: Config = {};

export const getConfig = (): Config => CONFIG;

export const updateConfig = (config: Config) => {
  CONFIG = config;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(CONFIG));
}

const kill = () => {
  console.error('No config specified');
  process.exit();
}

const loadConfig = (): Config => {
  const config = fs.readFileSync(CONFIG_PATH, { encoding: 'utf8' });

  if (!config) {
    kill();
  }
  try {
    CONFIG = JSON.parse(config);
  } catch (e) {
    console.error('Config not valid');
    process.exit();
  }

  return CONFIG;
}

if (!CONFIG_PATH) {
  kill();
}
loadConfig();
