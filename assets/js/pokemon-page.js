function mapTypeToGradient(type) {
    const typeGradients = {
        grass: 'linear-gradient(180deg, #a9e084 0%, #5E8246 100%)',
        fire: 'linear-gradient(180deg, #f89940 0%, #d57012 100%)',
        normal: 'linear-gradient(180deg, #a6a877 0%, #787a44 100%)',
        water: 'linear-gradient(180deg, #66b7e6 0%, #2679aa 100%)',
        electric: 'linear-gradient(180deg, #f5d760 0%, #be9908 100%)',
        ice: 'linear-gradient(180deg, #98d5d7 0%, #6badaf 100%)',
        fighting: 'linear-gradient(180deg, #e05c55 0%, #a12720 100%)',
        poison: 'linear-gradient(180deg, #e68ee6 0%, #9c4a9c 100%)',
        ground: 'linear-gradient(180deg, #f1da9b 0%, #bb8900 100%)',
        flying: 'linear-gradient(180deg, #baaae7 0%, #715bad 100%)',
        psychic: 'linear-gradient(180deg, #d67391 0%, #a83357 100%)',
        bug: 'linear-gradient(180deg, #c7d361 0%, #8d9a1d 100%)',
        rock: 'linear-gradient(180deg, #c4b265 0%, #aa9333 100%)',
        ghost: 'linear-gradient(180deg, #9178be 0%, #5931a1 100%)',
        steel: 'linear-gradient(180deg, #cbc8e7 0%, #a59df1 100%)',
        dragon: 'linear-gradient(180deg, #986fff 0%, #3a1b88 100%)',
        dark: 'linear-gradient(180deg, #a5826a 0%, #b05413 100%)',
        fairy: 'linear-gradient(180deg, #f9aec7 0%, #b04f6f 100%)',
    };
    return typeGradients[type] || 'linear-gradient(180deg, #CCCCCC 0%, #CCCCCC 100%)';
}

function mapTypeToColor(type) {
    const typeColors = {
        normal: '#a6a877',
        fire: '#f89940',
        water: '#66b7e6',
        grass: '#a9e084',
        electric: '#f5d760',
        ice: '#98d5d7',
        fighting: '#e05c55',
        poison: '#e68ee6',
        ground: '#f1da9b',
        flying: '#baaae7',
        psychic: '#d67391',
        bug: '#c7d361',
        rock: '#c4b265',
        ghost: '#9178be',
        steel: '#cbc8e7',
        dragon: '#986fff',
        dark: '#a5826a',
        fairy: '#f9aec7',
    };
    return typeColors[type] || '#CCCCCC';
}

function fillPokemonData(pokemonData) {
    document.querySelector('.id').textContent = `#${pokemonData.id}`;
    document.querySelector('.pokemon-section1-title').textContent = pokemonData.name;

    document.querySelector('.abilities').textContent = pokemonData.abilities.join(', ');
    document.querySelector('.weight').textContent = `${pokemonData.weight} kg`;
    document.querySelector('.height').textContent = `${pokemonData.height} m`;

    document.querySelector('.hp-stats').textContent = pokemonData.hp;
    document.querySelector('.attack-stats').textContent = pokemonData.attack;
    document.querySelector('.defense-stats').textContent = pokemonData.defense;
    document.querySelector('.spattack-stats').textContent = pokemonData.spattack;
    document.querySelector('.spdefense-stats').textContent = pokemonData.spdefense;
    document.querySelector('.speed-stats').textContent = pokemonData.speed;
    document.querySelector('#hp-bar').style.width = `${(pokemonData.hp / 255) * 100}%`;
    document.querySelector('#attack-bar').style.width = `${(pokemonData.attack / 255) * 100}%`;
    document.querySelector('#defense-bar').style.width = `${(pokemonData.defense / 255) * 100}%`;
    document.querySelector('#spattack-bar').style.width = `${(pokemonData.spattack / 255) * 100}%`;
    document.querySelector('#spdefense-bar').style.width = `${(pokemonData.spdefense / 255) * 100}%`;
    document.querySelector('#speed-bar').style.width = `${(pokemonData.speed / 255) * 100}%`;

    document.querySelector('.image-pokemon').src = pokemonData.photo;

    const typeContainer = document.querySelector('.types-container');
    typeContainer.innerHTML = '';

    pokemonData.types.forEach((type) => {
        const typeElement = document.createElement('div');
        typeElement.classList.add('type');
        typeElement.textContent = type;
        typeElement.style.backgroundColor = mapTypeToColor(type);
        typeContainer.appendChild(typeElement);
    });

    const pokemonPage = document.querySelector('.pokemon-page');
    const mainGradient = mapTypeToGradient(pokemonData.type);
    pokemonPage.style.background = mainGradient;

}

function getPokemonDetailsById(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => response.json())
        .then((pokemonData) => {
            const formattedPokemonData = {
                id: pokemonData.id,
                name: pokemonData.name,
                types: pokemonData.types.map((typeSlot) => typeSlot.type.name),
                type: pokemonData.types[0].type.name,
                abilities: pokemonData.abilities.map((ability) => ability.ability.name),
                weight: pokemonData.weight / 10,
                height: pokemonData.height / 10,
                photo: pokemonData.sprites.other['official-artwork'].front_default,
                hp: pokemonData.stats[0].base_stat,
                attack: pokemonData.stats[1].base_stat,
                defense: pokemonData.stats[2].base_stat,
                spattack: pokemonData.stats[3].base_stat,
                spdefense: pokemonData.stats[4].base_stat,
                speed: pokemonData.stats[5].base_stat,
            };
           
            fillPokemonData(formattedPokemonData);
        })
        .catch((error) => {
            console.error('Erro ao buscar dados do Pokémon:', error);
        });
}

const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

if (pokemonId) {
    getPokemonDetailsById(pokemonId);
} else {
    console.error('ID do Pokémon não encontrado na URL.');
}