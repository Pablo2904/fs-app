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

//Odkomentowac jak zaimplementuje redisa

// const redis = require("redis");
// const { promisify } = require("util");

// // Assuming you have Redis running in another container
// const redisClient = redis.createClient({
//   host: "redis", // This should match the service name in your Docker Compose file
//   port: 6379, // Default Redis port
// });

// const getAsync = promisify(redisClient.get).bind(redisClient);

// const verifyToken = async (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(401).json({ message: "Brak tokenu JWT" });
//   }

//   try {
//     const decoded = jwt.decode(token, SECRET_KEY);
//     if (!decoded) {
//       return res.status(401).json({ message: "Nieprawidłowy token JWT" });
//     }

//     // Assuming you store user IDs as keys in Redis
//     const userId = decoded.userId;
//     const userData = await getAsync(userId);
//     if (!userData) {
//       return res.status(401).json({ message: "Nieprawidłowy token JWT" });
//     }

//     req.userId = userId;
//     next();
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return res.status(500).json({ message: "Wewnętrzny błąd serwera" });
//   }
// };

// module.exports = verifyToken;
