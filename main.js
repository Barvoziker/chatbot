import { Bot } from './bots/Bot.js';
import { displayMessage, createChatInterface, createBotList } from './components/ui.js';
import { fetchRaceData, fetchDriverStandings, fetchConstructorStandings, fetchLastRaceResults, fetchNextRaceSchedule } from './api/ergast.js';

// Créer l'interface utilisateur
createChatInterface();

const bots = [
    new Bot('Formula 1 - Bot', {
        'bonjour': () => 'Bonjour je suis votre assistant Formula 1!',
        'lastRaceWinner': fetchRaceData,
        'driverStandings': fetchDriverStandings,
        'constructorStandings': fetchConstructorStandings,
        'lastRaceResults': fetchLastRaceResults,
        'nextRaceSchedule': fetchNextRaceSchedule,
    }, './images/F1.png'),
    new Bot('Bot2', {
        'hello': () => 'Hello from Bot2!',
        'date': () => new Date().toLocaleDateString(),
    }, './images/Tarkov.png'),
    new Bot('Bot3', {
        'hello': () => 'Hello from Bot3!',
        'weather': () => 'Weather data not available in this demo',
    }, './images/placeholder.png')
];

createBotList(bots); // Créer la liste des bots disponibles

document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    if (message === '') return;

    displayMessage('user', message);
    bots.forEach(bot => bot.processMessage(message));
    input.value = '';
}
