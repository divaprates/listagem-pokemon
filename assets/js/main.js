const pokemonList = document.getElementById("pokemonList")
const loadingMoreButton = document.getElementById("loadingMoreButton")
const limit = 6
let offset = 0
const maxRecord = 151

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

function loadingPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons  = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToHTML).join('')
    });
}

loadingPokemonItens(offset, limit);

loadingMoreButton.addEventListener('click', () => {
    offset += limit

    let qtdRecordNextPage = offset + limit
    if(qtdRecordNextPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadingPokemonItens(offset, newLimit);

        loadingMoreButton.parentElement.removeChild(loadingMoreButton)
    } else {
        loadingPokemonItens(offset, limit);
    }
})


