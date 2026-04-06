const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const pokemonInfo = document.getElementById("pokemonInfo");

searchBtn.addEventListener("click", buscarPokemon);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") buscarPokemon();
});

async function buscarPokemon() {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) return;

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    const response = await fetch(url);
    const data = await response.json();

    const tipos = data.types.map((type) => type.type.name).join(", ");
    pokemonInfo.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)} (#${data.id})</h2>
            <p>Tipos: <span class="types">${tipos}</span></p>
        `;
    pokemonInfo.style.display = "block";
  } catch (error) {
    pokemonInfo.innerHTML = "<p>Pokémon não encontrado!</p>";
    pokemonInfo.style.display = "block";
  }
}
