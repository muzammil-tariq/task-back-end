const { HASH_ALGO: algorithm, SALT } = process.env;
exports.makeHashValue = (text) => {
  const hmac = crypto.createHmac(algorithm, SALT);
  hmac.update(text);
  return hmac.digest("hex");
};
