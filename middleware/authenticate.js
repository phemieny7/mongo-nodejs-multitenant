const jwt = require("jsonwebtoken");
const config = require("config");

function authenticate(req, res, next) {
  const token = req.header("auth-token");

  // Token Validity
  if (!token) {
    res.status(401).json({ msg: "Invalid token" });
  }
  try {
    // Verify Token
    const verified = jwt.verify(token, config.get("tokenSecret"));

    // Grant User Access
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid Token" });
  }
}

module.exports = authenticate;
