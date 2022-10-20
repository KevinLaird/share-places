const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let allUsers;
  try {
    allUsers = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Could not find users. Please try again later.',
      500,
    );
    next(error);
  }

  if (!allUsers) {
    const error = new HttpError('No users found!', 404);
    next(error);
  }

  res.json({ users: allUsers.map((user) => user.toObject({ getters: true })) });
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
    image: `https://media-exp1.licdn.com/dms/image/C5603AQH5LOqukEdoAQ/profile-displayphoto-shrink_200_200/0/1604510146335?e=1671667200&v=beta&t=vx_1lax77mIo6QWxXXLtrt6NqaaV7lADQaFfreBLFq4`,
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Sign up failed. Please try again later.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Login in failed, please try again later.',
      500,
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      401,
    );
    return next(error);
  }

  res.json({
    message: 'Logged in!',
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
