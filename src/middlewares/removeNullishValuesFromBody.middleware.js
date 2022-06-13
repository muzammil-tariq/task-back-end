module.exports = function removeNullishValuesFromBody(req, _, next) {
  Object.keys(req.body).forEach(
    (key) =>
      (req.body[key] === undefined ||
        req.body[key] === null ||
        req.body[key] === "" ||
        req.body[key] === []) &&
      delete req.body[key]
  );
  next();
};
