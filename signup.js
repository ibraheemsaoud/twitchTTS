// ——————————————————————————————————————————————
// 2) Helpers: read cookie by name
// ——————————————————————————————————————————————
function readCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

// ——————————————————————————————————————————————
// 3) “Login” button: redirect to Twitch OAuth
// ——————————————————————————————————————————————
loginBtn.onclick = () => {
  const authUrl =
    `https://id.twitch.tv/oauth2/authorize` +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=token` +
    `&scope=${SCOPES}` +
    `&force_verify=true`;
  location.href = authUrl;
};

// ——————————————————————————————————————————————
// 4) “Logout” button: clear cookie & reload
// ——————————————————————————————————————————————
logoutBtn.onclick = () => {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  location.reload();
};
