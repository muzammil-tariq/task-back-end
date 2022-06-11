const { query, param, body } = expressValidator;

const pagination = [
  query("limit").toInt().optional(true),
  query("currentPage").toInt().optional(true),
];

const sort = [
  query("sortDirection")
    .isIn(["asc", "desc", "ascending", "descending", -1, 1])
    .optional(true),
];
function paramMongoId(name = "id") {
  return [param(name).exists().isMongoId()];
}
function bodyMongoId(name) {
  return [body(name).exists().isMongoId()];
}

module.exports = {
  pagination,
  sort,
  paramMongoId,
  bodyMongoId,
};
