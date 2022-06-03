const decodeJson = {
  decode: (req, res, next) => {
    if (req.body.json) {
      req.body = JSON.parse(req.body.json);
    }
    next();
  },
};

module.exports = decodeJson;
