const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const COOKIE_NAME = "twitch_access_token";
const CLIENT_ID = "rpxeacxzftzhcqofn9i1wgdhtt6his";
const SCOPES = "chat:read+chat:edit";
const REDIRECT_URI = location.origin + location.pathname;
const logEl = document.getElementById("log");
const statusEL = document.getElementById("status");

function log(msg) {
  logEl.textContent += msg + "\n";
}

function status(msg) {
  statusEL.innerHTML = msg;
}

const channelInput = document.getElementById("channel_name");
const currentChannel = channelInput ? channelInput.value.trim() : "";
