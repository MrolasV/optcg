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