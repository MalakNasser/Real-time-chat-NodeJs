const socket = io();
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");
const loginContainer = document.getElementsByClassName("login-container");
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
let currentUser; // Declare but don't initialize here

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (usernameInput.value.trim() !== "") {
    currentUser = usernameInput.value.trim(); // Set currentUser after form submission
    socket.emit("new user", currentUser);
    loginContainer[0].style.display = "none";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() !== "") {
    socket.emit("chat message", {
      username: currentUser,
      message: input.value.trim(),
    });
    input.value = "";
  }
});

socket.on("chat message", ({ username, message }) => {
  const item = document.createElement("div");
  item.textContent = `${username}: ${message}`;

  if (username === currentUser) {
    item.classList.add("user-message", "right");
  } else {
    item.classList.add("user-message");
  }

  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.emit("new user");

socket.on("new user", (username) => {
  console.log(`${username} joined the chat`);
});
