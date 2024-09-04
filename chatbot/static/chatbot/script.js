document.addEventListener('DOMContentLoaded', () => {
    const csrftoken = getCookie('csrftoken');
    const staticImageUrl = document.getElementById('static-image').src;
    const staticBotUrl = document.getElementById('static-bot').src;

    const searching = document.querySelector('.search')
    searching.addEventListener('keyup', ()=>{
        let query = searching.value;
        const username = document.querySelector('#username').innerHTML;
        const chatMessages = document.querySelector('.chat-messages');
        const searched = document.querySelector('.searched')
        fetch(`/search/${query}`)
        .then(response => response.json())
        .then(prompt => {
            prompt.forEach(p => {
                console.log(p.prompt)
                const userContainer = document.createElement('div');
                userContainer.className = 'chat-message-right mb-4';
        
                const userAvatar = document.createElement('img');
                userAvatar.src = staticImageUrl;
                userAvatar.alt = 'Avatar';
                userAvatar.className = 'rounded-circle mr-1';
                userAvatar.width = 40;
                userAvatar.height = 40;
                userContainer.appendChild(userAvatar);
        
                const userMessage = document.createElement('div');
                userMessage.className = 'flex-shrink-1 bg-light rounded py-2 px-3 mr-3';
                
                const userName = document.createElement('div');
                userName.className = 'font-weight-bold mb-1';
                userName.textContent = username;
                userMessage.appendChild(userName);
        
                const userPrompt = document.createElement('p');
                userPrompt.textContent = p.prompt;
                userMessage.appendChild(userPrompt);
        
                userContainer.appendChild(userMessage);
        
                const botContainer = document.createElement('div');
                botContainer.className = 'chat-message-left pb-4';
        
                const botAvatar = document.createElement('img');
                botAvatar.src = staticBotUrl;
                botAvatar.alt = 'Avatar';
                botAvatar.className = 'rounded-circle mr-1';
                botAvatar.width = 40;
                botAvatar.height = 40;
                botContainer.appendChild(botAvatar);
        
                const botMessage = document.createElement('div');
                botMessage.className = 'flex-shrink-1 bg-light rounded py-2 px-3 ml-3';
        
                const botName = document.createElement('div');
                botName.className = 'font-weight-bold mb-1';
                botName.textContent = 'DevBot';
                botMessage.appendChild(botName);
        
                const botResponse = document.createElement('p');
                botResponse.innerHTML = p.response;
                botMessage.appendChild(botResponse);
        
                botContainer.appendChild(botMessage);
        
                

                chatMessages.appendChild(userContainer);
                chatMessages.appendChild(botContainer);

                
        
                document.querySelector('#prompt').value = '';
        
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
            // chatMessages.style.display='none';
        })
    })

    function scrollToBottom() {
        const chatMessages = document.querySelector('.chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    scrollToBottom();

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    document.querySelector('.prompting').onsubmit = function() {

        const prompt = document.querySelector('#prompt').value;
        const username = document.querySelector('#username').innerHTML;

        fetch('/get_gemini_response/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                user: username,
                prompt: prompt,
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'success') {
                const userContainer = document.createElement('div');
                userContainer.className = 'chat-message-right mb-4';
        
                const userAvatar = document.createElement('img');
                userAvatar.src = staticImageUrl;
                userAvatar.alt = 'Avatar';
                userAvatar.className = 'rounded-circle mr-1';
                userAvatar.width = 40;
                userAvatar.height = 40;
                userContainer.appendChild(userAvatar);
        
                const userMessage = document.createElement('div');
                userMessage.className = 'flex-shrink-1 bg-light rounded py-2 px-3 mr-3';
                
                const userName = document.createElement('div');
                userName.className = 'font-weight-bold mb-1';
                userName.textContent = username;
                userMessage.appendChild(userName);
        
                const userPrompt = document.createElement('p');
                userPrompt.textContent = prompt;
                userMessage.appendChild(userPrompt);
        
                userContainer.appendChild(userMessage);
        
                const botContainer = document.createElement('div');
                botContainer.className = 'chat-message-left pb-4';
        
                const botAvatar = document.createElement('img');
                botAvatar.src = staticBotUrl;
                botAvatar.alt = 'Avatar';
                botAvatar.className = 'rounded-circle mr-1';
                botAvatar.width = 40;
                botAvatar.height = 40;
                botContainer.appendChild(botAvatar);
        
                const botMessage = document.createElement('div');
                botMessage.className = 'flex-shrink-1 bg-light rounded py-2 px-3 ml-3';
        
                const botName = document.createElement('div');
                botName.className = 'font-weight-bold mb-1';
                botName.textContent = 'DevBot';
                botMessage.appendChild(botName);
        
                const botResponse = document.createElement('p');
                botResponse.innerHTML = marked.parse(data.response);
                botMessage.appendChild(botResponse);
        
                botContainer.appendChild(botMessage);
        
                const chatMessages = document.querySelector('.chat-messages');

                chatMessages.appendChild(userContainer);
                chatMessages.appendChild(botContainer);
        
                document.querySelector('#prompt').value = '';
        
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        })
        .catch(error => console.error('Error:', error));

        return false;
    };
});
