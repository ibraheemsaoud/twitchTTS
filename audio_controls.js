// Audio control state
window.audioEnabled = false;

// Button event listeners
document.getElementById("start").addEventListener("click", () => {
  window.audioEnabled = true;
  status("<div style='color: green'>TTS Started<div>");
});

document.getElementById("pause").addEventListener("click", () => {
  window.audioEnabled = false;
  messageQueue = [];
  recorder.pause();
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
  }
  status("<div style='color: orange'>TTS Stopped<div>");
});

// Patch the speak function after page loads
window.addEventListener("load", () => {
  const originalSpeak = window.speak;
  window.speak = function (text) {
    if (!window.audioEnabled) {
      status("<div style='color: red'>TTS is stopped. Press Start to begin.<div>");
      return;
    }
    originalSpeak(text);
  };
});
