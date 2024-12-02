export const userLocalStorage = {
  get: () =>
    localStorage.getItem("USER")
      ? JSON.parse(localStorage.getItem("USER"))
      : null,
  set: (userDataContentInfo) => {
    const dataJson = JSON.stringify(userDataContentInfo);
    localStorage.setItem("USER", dataJson);
  },
  remove: () => {
    localStorage.removeItem("USER");
  },
};

export const adminLocalStorage = {
  get: () =>
    localStorage.get("ADMIN")
      ? JSON.parse(localStorage.getItem("ADMIN"))
      : null,
  set: (userDataContentInfo) => {
    const dataJson = JSON.stringify(userDataContentInfo);
    localStorage.setItem("ADMIN", dataJson);
  },
  remove: () => {
    localStorage.removeItem("ADMIN");
  },
};
