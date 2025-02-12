const pokemonArr = [];

let overlay = document.getElementById("overlay");

async function fetchPokeData() {
    const pokemonContainer = document.getElementById("content");
    pokemonContainer.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const pokemonData = await response.json();
      pokemonArr.push(pokemonData);
    }
    pokemonArr.forEach(pokemon => {
        pokemonContainer.innerHTML += pokeCardTemplate(pokemon);
    })
}

function pokeCardTemplate(pokemon) {
    const primaryType = pokemon.types[0].type.name;

    // Optionaler zweiter Typ
    const secondaryTypeHTML = pokemon.types.length > 1 
        ? `<img class="types2" src="https://cdn.jsdelivr.net/gh/partywhale/pokemon-type-icons@main/icons/${pokemon.types[1].type.name}.svg" >`
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
    overlay.innerHTML = ` <div class="overlayContent">
                            <div class="pokeDesc">
                              <img class="overlayImg" src="${pokemonArr[pokemonIndex].sprites.versions["generation-v"]["black-white"].animated.front_shiny}" alt="">
                              <h6>${pokemonArr[pokemonIndex].name.toUpperCase()}</h6>
                            </div>
                          </div>`
}