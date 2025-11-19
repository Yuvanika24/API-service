const VALID_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

function isValidMethod(method) {
  return VALID_METHODS.includes(method.toUpperCase());
}

function isValidURL(url) {
  try {
    const parsed = new URL(url);

    const hostname = parsed.hostname;
    
    const blocked = ["localhost", "127.0.0.1", "0.0.0.0"];

    if (blocked.includes(hostname)) return false;

    if (/^(10\.|172\.16\.|192\.168\.)/.test(hostname)) return false;

    return true;
  } catch (e) {
    return false;
  }
}

module.exports = { isValidMethod, isValidURL };
