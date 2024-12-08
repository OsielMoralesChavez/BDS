document.getElementById('chat-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const userInput = document.getElementById('user-input').value;
    const chatWindow = document.getElementById('chat-window');

    // Mostrar mensaje del usuario
    chatWindow.innerHTML += `<div><strong>Usuario:</strong> ${userInput}</div>`;

    // Enviar mensaje al backend
    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();

        if (data.reply) {
            chatWindow.innerHTML += `<div><strong>ChatGPT:</strong> ${data.reply}</div>`;
        } else {
            chatWindow.innerHTML += `<div><strong>Error:</strong> ${data.error}</div>`;
        }
    } catch (error) {
        chatWindow.innerHTML += `<div><strong>Error:</strong> No se pudo conectar con el servidor.</div>`;
    }

    // Limpiar input
    document.getElementById('user-input').value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;
});
