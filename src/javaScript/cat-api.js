import { refs } from "..";

const URL = 'https://api.thecatapi.com/v1';
const IMG_URL ='/images/search?breed_ids='

const parameters = {
  method: "GET",
  headers: {
    "x-api-key": "live_ZL3XhWtLx9PzffpMC34TtK4tTjDMFudnqqMsdgjRaXkrvfJiEqOSDyZliRvqukmf"
  },
};
// ======================================================


export function fetchBreeds() {
  return fetch(`${URL}/breeds`, parameters).then(
    response => response.json()
  )
};

export function fetchBreedImg(breedId) {
  return fetch(`${URL}${IMG_URL}${breedId}`).then(
    response => response.json() )
};


