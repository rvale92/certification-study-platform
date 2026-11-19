document.addEventListener('DOMContentLoaded', () => {
    const N8N_WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL_HERE";

    // DOM Elements
    const widget = document.getElementById('ai-tutor-widget');
    const toggleButton = document.getElementById('ai-tutor-toggle-button');
    const chatOutput = document.getElementById('ai-tutor-chat-output');
    const inputField = document.getElementById('ai-tutor-input');
    const sendButton = document.getElementById('ai-tutor-send-button');

    let isWidgetVisible = false;

    function parseMarkdown(text) {
        try {
            return marked.parse(text);
        } catch (error) {
            console.error('Markdown parsing error:', error);
            return text;
        }
    }

    function appendMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `p-2 my-1 rounded-lg max-w-[80%] ${
            isUser 
                ? 'self-end bg-blue-100 text-blue-800 ml-auto' 
                : 'self-start bg-gray-200 text-gray-800 mr-auto'
        }`;
        messageDiv.innerHTML = isUser ? text : parseMarkdown(text);
        chatOutput.appendChild(messageDiv);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    function toggleChatWidget() {
        isWidgetVisible = !isWidgetVisible;
        if (isWidgetVisible) {
            widget.style.height = '500px';
            widget.classList.remove('translate-y-full', 'opacity-0', 'h-0');
            widget.classList.add('translate-y-0', 'opacity-100');
            toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
        } else {
            widget.classList.remove('translate-y-0', 'opacity-100');
            widget.classList.add('translate-y-full', 'opacity-0');
            setTimeout(() => { widget.style.height = '0'; }, 300);
            toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>';
        }
    }

    async function sendMessage() {
        const userText = inputField.value.trim();
        if (!userText) return;

        inputField.disabled = true;
        sendButton.disabled = true;
        sendButton.innerHTML = '...';

        appendMessage(userText, true);
        inputField.value = '';

        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            appendMessage(data.response || "I apologize, but I didn't receive a valid response. Please try again.");

        } catch (error) {
            console.error('Error:', error);
            appendMessage("I'm sorry, but I encountered an error. Please check your connection and try again.");
        } finally {
            inputField.disabled = false;
            sendButton.disabled = false;
            sendButton.innerHTML = 'Send';
            inputField.focus();
        }
    }

    toggleButton.addEventListener('click', toggleChatWidget);
    sendButton.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    setTimeout(() => {
        toggleChatWidget();
    }, 1000);
});
