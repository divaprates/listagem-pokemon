function convertPokemonsTypesToLi(pokemonTypes, type){
    return pokemonTypes.map(types => {
        return `<li class="type ${type}">${types}</li>`
    })
}

function convertPokemonToHTML(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.order}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${convertPokemonsTypesToLi(pokemon.types, pokemon.type).join('')}
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



