const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30min",
  });
};

// middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // this is "Bearer token"
  const token = authHeader && authHeader.split(" ")[1]; // this is the "token"

  if (token == null) return res.sendStatus(401); // if there is no token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // if the token is not valid
    req.user = user; // if the token is valid
    next();
  });
}

module.exports = {
  generateAccessToken,
  authenticateToken,
};
