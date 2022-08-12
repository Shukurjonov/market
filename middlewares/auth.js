const jwt = require('jsonwebtoken');
const { APP } = require('./../config');

const authMiddleware = async (req, res, next) => {
  let authorizationHeaader;

  if (req.method === 'GET' && req.query.token) authorizationHeaader = `Berear ${req.query.token}`;
  else authorizationHeaader = req.headers.authorization;

  if (authorizationHeaader) {
    const token = authorizationHeaader.split(' ')[1];

    return jwt.verify(token, APP.SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          code: 401,
          type: 'AuthenticationError',
          message: {
            en: 'You are unauthorized, try refreshing the page.',
          },
        });
      }

      req.user = decoded.user;
      return next();
    });
  }

  return res.status(401).send({
    code: 401,
    type: 'AuthenticationError',
    message: {
      en: 'You are unauthorized, try refreshing the page.',
    },
  });

}

module.exports = authMiddleware;