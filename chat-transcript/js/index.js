// Makes an asynchronous GET request to the api endpoint provided and returns all the data to make up the chat transcript.
let getChatData = async () => {
    const url = "https://redventures.github.io/chatly-ifier/api/v1.json";
    let response = await fetch(url);
    let data = await response.json();

    // Setting data to content variable to not repeat data.data.
    let content = data.data;

    // Taking conversation date from returned data and setting it to DOM element for date.
    let date = new Date(content.conversationDate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let conversationDate = document.querySelector(".header__date");
    conversationDate.innerHTML = date;

    // selecting the chat container from the DOM by it's class name.
    let chat = document.querySelector(".chat");

    let createChat = (chatType, delay, direction, nameType, index) => {
        // chatType - wether the chat is a "From" or "Sent" chat.
        // delay - the specified time for delay in message animation.
        // direction - the direction of the textbox (left = "Sent", right = "From").
        // nameType - wether the username is to be "Sent" or "From"  (Red or Blue).
        // index - the array index returned from GET request used to get content for each message.

        // creating elements for the chat section.
        let chatContainer = document.createElement("div");
        let userIcon = document.createElement("img");
        let userMessage = document.createElement("div");
        let message = document.createElement("p");
        let username = document.createElement("div");
        let name = document.createElement("p");
        let timestamp = document.createElement("div");
        let userMessageTime = document.createElement("p");
        let clockIcon = document.createElement("img");

        // Statically assigning classes to elements that are consistent for each type of chat.
        // Dynamically passing parameters to set unique classes for "From" or "Sent" chat type.
        chatContainer.classList.add("chat__container" , chatType);
        userIcon.className = "chat__icon";
        userMessage.classList.add("chat__userMessage", "chat__userMessage__textbox", direction);
        message.className = "chat__userMessage__message";
        username.className = "chat__username";
        name.classList.add("chat__username__name", nameType);
        timestamp.className = "chat__timestamp";
        userMessageTime.className = "chat__time";
        clockIcon.className = "clock-icon";

        // Adding the value for the delay variable 
        // of the message transition set within the stylesheet.
        chatContainer.style = `--delay: ${delay}`;

        // Setting the source attribute for images, icons 
        // and the formatted time and content for each message based on it's index value.
        userIcon.src = content.messages[index].image;
        userIcon.setAttribute("alt", "Users profile picture");

        clockIcon.src = "./images/clock.svg";
        clockIcon.setAttribute("alt", "Clock icon");

        message.innerHTML = content.messages[index].message;
        name.innerHTML = content.messages[index].username;

        let formattedTime = new Date(content.messages[index].timestamp).toLocaleString([], {timeStyle: 'short'});
        userMessageTime.innerHTML = formattedTime;

        // Appending all created elements to the DOM to be displayed in webpage.
        chat.append(chatContainer)
        chatContainer.append(userIcon, userMessage);
        userMessage.append(message, username);
        username.append(name, timestamp);
        timestamp.append(clockIcon, userMessageTime)
    }

    // Calling createChat() with specified class names as parameters to generate content
    // from the GET request based on messages index value which is sent as a parameter.
    // (chatType, delay, direction, nameType, index)
    createChat(null , "0s" , "left" , "chat__username__name--sent" , 0);
    createChat("chat__container--from" , "3s" , "right" , "chat__username__name--from" , 1);
    createChat(null , "5s" , "left" , "chat__username__name--sent" , 2);
    createChat("chat__container--from" , "7s" , "right" , "chat__username__name--from" , 3);

}

// Calls the getChatData() when the window is loaded.
window.onload = getChatData();