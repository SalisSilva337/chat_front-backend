const socket = io('http://localhost:3000')

const loginContainer = document.querySelector("#login-container")
const messageContainer = document.querySelector("#message-container")
const messageForm = document.querySelector("#send-container")
const messageInput = document.querySelector("#message-input")
const nameInput = document.querySelector("#name-input")
const loginButton = document.querySelector("#login-button")
const sendButton = document.querySelector("#send-button")
const usersCount = document.querySelector("#users-count")



loginButton.addEventListener("click", e => {
    loginContainer.style.display = "none"
    messageInput.disabled = false
    const name = nameInput.value
    appendMessage("You Joined")
    socket.emit("new-user", name)
    
})

messageInput.addEventListener("input", e => {
    sendButton.hidden = false
})


socket.on('chat-message', data => {
    appendMessage(data.name + ": " + data.message)
})

socket.on('user-connected', name => {
    appendConnectedMessage(name + " connected")
    
})


socket.on('user-disconnected', name => {
    appendDisconnectedMessage(name + " disconnected")
})

messageForm.addEventListener("submit", e => {
    e.preventDefault()
    sendButton.hidden = true
    const message = messageInput.value
    selfAppendMessage("You:" + message)
    socket.emit("send-chat-message", message)
    messageInput.value = ""
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
})

function appendMessage(message) {
    const messageElement = document.createElement("div")
    messageElement.id = "messageElement"
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

function appendConnectedMessage(message) {
    const messageConnectedElement = document.createElement("div")
    messageConnectedElement.id = "messageConnectedElement"
    messageConnectedElement.innerText = message
    messageContainer.append(messageConnectedElement)
}

function appendDisconnectedMessage(message) {
    const messageDisconnectedElement = document.createElement("div")
    messageDisconnectedElement.id = "messageDisconnectedElement"
    messageDisconnectedElement.innerText = message
    messageContainer.append(messageDisconnectedElement)
}

function selfAppendMessage(message) {
    const messageSelfElement = document.createElement("div")
    messageSelfElement.id = "messageSelfElement"
    messageSelfElement.innerText = message
    messageContainer.append(messageSelfElement)
}
