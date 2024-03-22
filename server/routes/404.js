const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    message: "Nie znaleziono żądanej ścieżki",
  });
};
module.exports = notFoundMiddleware;
