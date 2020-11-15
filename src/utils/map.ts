export function mapKeys(map: any): string[] {
  if (isMap(map)) {
    return Array.from(map.keys());
  } else {
    return Object.keys(map);
  }
}

export function mapValue(map: any, key: string): any {
  if (isMap(map)) {
    return map.get(key);
  } else {
    return map[key];
  }
}

export function setMapValue(map: any, key: string, value: any): void {
  if (isMap(map)) {
    map.set(key, value);
  } else {
    map[key] = value;
  }
}

function isMap(map: any): boolean {
  return typeof map.keys === 'function';
}
