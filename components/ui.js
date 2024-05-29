export function createChatInterface() {
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

    chatArea.appendChild(messageList);
    chatArea.appendChild(input);
    chatArea.appendChild(button);
    chatArea.appendChild(clearButton);

    container.appendChild(botListContainer);
    container.appendChild(chatArea);
    document.body.appendChild(container);

    loadMessages(); // Charger les messages depuis le local storage

    clearButton.addEventListener('click', clearMessages); // Ajouter un événement pour le bouton clear
}

export function displayMessage(sender, message) {
    const messageList = document.getElementById('message-list');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<strong>${sender} :</strong> ${message}`;
    messageList.appendChild(messageElement);
    saveMessages(); // Sauvegarder les messages dans le local storage
    autoScroll(); // Appeler la fonction de défilement automatique
}

export function createBotList(bots) {
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

        botItem.appendChild(botImage);
        botItem.appendChild(botName);
        botItem.appendChild(botDescription);
        botItem.addEventListener('click', () => handleBotClick(bot));
        botList.appendChild(botItem);
    });

    botListContainer.appendChild(botList);
}

function handleBotClick(bot) {
    // Exécuter la commande "hello" ou "bonjour"
    const helloResponse = bot.actions['hello'] ? bot.actions['hello']() : bot.actions['bonjour']();
    displayMessage(bot.name, helloResponse);

    // Afficher la liste des commandes disponibles
    const commands = Object.keys(bot.actions).join(', ');
    displayMessage(bot.name, `Commandes disponibles : ${commands}`);
}

function autoScroll() {
    const messageList = document.getElementById('message-list');
    messageList.scrollTop = messageList.scrollHeight;
}

function saveMessages() {
    const messageList = document.getElementById('message-list');
    const messages = [];
    messageList.querySelectorAll('.message').forEach(messageElement => {
        messages.push(messageElement.innerHTML);
    });
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const messageList = document.getElementById('message-list');
    messages.forEach(messageHTML => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = messageHTML;
        messageList.appendChild(messageElement);
    });
    autoScroll();
}

function clearMessages() {
    localStorage.removeItem('chatMessages');
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
}
