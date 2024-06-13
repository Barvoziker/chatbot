const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

export const fetchPokemonInfo = async (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    try {
        const data = await fetchJSON(url);
        return {
            name: data.name,
            types: data.types.map(typeInfo => typeInfo.type.name).join(', '),
            height: data.height,
            weight: data.weight,
            image: data.sprites.front_default
        };
    } catch (error) {
        return null;
    }
};

export const fetchPokemonTypes = async () => {
    const url = `https://pokeapi.co/api/v2/type`;
    try {
        const data = await fetchJSON(url);
        const types = data.results.map(type => type.name).join(', ');
        return `Types de Pokémon : ${types}`;
    } catch (error) {
        return 'Erreur lors de la récupération des types de Pokémon.';
    }
};

export const fetchPokemonAbility = async (abilityName) => {
    const url = `https://pokeapi.co/api/v2/ability/${abilityName.toLowerCase()}`;
    try {
        const data = await fetchJSON(url);
        return `Capacité : ${data.name}\nEffet : ${data.effect_entries.find(entry => entry.language.name === 'en').effect}`;
    } catch (error) {
        return `Erreur lors de la récupération des informations pour la capacité "${abilityName}".`;
    }
};
