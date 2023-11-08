export const storage = {
  set: (key, v) => {
    localStorage.setItem(key, JSON.stringify(v));
  },

  get: (key) => {
    try {
      let s = localStorage.getItem(key);
      return JSON.parse(s);
    } catch (e) {
      return null;
    }
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },
};
