
import SlimSelect from 'slim-select'

import "slim-select/dist/slimselect.css"

const selector = new SlimSelect({
  select: "#selector",
  showSearch: false,
  settings: {
    placeholderText: 'Pick breed for more information',
  },
})

//
//
//
// ======================================================================



import { fetchBreeds, fetchBreedImg } from "../src/js/cat-api"
//
// 
// 
// ======================================================================

export const refs = {
  errorMsg: document.querySelector('.error'),
  loadingMsg: document.querySelector('.loader'),
  breedSelector: document.querySelector("select.breed-select"),
  breedsArray: [],
  card: document.querySelector('.cat-info'),
}
//
//
//
// ======================================================================

// selector.slim.style.display = 'none'

function populateBreedSelector() {
  fetchBreeds().then(
    data => {
      refs.breedsArray = data;
      // ================================
      // addSelectBreed();

      const nameArray = data.map(obj => (
        { text: `${obj.name}`, value: `${obj.id}` }));
      selector.setData(nameArray)
      showSelector()
      loadHide()
      errorHide()
      eventListener()
  }).catch(
    error => {
      console.error(error);
      errorShow()
      // refs.errorMsg.classList.toggle("isInvisible");
    }
)
}

populateBreedSelector()

// function addSelectBreed() {
//   refs.breedsArray.forEach(breedEl => {
//     const selectEl = document.createElement('option');
//     selectEl.value = breedEl.id;
//     selectEl.textContent = breedEl.name;
//     refs.breedSelector.appendChild(selectEl)
//   }
//   );
//   refs.breedSelector.classList.remove('isInvisible')
// };
// 
//
//
// =======================================================================

function eventListener() {
  refs.breedSelector.addEventListener('change', onSelectedBreed)
  errorHide()
}


function onSelectedBreed(ev) {
  selectorDisabled()
  // refs.loadingMsg.classList.remove("isInvisible")
  loadShow()

// ===============================================
  fetchBreedImg(ev.target.value).then(
    data => {
      // refs.loadingMsg.classList.add("isInvisible")
      loadHide()
      // refs.card.classList.add("border")
      // =========================================
      drawCard(data, ev.target.value)
      borderShow()
      errorHide()
    }).catch(
      error => {
        console.log(error);
        errorShow()
        loadHide()
    // refs.errorMsg.classList.remove("isInvisible");
  });
};

function drawCard(imgUrl, ev) {
  // refs.breedSelector.classList.remove('isInvisible')
  selectorActive()
  const cat = refs.breedsArray.find(element => element.id === ev);
  refs.card.innerHTML = `<img
        class="img"
        src="${imgUrl[0].url}"
        alt="beautiful${cat.name}cat"
        width="480px"
        height="560px"
      />
      <div class="text-wrapper">
      <h2 class="headers">${cat.name}</h2>
      <p class="text">${cat.description}</p>
      <p class="text"><span class="decorated">Temperament: </span>${cat.temperament}</p>
      <a class="headers wiki" href="${cat.wikipedia_url}" target="_blank" rel="noreferrer noopener" >Wikipedia</a>
      </div>`     
};

function loadShow() {
  refs.loadingMsg.classList.remove("isInvisible")
}


function loadHide() {
  refs.loadingMsg.classList.add("isInvisible")
}

function errorShow() {
  refs.errorMsg.classList.remove("isInvisible");
}

function errorHide() {
  refs.errorMsg.classList.add("isInvisible");
}


function selectorDisabled() {
  document.getElementById('selector').disabled = true;
}

function selectorActive() {
  document.getElementById('selector').disabled = false;
}

function borderShow() {
  refs.card.classList.add("border")
}

function showSelector() {
  refs.breedSelector.classList.remove('ss-hide')
}

function hideSelector() { 
refs.breedSelector.classList.add('ss-hide')
}