import { Bot } from './bots/Bot.js';
import { displayMessage, createChatInterface, createBotList } from './components/ui.js';
import { fetchRaceData, fetchDriverStandings, fetchConstructorStandings, fetchLastRaceResults, fetchNextRaceSchedule } from './api/ergast.js';
import { fetchTarkovItemByName, fetchTarkovBosses, fetchTarkovMaps, fetchTarkovTraders } from './api/tarkov.js';

const initializeBots = () => {
    return [
        new Bot('Formula 1 - Bot', {
            'bonjour': () => 'Bonjour je suis votre assistant Formula 1!',
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
        new Bot('Bot3', {
            'hello': () => 'Hello from Bot3!',
            'weather': () => 'Weather data not available in this demo',
        }, './images/placeholder.png')
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
