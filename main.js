import { Bot } from './bots/Bot.js';
import { displayMessage, createChatInterface, createBotList, displayPokemonCard } from './components/ui.js';
import { fetchRaceData, fetchDriverStandings, fetchConstructorStandings, fetchLastRaceResults, fetchNextRaceSchedule } from './api/ergast.js';
import { fetchTarkovItemByName, fetchTarkovBosses, fetchTarkovMaps, fetchTarkovTraders } from './api/tarkov.js';
import { fetchPokemonInfo, fetchPokemonTypes, fetchPokemonAbility } from './api/pokeapi.js';

const initializeBots = () => {
    return [
        new Bot('Formula 1 - Bot', {
            'hello': () => 'Hello from Formula 1 Bot!',
            'lastRaceWinner': fetchRaceData,
            'driverStandings': fetchDriverStandings,
            'constructorStandings': fetchConstructorStandings,
            'lastRaceResults': fetchLastRaceResults,
            'nextRaceSchedule': fetchNextRaceSchedule,
        }, './images/F1.png'),
        new Bot('Tarkov - Bot', {
            'hello': () => 'Hello from Tarkov Bot!',
            'item': (name) => {
                if (!name) {
                    return 'Veuillez entrer le nom d\'un item. Exemple : item M855A1';
                }
                return fetchTarkovItemByName(name);
            },
            'bosses': fetchTarkovBosses,
            'maps': fetchTarkovMaps,
            'traders': fetchTarkovTraders,
        }, './images/Tarkov.png'),
        new Bot('Pokémon - Bot', {
            'hello': () => 'Hello from Pokémon Bot!',
            'pokemon': async (pokemonName) => {
                if (!pokemonName) {
                    return 'Veuillez entrer le nom d\'un Pokémon. Exemple : pokemon pikachu';
                }
                const pokemonInfo = await fetchPokemonInfo(pokemonName);
                if (pokemonInfo) {
                    displayPokemonCard(pokemonInfo);
                    return '';
                } else {
                    return `Erreur lors de la récupération des informations pour "${pokemonName}".`;
                }
            },
            'types': fetchPokemonTypes,
            'ability': async (abilityName) => {
                if (!abilityName) {
                    return 'Veuillez entrer le nom d\'une capacité. Exemple : ability overgrow';
                }
                return await fetchPokemonAbility(abilityName);
            }
        }, './images/pokemon.png')
    ];
};

const sendMessage = (bots) => {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message === '') return;

    displayMessage('user', message);
    bots.forEach(bot => bot.processMessage(message));
    input.value = '';
};

const setupEventListeners = (bots) => {
    document.getElementById('send-button').addEventListener('click', () => sendMessage(bots));
    document.getElementById('message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(bots);
    });
};

const initializeApp = () => {
    createChatInterface();
    const bots = initializeBots();
    createBotList(bots);
    setupEventListeners(bots);
};

initializeApp();
