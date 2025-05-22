// ——————————————————————————————————————————————
// 5) Initialize tmi.js with stored token
// ——————————————————————————————————————————————
let client;
function setupTwitchClient(token) {
  const username = "justinfan" + Math.floor(Math.random() * 1e6);
  // Get channel name from input

  client = new tmi.Client({
    identity: { username, password: "oauth:" + token },
    channels: currentChannel ? [currentChannel] : [],
  });

  client
    .connect()
    .then(() => log("✅ Connected to Twitch chat"))
    .catch((err) => log("❌ Chat error: " + err));

  client.on("message", (_channel, tags, message, self) => {
    // if (self) return;
    if (!message.startsWith('!tts ')) return;
    const text = message.slice(5);
    speak(text);
    log(`${tags.username}: ${text}`);
  });
}

// Set up debounced channel change handler
if (channelInput) {
  let channelUpdateTimeout;
  channelInput.addEventListener("input", (e) => {
    clearTimeout(channelUpdateTimeout);
    channelUpdateTimeout = setTimeout(() => {
      const newChannel = e.target.value.trim();

      // Only update if channel changed
      if (newChannel !== currentChannel) {
        if (client.readyState() === "OPEN") {
          // Leave current channel if one exists
          if (currentChannel) {
            client
              .part(currentChannel)
              .then(() => log(`Left channel: ${currentChannel}`))
              .catch((err) => log(`Error leaving channel: ${err}`));
          }

          // Join new channel if provided
          if (newChannel) {
            client
              .join(newChannel)
              .then(() => log(`Joined channel: ${newChannel}`))
              .catch((err) => log(`Error joining channel: ${err}`));
          }

          currentChannel = newChannel;
        }
      }
    }, 500); // Update after 500ms of inactivity
  });
}
