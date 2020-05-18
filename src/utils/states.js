import { atom } from 'recoil';

export const DARK_MODE = 'darkMode';

export const darkModeState = atom({
  key: DARK_MODE,
  default: true,
});
