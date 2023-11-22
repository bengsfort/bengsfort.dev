type Logger = {
  log: typeof console.log;
  warn: typeof console.warn;
  info: typeof console.info;
  error: typeof console.error;
  logDev: typeof console.log;
  warnDev: typeof console.warn;
  subscope: (...subscopes: string[]) => Logger;
}

export const makeLoggers = (...scopes: string[]): Logger => {
  const scopeStr = scopes.join(':');

  return {
    log: (...data) => console.log(scopeStr, ...data),
    warn: (...data) => console.warn(scopeStr, ...data),
    info: (...data) => console.info(scopeStr, ...data),
    error: (...data) => console.error(scopeStr, ...data),
    logDev: (...data) => import.meta.env.DEV && console.log(scopeStr, ...data),
    warnDev: (...data) => import.meta.env.DEV && console.warn(scopeStr, ...data),
    subscope: (...subscopes) => makeLoggers(scopeStr, ...subscopes),
  };
}
