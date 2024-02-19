// scripts.js

document.getElementById('user_input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    var user_input = document.getElementById('user_input').value.trim();
    if (user_input.toLowerCase() === 'exit') {
        displayFinalChatHistory();
    } else {
        document.getElementById('waiting_message').style.display = 'block';

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/process_user_input', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                updateChatHistory(response.messages);
                document.getElementById('user_input').value = '';
                document.getElementById('waiting_message').style.display = 'none';
            }
        };
        xhr.send('user_input=' + encodeURIComponent(user_input));
    }
}

function displayFinalChatHistory() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/process_user_input', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            updateChatHistory(response.final_chat_history);
        }
    };
    xhr.send('user_input=exit');
}

function formatApiResponse(response) {
    var formattedResponse = '';
    for (var i = 0; i < response.length; i++) {
        formattedResponse += '&nbsp;&nbsp;&nbsp;&nbsp;' + response[i] + '<br>';
    }
    return formattedResponse;
}

function updateChatHistory(messages) {
    var chatHistory = document.getElementById('chat_history');
    chatHistory.innerHTML = '';
    messages.forEach(function(message) {
        var p = document.createElement('p');
        if (message['role'] === 'assistant') {
            var formattedContent = formatApiResponse(message['content'].split('\n'));
            p.innerHTML = `<strong>${message['role']}:</strong><br>${formattedContent}`;
        } else {
            p.innerHTML = `<strong>${message['role']}:</strong><br>${message['content']}`;
        }
        chatHistory.appendChild(p);
    });
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom
}
