const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Brak tokenu JWT" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Nieprawidłowy token JWT" });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
