import { isDev } from "./env";

export const log = (...args) => {
  if (isDev) {
    console.log(...args);
  }
};
