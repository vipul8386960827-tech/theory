function lruCache(capacity) {
  const cache = new Map();

  function get(key) {
    if (!cache.has(key)) return -1;
    const value = cache.get(key);
    cache.delete(key);
    cache.set(key, value);
    return value;
  }

  function put(key, value) {
    if (cache.has(key)) cache.delete(key);
    else if (cache.size >= capacity) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }
    cache.set(key, value);
  }

  function printCache() {
    console.log([...cache.entries()]);
  }

  return { get, put, printCache };
}

const lruCacheInstance = lruCache(3);

lruCacheInstance.put(1, "hello");
lruCacheInstance.put(2, "bye");
lruCacheInstance.put(3, "super");

console.log(lruCacheInstance.get(1));

lruCacheInstance.put(4, "pastor");

console.log(lruCacheInstance.get(2));

lruCacheInstance.printCache();
