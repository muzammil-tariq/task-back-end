module.exports = (array, object) => {
  let val = false;
  array.forEach((element) => {
    if (
      element.methods.includes(object.method) &&
      object.path.match(element.path)
    ) {
      val = true;
      return;
    }
  });
  return val;
};
