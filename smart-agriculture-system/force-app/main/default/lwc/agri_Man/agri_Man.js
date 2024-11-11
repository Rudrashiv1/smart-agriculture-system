import { LightningElement } from 'lwc';

export default class agriMan extends LightningElement {
    handleKeyUp(event) {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }

    sendMessage() {
        const input = this.template.querySelector('input');
        const message = input.value;
        if (message) {
            const chatBody = this.template.querySelector('#chatBody');
            const messageElement = document.createElement('div');
            messageElement.className = 'user-message';
            messageElement.textContent = message;
            chatBody.appendChild(messageElement);
            input.value = '';
            this.scrollToBottom(chatBody);
            this.getBotResponse(message);
        }
    }

    scrollToBottom(element) {
        element.scrollTop = element.scrollHeight;
    }

    getBotResponse(message) {
        // Simulate a bot response
        const chatBody = this.template.querySelector('#chatBody');
        const botMessageElement = document.createElement('div');
        botMessageElement.className = 'bot-message';
        botMessageElement.textContent = `Bot: You said "${message}"`;
        setTimeout(() => {
            chatBody.appendChild(botMessageElement);
            this.scrollToBottom(chatBody);
        }, 1000);
    }
}