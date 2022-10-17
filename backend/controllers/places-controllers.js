const HttpError = require('../models/https-error');

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire state building',
    description: 'Content',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg',
    address: `350 Fifth Avenue[a] Manhattan, New York`,
    location: {
      lat: 40.7484213,
      lng: -73.9878416,
    },
    creator: 'u1',
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    return next(
      new HttpError('Could not find a place for the provided id.'),
      404,
    );
  }

  res.json(place);
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => p.creator === userId);

  if (!place) {
    return next(
      new HttpError('Could not find a user for the provided id.'),
      404,
    );
  }

  res.json(place);
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
