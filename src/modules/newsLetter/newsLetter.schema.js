const NewsLetterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("NewsLetter", NewsLetterSchema);
