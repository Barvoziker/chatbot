export const createChatInterface = () => {
    const container = document.createElement('div');
    container.id = 'chat-container';

    const botListContainer = document.createElement('div');
    botListContainer.id = 'bot-list-container';

    const chatArea = document.createElement('div');
    chatArea.id = 'chat-area';

    const messageList = document.createElement('div');
    messageList.id = 'message-list';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'message-input';
    input.placeholder = 'Tapez un message...';

    const button = document.createElement('button');
    button.id = 'send-button';
    button.textContent = 'Envoyer';

    const clearButton = document.createElement('button');
    clearButton.id = 'clear-button';
    clearButton.textContent = 'Effacer les messages';

    chatArea.append(messageList, input, button, clearButton);
    container.append(botListContainer, chatArea);
    document.body.appendChild(container);

    loadMessages();

    clearButton.addEventListener('click', clearMessages);
};

export const displayMessage = (sender, message) => {
    const messageList = document.getElementById('message-list');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<strong>${sender} :</strong> ${message}`;
    messageList.appendChild(messageElement);
    saveMessages();
    autoScroll();
};

export const displayPokemonCard = (pokemon) => {
    const messageList = document.getElementById('message-list');
    const cardElement = document.createElement('div');
    cardElement.className = 'pokemon-card';
    cardElement.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-image">
        <h3>${pokemon.name}</h3>
        <p>Type : ${pokemon.types}</p>
        <p>Taille : ${pokemon.height}</p>
        <p>Poids : ${pokemon.weight}</p>
    `;
    messageList.appendChild(cardElement);
    saveMessages();
    autoScroll();
};

export const createBotList = (bots) => {
    const botListContainer = document.getElementById('bot-list-container');
    const botList = document.createElement('ul');
    botList.id = 'bot-list';

    bots.forEach(bot => {
        const botItem = document.createElement('li');
        botItem.className = 'bot-item';

        const botImage = document.createElement('img');
        botImage.src = bot.image;
        botImage.alt = `${bot.name} photo de profil`;
        botImage.className = 'bot-image';

        const botName = document.createElement('span');
        botName.textContent = bot.name;

        const botDescription = document.createElement('p');
        botDescription.textContent = 'Cliquez sur moi afin de connaitre mes commandes';
        botDescription.className = 'bot-description';

        botItem.append(botImage, botName, botDescription);
        botItem.addEventListener('click', () => handleBotClick(bot));
        botList.appendChild(botItem);
    });

    botListContainer.appendChild(botList);
};

function handleBotClick(bot) {
    const helloResponse = bot.actions['hello'] ? bot.actions['hello']() : bot.actions['bonjour']();
    displayMessage(bot.name, helloResponse);

    const commands = Object.keys(bot.actions).map(command => `<li>${command}</li>`).join('');
    displayMessage(bot.name, `Commandes disponibles : <ul>${commands}</ul>`);
}

const autoScroll = () => {
    const messageList = document.getElementById('message-list');
    messageList.scrollTop = messageList.scrollHeight;
};

const saveMessages = () => {
    const messageList = document.getElementById('message-list');
    const messages = Array.from(messageList.querySelectorAll('.message, .pokemon-card')).map(messageElement => messageElement.outerHTML);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
};

const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const messageList = document.getElementById('message-list');
    messages.forEach(messageHTML => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = messageHTML;
        messageList.appendChild(messageElement);
    });
    autoScroll();
};

const clearMessages = () => {
    localStorage.removeItem('chatMessages');
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
};
