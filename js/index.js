// Makes an asynchronous GET request to the api endpoint provided and returns all the data to make up the chat transcript.
let getChatData = async () => {
    const url = 'https://redventures.github.io/chatly-ifier/api/v1.json';

    // Using fetch to handle response
    await fetch(url)
        .then(response => response.json())
        .then(json => {
            // Setting the json data to a variable to be used
            let data = json.data.messages;

            // Taking conversation date from returned data and setting it to DOM element for date.
            let date = new Date(json.data.conversationDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            let conversationDate = document.getElementsByClassName('header__date');
            conversationDate[0].innerHTML = date;

            // Selecting the chatbox, chat container and error message from the DOM by class name
            // and styles to hide the "No Messages Found" error.
            let chatTranscript = document.getElementsByClassName('chat__transcript');
            chatTranscript[0].classList.add('height');
            let chatbox = document.getElementsByClassName('chatbox');
            chatbox[0].classList.add('height');
            let error = document.getElementsByClassName('chatbox__error');
            error[0].classList.add('hidden');

            let createChat = (index) => {
                // index of each message used to get content for each message. 

                // creating elements for the chat section.
                let chat = document.createElement('div');
                let userIcon = document.createElement('img');
                let userMessage = document.createElement('div');
                let message = document.createElement('p');
                let username = document.createElement('div');
                let name = document.createElement('p');
                let timestamp = document.createElement('div');
                let userMessageTime = document.createElement('p');
                let clockIcon = document.createElement('img');

                // Creates element for textbox triangle
                let arrow = document.createElement('div');

                // Statically assigning classes to elements that are consistent for both types of chat.
                userIcon.className = 'chat__icon';
                userMessage.classList.add('chat__userMessage', 'chat__userMessage__textbox');
                message.className = 'chat__userMessage__message';
                username.className = 'chat__username';
                timestamp.className = 'chat__timestamp';
                userMessageTime.className = 'chat__time';
                clockIcon.className = 'clock-icon';

                // Checking if the index value is even
                let evenIndex = index % 2 == 0;
                // and setting classes according to that condition for the two different types of chat
                if(evenIndex) {
                    chat.classList.add('sent' , 'chat');
                    name.classList.add('sent__user', 'chat__username__name');
                    arrow.classList.add('left');
                } else {
                    chat.classList.add('from' , 'chat');
                    name.classList.add('from__user', 'chat__username__name');
                    arrow.classList.add('right');
                }
                
                // Adding the value for the delay variable using the messages index
                chat.style = `--delay: ${index}s`;

                // Adding tabIndex to the userMessage and handle focusin and focus out for userMessage
                userMessage.tabIndex = 0;
                userMessage.addEventListener('focusin', () => {
                    userMessage.classList.add('focus');
                    if(evenIndex) {
                        arrow.classList.add('focus--left');
                    } else {
                        arrow.classList.add('focus--right');
                    }
                });

                userMessage.addEventListener('focusout', () => {
                    userMessage.classList.remove('focus');
                    arrow.classList.remove('focus--left', 'focus--right');
                })
            
                // Setting the source attribute for images, icons 
                // and the formatted time and content for each message based on it's index value.
                userIcon.src = data[index].image;
                userIcon.setAttribute('alt', 'User profile picture');
                clockIcon.src = './images/clock.svg';
                clockIcon.setAttribute('alt', 'Clock icon');

                message.innerHTML = data[index].message;
                name.innerHTML = data[index].username;

                let formattedTime = new Date(data[index].timestamp).toLocaleString([], {timeStyle: 'short'});
                userMessageTime.innerHTML = formattedTime;

                // Appending all created elements to the DOM to be displayed in webpage.
                chatbox[0].appendChild(chat)
                chat.append(userIcon, userMessage);
                userMessage.append(message, username, arrow);
                username.append(name, timestamp);
                timestamp.append(clockIcon, userMessageTime)
            }

            // Calling createChat() with specified class names as parameters to generate content
            // from the GET request based on messages index value which is sent as a parameter.
            for (index = 0; index < data.length; index++) {
                createChat(index);
            }

        }).catch(error => console.log(error));
}

// Calls the getChatData() when the window is loaded.
window.onload = getChatData();