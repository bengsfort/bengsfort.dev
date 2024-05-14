/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

interface Window {
  GameOptions: import('./config/options').GameOptions;
  GameInstance?: import('./game').GameInstance;
}

interface Performance {
  memory: {
    totalJSHeapSize: number;
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

declare module '*.glsl';
