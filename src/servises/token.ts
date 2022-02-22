const AUTH_TOKEN_NAME = 'what-to-watch';

export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN_NAME) ?? '';
}

export const setToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_NAME, token)
}

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
}
