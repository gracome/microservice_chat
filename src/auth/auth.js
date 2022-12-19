const jwt = require('jsonwebtoken');
const privateKey = require('./private_keys');
const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`;

module.exports = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message });
  }

  token = token.slice(7, token.length).trimLeft();

  try {
    let decodedToken = jwt.verify(token, privateKey);
    req.current_user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Sorry, you must provide a valid token."
    });
  }
}










