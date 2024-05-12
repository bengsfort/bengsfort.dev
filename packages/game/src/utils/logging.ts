/* eslint-disable no-console */
type Logger = {
  log: typeof console.log;
  warn: typeof console.warn;
  info: typeof console.info;
  error: typeof console.error;
  logDev: typeof console.log;
  warnDev: typeof console.warn;
  subscope: (...subscopes: string[]) => Logger;
};

export const makeLoggers = (...scopes: string[]): Logger => {
  const scopeStr = scopes.join(':');
  const prefix = `[${scopeStr}]`;

  return {
    log: (...data) => console.log(prefix, ...data),
    warn: (...data) => console.warn(prefix, ...data),
    info: (...data) => console.info(prefix, ...data),
    error: (...data) => console.error(prefix, ...data),
    logDev: (...data) => import.meta.env.DEV && console.log(prefix, ...data),
    warnDev: (...data) => import.meta.env.DEV && console.warn(prefix, ...data),
    subscope: (...subscopes) => makeLoggers(scopeStr, ...subscopes),
  };
};
