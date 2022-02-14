export const setTheme = darkMode => { return darkMode ? 'bp3-dark' : ''; }

export const parsePosterFile = (file, size) => { return `http://image.tmdb.org/t/p/${size || 'w342'}${file}`; };


export const parsePersonFile = (file, size) => { return `http://image.tmdb.org/t/p/${size || 'w185'}${file}`; };
// ['w45', 'w185', 'h632', 'original']

export const parseLogoFile = (file, size) => { return `http://image.tmdb.org/t/p/${size || 'w45'}${file}`; };
// ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original']