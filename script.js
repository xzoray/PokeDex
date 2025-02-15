const pokemonArr = [];

const pokemonContainer = document.getElementById("content");
let overlay = document.getElementById("overlay");
const loadBtn = document.getElementById("loadButton");
const spinner = document.getElementById("loadingSpinner");
let currentIndex = 0;

function init() {
  fetchPokeData();
}

async function fetchPokeData() {
  loadingSpinner();
  const promises = [];
  for (let i = 1; i <= 151; i++) {
      promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
  }
  const results = await Promise.all(promises);
  pokemonArr.push(...results);
  pokemonContainer.innerHTML = "";
  renderPokemon();
}

function renderPokemon() {
  loadBtn.style.display = "none";
  setTimeout(() => {
    const nextPokemon = pokemonArr.slice(currentIndex, currentIndex + 30);
    pokemonContainer.innerHTML += nextPokemon.map(pokemon => pokeCardTemplate(pokemon)).join("");
    currentIndex += 30;
  }, 3000); 
  loadBtn.style.display = "block";
}

function loadMorePokemon() {
  renderPokemon();
}

function pokeCardTemplate(pokemon) {
    const primaryType = pokemon.types[0].type.name;
    const secondaryTypeHTML = pokemon.types.length > 1 ? 
        `<img class="types2" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${pokemon.types[1].type.name}.svg" >`
        : '';
    const typeClass = `type-${primaryType}`;

    return `
      <div onclick="showPokemon(${pokemon.id})" class="poke-card ${typeClass}">
        <img class="sprites" src="${pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name.toUpperCase()}</h3>
        <div class="typesContainer">
          <img class="types1" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${primaryType}.svg">
          ${secondaryTypeHTML}
        </div>
      </div>
    `;
}

function showPokemon(pokemonId) {
    toggleOverlay()
    createPokemonOverlay(pokemonId - 1)
}

function toggleOverlay() {
    overlay.classList.toggle("hidden")
}

function createPokemonOverlay(pokemonIndex) {
  const primaryType = pokemonArr[pokemonIndex].types[0].type.name;
  const secondaryTypeHTML = pokemonArr[pokemonIndex].types.length > 1 ? 
      `<img class="types2" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${pokemonArr[pokemonIndex].types[1].type.name}.svg" >`
      : '';

    overlay.innerHTML = ` <div class="overlayContent">
                            <div class="pokeDesc">
                              <img class="overlayImg" src="${pokemonArr[pokemonIndex].sprites.other["official-artwork"].front_default}" alt="">
                              <h6>${pokemonArr[pokemonIndex].name.toUpperCase()}</h6>
                              <div class="typesContainer">
                                <img class="types1" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${primaryType}.svg">
                                ${secondaryTypeHTML}
                              </div>
                            </div>
                          </div>`
}

function loadingSpinner() {
  pokemonContainer.innerHTML = `<div class="spinner-container" id="loadingSpinner">
                                  <svg
                                      width="100"
                                      height="100"
                                      viewBox="0 0 100 100"
                                      xmlns="http://www.w3.org/2000/svg"
                                  >
                                      <circle cx="50" cy="50" r="45" fill="white" stroke="black" stroke-width="5" />
                                      <path d="M5 50h90" stroke="black" stroke-width="5" />
                                      <path d="M5 50a45 45 0 0 1 90 0" fill="blue" stroke="black" stroke-width="5" />
                                      <circle cx="50" cy="50" r="10" fill="white" stroke="black" stroke-width="5" />
                                      <animateTransform
                                          attributeType="XML"
                                          attributeName="transform"
                                          type="rotate"
                                          from="0 50 50"
                                          to="360 50 50"
                                          dur="0.5s"
                                          repeatCount="indefinite"
                                      />
                                  </svg>
                                </div>`;
}