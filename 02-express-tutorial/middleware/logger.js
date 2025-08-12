function logger(req, res, next) {
  const method = req.method;
  const url = req.url;
  const getYear = new Date().getFullYear();
  console.log(method, url, getYear);
  next();
}

module.exports = logger;
