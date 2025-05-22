// ——————————————————————————————————————————————
// 1) On load: check URL fragment or cookie
// ——————————————————————————————————————————————
window.addEventListener("load", () => {
  // 1a) If URL has #access_token=…, grab it & set cookie
  if (location.hash.includes("access_token")) {
    const params = new URLSearchParams(location.hash.slice(1));
    const token = params.get("access_token");
    const expiresIn = parseInt(params.get("expires_in") || "3600"); // seconds

    // Set a cookie that expires when the token does
    const expireDate = new Date(Date.now() + expiresIn * 1000);
    document.cookie = `${COOKIE_NAME}=${token}; expires=${expireDate.toUTCString()}; path=/`;

    // Clean up URL (optional)
    history.replaceState(null, "", location.pathname);
  }

  // 1b) Read token from cookie
  // const token = readCookie(COOKIE_NAME);
  const token = "fvazwyoy4895oxulx5v55i1iary9mo";
  // log all cookies
  if (token) {
    setupTwitchClient(token);
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});
