import { Settings } from '@/types/settings';
import { parseCookies } from 'nookies';

const STORAGE_KEY = 'settings';

export const getSettings = (): Settings => {
  let settings: Settings = {
    theme: 'dark',
  };
  const cookies = parseCookies();
  const settingsJson = cookies.STORAGE_KEY;
  if (settingsJson) {
    try {
      let savedSettings = JSON.parse(settingsJson) as Settings;
      settings = Object.assign(settings, savedSettings);
    } catch (e) {
      console.log(`Error:`, e);
    }
  }
  return settings;
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
