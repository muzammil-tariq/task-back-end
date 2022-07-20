module.exports = function isPublicRequest({ method, path }) {
  let val = false;
  constants.PUBLIC_ROUTES.forEach((element) => {
    if (element.methods.includes(method) && path.match(element.path)) {
      val = true;
      return;
    }
  });
  return val;
};
