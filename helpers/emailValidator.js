module.exports = (emailOrUsername) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOrUsername);
