const JWT_SECRET = "Rajjubhai";
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.token;

  if (!authHeader) {
    return res.status(403).json({
      msg: " user not have token",
    });
  }
  const token = authHeader;
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (err) {
    return res.status(403).json({
      msg: "unauthenticated ",
    });
  }
};

module.exports = {
  authMiddleware,
};
