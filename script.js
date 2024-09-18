document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn');
    const recordButton = document.getElementById('record-btn');
    const messageInput = document.getElementById('message-input');
    const chatWindow = document.getElementById('chat-window');

    // Speech synthesis (text-to-speech)
    function speakMessage(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        if (message) {
            // Display the message in chat window
            chatWindow.innerHTML += `<div class="message sent">${message}</div>`; // Corrected string
            messageInput.value = '';
            
            // Convert text to speech
            speakMessage(message);
        }
    });

    // Speech recognition (speech-to-text)
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN'; // Set language to Indian English

    recognition.onresult = event => {
        const transcript = event.results[0][0].transcript;
        chatWindow.innerHTML += `<div class="message received">${transcript}</div>`; // Corrected string
        speakMessage(transcript); // Optional: Convert received message to speech
    };

    recordButton.addEventListener('click', () => {
        recognition.start();
    });
});
