export const capitalizeFirst = (s: string) => {
  if (s.length === 0) {
    return s;
  }
  return `${s[0].toUpperCase()}${s.slice(1).toLowerCase()}`
}

export const getLocalStorageItem = <T,>(key: string): T | undefined => {
  const localItem = localStorage.getItem(key);
  try {
    if (localItem) {
      return JSON.parse(localStorage.getItem(key) || '') as T;
    }
    return undefined;
  } catch (e) {
    return localItem as T;
  }
}

const checkDebugFlag = (flag: string) => {
  //@ts-ignore
  return !!window.optcgDebug && (typeof window.optcgDebug) === 'object' && !!window.optcgDebug[flag];
}

export const debugTiming = (message: string, timings: number[]) => {//@ts-ignore
  if (!checkDebugFlag('timing')) {
    return;
  }

  if (timings.length < 2) {
    return;
  }
  const overallTime = timings[timings.length - 1] - timings[0];
  const chunks: string[] = [];
  for (let i = 1; i < timings.length; i++) {
    chunks.push((timings[i] - timings[i - 1]).toFixed(1));
  }
  console.log(`${message}: ${overallTime.toFixed(1)}ms (Chunks ${chunks.join(' ')})`);
}