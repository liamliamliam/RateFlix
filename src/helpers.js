const tmdbBase = 'http://image.tmdb.org/t/p/';
export const parseBackdropFile = (file, size) => {
  return `${tmdbBase}${size || 'w780'}${file}`;
};
// 'w300', 'w780', 'w1280', 'original'
export const parsePosterFile = (file, size) => {
  return `${tmdbBase}${size || 'w342'}${file}`;
};
// 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'
export const parsePersonFile = (file, size) => {
  return `${tmdbBase}${size || 'w185'}${file}`;
};
// ['w45', 'w185', 'h632', 'original']
export const parseLogoFile = (file, size) => {
  return `${tmdbBase}${size || 'w45'}${file}`;
};
// ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original']

export const setMode = darkMode => {
  document.body.classList[darkMode ? 'add' : 'remove']('bp3-dark');
};

export const GC = {
  domains: {
    local: 'http://localhost:5500',
    hosted: 'https://rateflix-server.herokuapp.com'
  }
};
export const dev = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const domain = () => dev() ? GC.domains.local : GC.domains.hosted;
