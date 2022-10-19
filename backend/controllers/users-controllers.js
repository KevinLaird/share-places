const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Kevin Laird',
    email: 'test@test.com',
    password: 'testers',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Sign up failed. Please try again later.', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already. Please login instead.',
      422,
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: `https://media-exp1.licdn.com/dms/image/C5603AQH5LOqukEdoAQ/profile-displayphoto-shrink_200_200/
      0/1604510146335?e=1671667200&v=beta&t=vx_1lax77mIo6QWxXXLtrt6NqaaV7lADQaFfreBLFq4`,
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Sign up failed. Please try again later.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError('Could not authenticate user. Credentials do not match.'),
      401,
    );
  }

  res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
