export const JWT_KEY = 'jwt';

export function getItem(key: string) {
  const jwt = localStorage.getItem(key);
  if (!jwt) return null;
  return jwt;
}

export function setItem<T>(state: T, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}
