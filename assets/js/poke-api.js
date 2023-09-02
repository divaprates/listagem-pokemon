const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id
    pokemon.order = generateOrder(pokeDetail.id)
    pokemon.name = convertUpperCase(pokeDetail.name)

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.abilities = pokeDetail.abilities.map(a => a.ability.name)
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    pokemon.baseExperience = pokeDetail.base_experience
    pokemon.species = pokeDetail.species.name

    pokemon.hp = pokeDetail.stats[0].base_stat
    pokemon.attack = pokeDetail.stats[1].base_stat
    pokemon.defese = pokeDetail.stats[2].base_stat

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then(response => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 6) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        
    return fetch(url)
            .then(response => response.json())
            .then(jsonBody => jsonBody.results)
            .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
            .then(detailRequest => Promise.all(detailRequest))
            .then(pokemonsDetails => pokemonsDetails)
}

pokeApi.getPokemon = (id) => {

    const pokemon = {url: `https://pokeapi.co/api/v2/pokemon/${id}`}

    return pokeApi.getPokemonDetail(pokemon)
}
