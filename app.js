const listaPokemon = document.querySelector('#listaPokemon');
const btnHeader = document.querySelectorAll('.btn-header')
const totalPokemon = 151;
const pokemonPromises = [];

for (let i = 1; i <= totalPokemon; i++) {
    const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => response.json());
    pokemonPromises.push(promise); // Se añade la promesa al array pokemonPromises
}

// Promise.all(pokemonPromises)
//     .then((pokemonData) => {
//         pokemonData.forEach(mostrarPokemon); // Se llama a la función mostrarPokemon con los datos de cada Pokémon
//     })
//     .catch((error) => {
//         console.error('Error al obtener datos de los Pokémon:', error); // Manejo de errores en caso de fallo en alguna solicitud fetch
//     });

// Código anterior...

Promise.all(pokemonPromises)
    .then((pokemonData) => {
        pokemonData.forEach(mostrarPokemon); // Se llama a la función mostrarPokemon con los datos de cada Pokémon
    
        btnHeader.forEach(btn => {
        btn.addEventListener('click', (event) => {
        const tipoPokemon = event.currentTarget.id; // Obtener el id del botón (que es el tipo de Pokémon)
        // Buscar el Pokémon correspondiente en los datos disponibles
        listaPokemon.innerHTML = '';
        const pokemonesDeTipo = pokemonData.filter(poke => {
            return poke.types.some(type => type.type.name === tipoPokemon);
        });
        if (pokemonesDeTipo.length > 0) {
            // Mostrar los Pokémon correspondientes al tipo
            pokemonesDeTipo.forEach(mostrarPokemon);
        } else {
            console.log(`No se encontró ningún Pokémon del tipo ${tipoPokemon}`);
        }
    });
});
    })
    .catch((error) => {
        console.error('Error al obtener datos de los Pokémon:', error); // Manejo de errores en caso de fallo en alguna solicitud fetch
    });



function mostrarPokemon(poke) {

    let tipos = poke.types.map(type => 
        `
        <p class="${type.type.name} tipo">${type.type.name}</p>
        `);   
        tipos = tipos.join('')

        let pokeId = poke.id.toString();
        if(pokeId.length === 1){
            pokeId = "00" + pokeId;
        } else if(pokeId.length === 2){
            pokeId = "0" + pokeId;
        }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

btnHeader.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const nombrePokemon = event.currentTarget.className; // Obtener la clase del botón
        // Buscar el Pokémon correspondiente en los datos disponibles

        listaPokemon.innerHTML = '';
        
        const pokemon = pokemonData.find(poke => poke.name === nombrePokemon);
        if (pokemon) {
            // Mostrar el Pokémon correspondiente
            mostrarPokemon(pokemon);
        } else {
            console.log(`No se encontró ningún Pokémon con el nombre ${nombrePokemon}`);
        }
    });
});