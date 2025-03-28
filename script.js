const pokemonArr = [];

const pokemonContainer = document.getElementById("content");
const overlay = document.getElementById("overlay");
const loadBtn = document.getElementById("loadButton");
const spinner = document.getElementById("loadingSpinner");
const searchInput = document.getElementById("searchInput");
let currentIndex = 0;

function init() {
  fetchPokeData();
}

async function fetchPokeData() {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
      promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
  }
  const results = await Promise.all(promises);
  pokemonArr.push(...results);
  renderPokemon();
}

function renderPokemon() {
  loadBtn.style.display = "none";
  loadingSpinner();
  setTimeout(() => {
    pokemonContainer.innerHTML = "";
    const nextPokemon = pokemonArr.slice(0, currentIndex + 30);
    pokemonContainer.innerHTML += nextPokemon.map(pokemon => pokeCardTemplate(pokemon)).join("");
    currentIndex += 30;
  }, 3000); 
  loadBtn.style.display = "block";;
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
      <div onclick="showPokemon(${pokemon.id - 1})" class="poke-card ${typeClass}">
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
    createPokemonOverlay2(pokemonId)
}

function toggleOverlay() {
    overlay.classList.toggle("hidden")
}

function eventProtection(event) {
  event.stopPropagation();
}

function createPokemonOverlay1(pokemonIndex) {
  const primaryType = pokemonArr[pokemonIndex].types[0].type.name;
  const secondaryTypeHTML = pokemonArr[pokemonIndex].types.length > 1 ? 
      `<img class="types2" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${pokemonArr[pokemonIndex].types[1].type.name}.svg" >` : '';
  const pokemonAbility1 = `<p>${pokemonArr[pokemonIndex].abilities[0].ability.name}</p`
  const pokemonAbility2 = pokemonArr[pokemonIndex].abilities > 1 ? `<p>${pokemonArr[pokemonIndex].abilities[1].ability.name}</p` : ``;

    overlay.innerHTML = ` <div class="overlayContent">
                            <div class="pokeDesc" onclick="eventProtection(event)">
                              <img class="overlayImg" src="${pokemonArr[pokemonIndex].sprites.other["official-artwork"].front_default}" alt="">
                              <h6>${pokemonArr[pokemonIndex].name.toUpperCase()}</h6>
                              <div class="typesContainer">
                                <img class="types1" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${primaryType}.svg">
                                ${secondaryTypeHTML}
                              </div>
                                <div id="dataNav">
                                  <a class="traits">traits</a>
                                  <a class="stats" onclick="createPokemonOverlay2(${pokemonIndex})">stats</a>
                                </div>
                                <div id="pokeData">
                                  <div class="pokeInfoQuestion">
                                    <p>Height:</p>
                                    <p>Weight:</p>
                                    <p>Base Experience:</p>
                                    <p>Ability:</p>
                                  </div>
                                  <div class="pokeInfoAnswer">
                                    <p>${pokemonArr[pokemonIndex].height} cm</p>
                                    <p>${pokemonArr[pokemonIndex].weight} kg</p>
                                    <p>${pokemonArr[pokemonIndex].base_experience} EP</p>
                                    ${pokemonAbility1}
                                    ${pokemonAbility2}
                                  </div>
                                </div>
                            </div>
                          </div>`
}

function createPokemonOverlay2(pokemonIndex) {
  const primaryType = pokemonArr[pokemonIndex].types[0].type.name;
  const secondaryTypeHTML = pokemonArr[pokemonIndex].types.length > 1 ? `<img class="types2" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${pokemonArr[pokemonIndex].types[1].type.name}.svg" >` : '';
  
    overlay.innerHTML = ` <div class="overlayContent">
                            <div class="pokeDesc" onclick="eventProtection(event)">
                              <img class="overlayImg" src="${pokemonArr[pokemonIndex].sprites.other["official-artwork"].front_default}" alt="">
                              <h6>${pokemonArr[pokemonIndex].name.toUpperCase()}</h6>
                              <div class="typesContainer">
                                <img class="types1" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${primaryType}.svg">
                                ${secondaryTypeHTML}
                              </div>
                                <div id="dataNav">
                                  <a onclick="createPokemonOverlay1(${pokemonIndex})" class="traits">traits</a>
                                  <a class="stats">stats</a>
                                </div>
                                <div id="pokeData">
                                  <div class="pokeInfoQuestion">
                                    <p>HP:</p>
                                    <p>Attack:</p>
                                    <p>Defense:</p>
                                    <p>Sp-Attack:</p>
                                    <p>Sp-Defense:</p>
                                    <p>Speed:</p>
                                  </div>
                                  <div class="pokeInfoAnswer">
                                    <p>${pokemonArr[pokemonIndex].stats[0].base_stat}</p>
                                    <p>${pokemonArr[pokemonIndex].stats[1].base_stat}</p>
                                    <p>${pokemonArr[pokemonIndex].stats[2].base_stat}</p>
                                    <p>${pokemonArr[pokemonIndex].stats[3].base_stat}</p>
                                    <p>${pokemonArr[pokemonIndex].stats[4].base_stat}</p>
                                    <p>${pokemonArr[pokemonIndex].stats[5].base_stat}</p>
                                </div>
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

document.getElementById("searchInput").addEventListener("input", debounce(function () {
  const searchValue = this.value.toLowerCase();
  
  if (searchValue.length < 3) {
      renderFilteredPokemon([]);
      return;
  }

  searchPokemon(searchValue);
}, 300));

function searchPokemon(searchValue) {
  const filteredPokemon = pokemonArr.filter(pokemon => 
      pokemon.name.toLowerCase().startsWith(searchValue)
  );

  renderFilteredPokemon(filteredPokemon);
}

function renderFilteredPokemon(pokemonList) {
  const pokemonContainer = document.getElementById("content");
  pokemonContainer.innerHTML = "";

  if (pokemonList.length === 0) {
      pokemonContainer.innerHTML = `<p class="failedSearch">Keine Pokémon gefunden.</p>`;
      return;
  }

  pokemonList.forEach(pokemon => {
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("poke-card");
      const primaryType = pokemon.types[0].type.name;
      const secondaryTypeHTML = pokemon.types.length > 1 ? 
        `<img class="types2" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${pokemon.types[1].type.name}.svg" >`
        : '';
    const typeClass = `type-${primaryType}`;
      pokemonCard.innerHTML = `
        <div class="poke-card ${typeClass}">
          <img class="sprites" src="${pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default}" alt="${pokemon.name}">
          <h3>${pokemon.name.toUpperCase()}</h3>
          <div class="typesContainer">
            <img class="types1" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${primaryType}.svg">
            ${secondaryTypeHTML}
          </div>
        </div>
      `;
      pokemonCard.addEventListener("click", function () {
          showPokemon(pokemon.id);
      });
      pokemonContainer.appendChild(pokemonCard);
  });
}

function debounce(func, delay) {
  let timer;
  return function () {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, arguments), delay);
  };
}

// function getCharts(index) {
//   const ctx = document.getElementById('myChart').getContext('2d');

// new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['HP', 'Attack', 'Defense', 'Sp-Attack', 'Sp-Defense', 'Speed'],
//     datasets: [{
//       label: 'Base Stats',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top'
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 5
//         }
//       }
//     }
//   }
// });
// }

console.log(pokemonArr)