export function getAllStarships(idx) {
    const endpoint = `https://swapi.co/api/starships/?page=${idx + 1}`;
    return fetch(endpoint, { mode: 'cors' }).then(res => res.json());
}