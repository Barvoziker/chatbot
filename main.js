import { Bot } from './bots/Bot.js';
import { displayMessage, createChatInterface } from './components/ui.js';
import { fetchRaceData } from './api/ergast.js';

// Créer l'interface utilisateur
createChatInterface();

const bots = [
    new Bot('Bot1', {
        'hello': () => 'Hello from Bot1!',
        'time': () => new Date().toLocaleTimeString(),
        'race': fetchRaceData
    }),
    new Bot('Bot2', {
        'hello': () => 'Hello from Bot2!',
        'date': () => new Date().toLocaleDateString(),
        'race': fetchRaceData
    }),
    new Bot('Bot3', {
        'hello': () => 'Hello from Bot3!',
        'weather': () => 'Weather data not available in this demo',
        'race': fetchRaceData
    })
];

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
