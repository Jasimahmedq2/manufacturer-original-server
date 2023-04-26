const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.tokenData = decoded;
      next();
    });
  } catch (error) {
    console.log("jwt error:", error.message);
  }
};

module.exports = verifyJWT;
