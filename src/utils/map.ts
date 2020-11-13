export function mapKeys(map: any): string[] {
  if (isMap(map)) {
    return Array.from(map.keys());
  } else {
    return Object.keys(map);
  }
}

export function mapValue(map: any, key: string) {
  if (isMap(map)) {
    return map.get(key);
  } else {
    return map[key];
  }
}

function isMap(map: any): boolean {
  return typeof map.keys === 'function';
}
