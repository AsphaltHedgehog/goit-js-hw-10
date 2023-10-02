// import apiKey form "./javaScript/cat-api";
// import catApi from "./javaScript/cat-api"
// export { refs, addSelectBreed }
import { fetchBreeds, fetchBreedImg } from "./javaScript/cat-api.js"
// ======================================================================

export const refs = {
  errorMsg: document.querySelector('.error'),
  loadingMsg: document.querySelector('.loader'),
  breedSelector: document.querySelector("select.breed-select"),
  breedsArray: [],
  card: document.querySelector('.cat-info'),
}

// ======================================================================
function populateBreedSelector() {
  fetchBreeds().then(
  data => {
    refs.breedsArray = data;
    addSelectBreed();
  }).catch(
    error => {
      console.error(error);
      refs.errorMsg.classList.toggle("isInvisible");
    }
)
}

populateBreedSelector()

export function addSelectBreed() {
  refs.breedsArray.forEach(breedEl => {
    const selectEl = document.createElement('option');
    selectEl.value = breedEl.id;
    selectEl.textContent = breedEl.name;
    refs.breedSelector.appendChild(selectEl)
  }
  );
  refs.breedSelector.classList.remove('isInvisible')
};

// =======================================================================
refs.breedSelector.addEventListener('change', onSelectedBreed)


function onSelectedBreed(ev) {
  refs.breedSelector.classList.add('isInvisible')
  refs.loadingMsg.classList.remove("isInvisible")
  
// ======================================================
  fetchBreedImg(ev.target.value).then(
    data => {
    refs.loadingMsg.classList.add("isInvisible")
    drawCard(data,ev.target.value)
    }).catch(
    error => {console.log(error);
    refs.errorMsg.classList.remove("isInvisible");
  });
};

function drawCard(imgUrl, ev) {
  refs.breedSelector.classList.remove('isInvisible')
  const cat = refs.breedsArray.find(element => element.id === ev);
  refs.card.innerHTML = `<img
        src="${imgUrl[0].url}"
        alt="beautiful${cat.name}cat"
        width="480px"
      />
      <h2>${cat.name}</h2>
      <p>${cat.description}</p>
      <p><span class="decorated">Temperament</span>${cat.temperament}</p>
      <a href="${cat.wikipedia_url}" target="_blank" rel="noreferrer noopener">Wikipedia</a>`
};


