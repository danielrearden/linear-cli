import { cache } from "../cache";

export const withCache = async <T>(key: string, routine: () => Promise<T>) => {
  const cached = cache.getKey(key);

  if (cached) {
    return cached as T;
  }

  const value = await routine();
  cache.setKey(key, value);
  cache.save(true);

  return value;
};
