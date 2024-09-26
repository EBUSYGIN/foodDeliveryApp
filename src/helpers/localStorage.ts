export const JWT_KEY = 'jwt';
export const CART_KEY = 'cartData';

export function getItem(key: string) {
  const jwt = localStorage.getItem(key);
  if (!jwt) return null;
  return JSON.parse(jwt);
}

export function setItem<T>(state: T, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}
