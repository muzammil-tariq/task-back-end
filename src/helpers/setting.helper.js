module.exports = {
  async get() {
    const get = util.promisify(redisClient.get).bind(redisClient);
    const cachedSettings = await get("settings");
    if (cachedSettings) {
      return JSON.parse(cachedSettings);
    }
    const settings = await models.Settings.findOne().select([
      "-createdAt",
      "-updatedAt",
      "-_id",
      "-__v",
    ]);
    helpers.setting.update(settings);
    return settings;
  },
  async update(payload) {
    const set = util.promisify(redisClient.set).bind(redisClient);
    await set(
      "settings",
      JSON.stringify(
        _.omit(payload._doc, ["createdAt", "updatedAt", "_id", "__v"])
      )
    );
  },
};
