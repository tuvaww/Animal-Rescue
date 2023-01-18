const LOCALSTORAGE_KEY = "Token";

export const getToken = () => {
  let valueFromSs = sessionStorage.getItem(LOCALSTORAGE_KEY) || "";
  return valueFromSs;
};

export const setToken = (token: string) => {
  sessionStorage.setItem(LOCALSTORAGE_KEY, token);
};

export const logout = () => {
  sessionStorage.removeItem(LOCALSTORAGE_KEY);
  sessionStorage.removeItem("User");
};
