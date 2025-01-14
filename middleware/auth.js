const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports = (secret) => async (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next();
  }

  const [type, token] = authorization.split(' ');

  if (type.toLowerCase() !== 'bearer') {
    return next();
  }

  jwt.verify(token, secret, async (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    // TO DO: Verificar identidad del usuario usando `decodeToken.uid`
    const { uid } = decodedToken;
    const getUserByUid = await user.findById(uid);
    if (!getUserByUid) return next(404);
    //console.log('authMiddleware línea 26', getUserByUid);
    req.authToken = getUserByUid;
    return next();
  });
};

module.exports.isAuthenticated = (req) => (
  // TO DO: decidir por la informacion del request si la usuaria esta autenticada
  req.authToken || false
);

module.exports.isAdmin = (req) => (
  // TO DO: decidir por la informacion del request si la usuaria es admin
  req.authToken.roles.admin || false
);

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);

module.exports.requireLogin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next()
      : next()
);
