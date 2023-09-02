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
            <button id="${pokemon.order}" class="detailBt" onclick="openModalDetail('${pokemon.id}')">Detail</button>
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


// modal:
var modal = document.getElementById("myModal");

function openModalDetail(id) {
    pokeApi.getPokemon(id)
        .then((p) => {
            modal.innerHTML = convertPokemonDetailToHTML(p)
        })
        .then(() => {
            modal.style.display = "block";
        });
}
  
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function convertPokemonDetailToHTML(pokemon) {
    return `
        <div class="pokemonDetail modal-content ${pokemon.type}">
            
        <div class="pokemon">
            <span class="name">${pokemon.name}</span>
            <span class="number">${pokemon.order}</span>
            <div class="detail">
                <ol class="types">
                    ${convertPokemonsTypesToLi(pokemon.types, pokemon.type).join('')}
                </ol>
            </div>

            <div class="detail detailImg">
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </div>

        <div class="description">
            <p><spam>About</spam></p>

            <div class="text">
                <label>Species</label> 
                <spam>${pokemon.species}</spam>
            </div>
            <div class="text">
                <label>Abilities</label>
                <spam>${pokemon.abilities}</spam>
            </div>
            <div class="text">
                <label>Height</label> 
                <spam>${pokemon.height}</spam>
            </div>
            <div class="text">
                <label>Weight</label>
                <spam>${pokemon.weight}</spam>
            </div>
            <div class="text">
                <label>Base Experience</label> 
                <spam>${pokemon.baseExperience}</spam>
            </div>


            <p><spam>Base Stats</spam></p>

            <div class="text">
                <label>Attack</label> 
                <spam>${pokemon.hp}</spam>
            </div>
            <div class="text">
                <label>Attack</label> 
                <spam>${pokemon.attack}</spam>
            </div>
            <div class="text">
                <label>Defese</label> 
                <spam>${pokemon.defese}</spam>
            </div>
            
        </div>
    </div>
    `
}
