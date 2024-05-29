export function createChatInterface() {
    const container = document.createElement('div');
    container.id = 'chat-container';

    const messageList = document.createElement('div');
    messageList.id = 'message-list';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'message-input';
    input.placeholder = 'Type a message...';

    const button = document.createElement('button');
    button.id = 'send-button';
    button.textContent = 'Send';

    const clearButton = document.createElement('button');
    clearButton.id = 'clear-button';
    clearButton.textContent = 'Clear Messages';

    container.appendChild(messageList);
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(clearButton);
    document.body.appendChild(container);

    loadMessages(); // Charger les messages depuis le local storage

    clearButton.addEventListener('click', clearMessages); // Ajouter un événement pour le bouton clear
}

export function displayMessage(sender, message) {
    const messageList = document.getElementById('message-list');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messageList.appendChild(messageElement);
    saveMessages(); // Sauvegarder les messages dans le local storage
    autoScroll(); // Appeler la fonction de défilement automatique
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
    autoScroll(); // Défilement automatique après le chargement des messages
}

function clearMessages() {
    localStorage.removeItem('chatMessages');
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
}
