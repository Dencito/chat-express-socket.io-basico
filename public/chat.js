const socket = io()

let message = document.getElementById("message")
let username = document.getElementById("username")
let btn = document.getElementById("send")
let output = document.getElementById("output")
const actions = document.getElementById("actions")


btn.addEventListener("click", () => {

    socket.emit("chat:message", {
        username: username.value,
        message: message.value
    })   
})

message.addEventListener("keypress", ()=> {
    socket.emit("chat:typing", username.value)
    
})

socket.on("chat:message:sv", (data)=> {
    actions.innerHTML = ""
    output.innerHTML += `
    <p><strong>${data.username}</strong>: ${data.message}</p>`
})

socket.on("chat:typing:sv", (data)=> {
    console.log("username", data)
    actions.innerHTML = `
    <p><strong>${data}</strong>: is typing ...</p>`
})