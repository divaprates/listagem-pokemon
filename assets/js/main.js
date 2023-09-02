const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonsTypesToLi(pokemonTypes){
    return pokemonTypes.map(types => {
        return `<li class="type">${types}</li>`
    })
}

function convertPokemonToHTML(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${convertPokemonsTypesToLi(pokemon.types).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

const pokemonList = document.getElementById("pokemonList")


pokeApi.getPokemons().then((pokemons  = []) => {
    pokemonList.innerHTML = pokemons.map(convertPokemonToHTML).join('')
});



