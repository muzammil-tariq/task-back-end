router.post(`/public/news-letter`, actions.newsLetter.add.create);
module.exports = { prefix: "newsLetter", router };
