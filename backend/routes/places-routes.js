const express = require('express');

const router = express.Router();

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

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const placeJson = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!placeJson) {
    const error = new Error('Could not find a place for the provided id.');
    error.code = 404;
    return next(error);
  }

  res.json(placeJson);
});

router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;

  const user = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!user) {
    const error = new Error('Could not find a user for the provided id.');
    error.code = 404;
    return next(error);
  }

  res.json(user);
});

module.exports = router;
