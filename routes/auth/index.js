const jwt = require('jsonwebtoken');
const { catchError } = require('../../utils/helper');
const { loginSchema, registerSchema } = require('./schema');

const { APP } = require('../../config');

const Auth = require('../../database/auth');

const router = require('express').Router();

const login = catchError(async (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return next({
      status: 400,
      message: error.details[0].message,
    })
  }
  const result = await Auth.login([value.username, value.password]);
  if (!result.length) {
    return res.status(404).send({
      message: 'Username or password is incorrect',
    })
  }

  const token = jwt.sign({ user: result[0] }, APP.SECRET, { expiresIn: APP.SESSION_TIMEOUT });

  return res.status(200).send({
    message: 'User successfully logged in',
    token,
    data: result[0]
  })

})

const register = catchError(async (req, res, next) => {
  const { error, value } = registerSchema.validate(req.body);

  if (error) {
    return next({
      status: 400,
      message: JSON.stringify(error.details[0].message),
    })
  }

  const result = await Auth.register([value.firstName, value.lastName, value.username, value.password, value.roleId]);

  const token = jwt.sign({ user: result[0] }, APP.SECRET, { expiresIn: APP.SESSION_TIMEOUT });

  return res.status(201).send({
    message: 'User successfully registered',
    token,
    data: result[0]
  })

})

router.post('/login', login);
router.post('/register', register);

module.exports = router;