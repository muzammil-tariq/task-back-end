exports.validateQueryParams = (req, res, next) => {
  const { query } = req;
  for (const property in query) {
    if (!query[property])
      throw createError(400, messages.invalidQuery(property));
    if (query[property].constructor !== Array) {
      query[property] = query[property].trim().toLowerCase();
    } else {
      let arr = query[property];
      query[property] = arr.map((item) => {
        return item.trim().toLowerCase();
      });
    }
  }
  next();
};
