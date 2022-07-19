const NewsLetterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  }
});
module.exports = mongoose.model("NewsLetter", NewsLetterSchema);
