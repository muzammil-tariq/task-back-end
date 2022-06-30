class CrudService {
  constructor(model) {
    this.model = model;
  }

  async add(payload) {
    return await this.model.create(payload);
  }

  async update(payload, id, message) {
    let model = await this.model.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!model) {
      throw createError(404, message);
    }
    return model;
  }

  async findOneAndUpdate(payload, where, message) {
    let model = await this.model.findOneAndUpdate(where, payload, {
      new: true,
    });
    if (!model) {
      throw createError(404, message);
    }
    return model;
  }

  async getModelById(id, notFoundMessage) {
    let model = await this.model.findById(id);

    if (!model) {
      throw createError(404, notFoundMessage);
    }
    return model;
  }

  getList({
    where = {},
    limit = dataConstraint.PAGINATION_LIMIT,
    currentPage = dataConstraint.CURRENT_PAGE,
    sortBy = "createdAt",
    sortDirection = -1,
  }) {
    return this.model
      .find(where)
      .skip(limit * currentPage - limit)
      .limit(limit)
      .sort({
        [sortBy]: sortDirection,
      });
  }
  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }
}
exports.CrudService = CrudService;
