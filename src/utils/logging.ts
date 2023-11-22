
type Logger = {
  log: typeof console.log;
  warn: typeof console.warn;
  info: typeof console.info;
  error: typeof console.error;
  subscope: (...subscopes: string[]) => Logger;
}

export const makeLoggers = (...scopes: string[]): Logger => {
  const scopeStr = scopes.join(':');

  return {
    log: (...data) => console.log(scopeStr, ...data),
    warn: (...data) => console.warn(scopeStr, ...data),
    info: (...data) => console.info(scopeStr, ...data),
    error: (...data) => console.error(scopeStr, ...data),
    subscope: (...subscopes) => makeLoggers(scopeStr, ...subscopes),
  };
}
