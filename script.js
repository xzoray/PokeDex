const pokemonArr = [];

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
    const types = pokemon.types.map(typeInfo => typeInfo.type.name);
    const typeClass = types.length > 0 ? `type-${types[0]}` : '';

    return `
      <div class="poke-card ${typeClass}">
        <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name.toUpperCase()}</h3>
        <p class="types">${types.join(' ')}</p>
      </div>
    `;
}