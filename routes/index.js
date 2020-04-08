const express = require('express');

const router = express.Router();

const speakerRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, res, next) => {
    try {
      const topSpeakers = await speakersService.getList();
      const art = await speakersService.getAllArtwork();
      return res.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers, art });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/feedback', feedbackRoute(params));

  router.use('/speakers', speakerRoute(params));

  return router;
};
