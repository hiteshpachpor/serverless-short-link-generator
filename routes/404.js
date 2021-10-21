module.exports = (request, response, next) => {
  return response.status(200).json({
    message: "The requested URL doesn't exist anymore.",
  });
};
