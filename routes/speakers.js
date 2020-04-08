const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, res, next) => {
    try {
      const speakers = await speakersService.getList();
      const art = await speakersService.getAllArtwork();
      return res.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, art });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (request, res, next) => {
    try {
      const speaker = await speakersService.getSpeaker(request.params.shortname);
      const art = await speakersService.getArtworkForSpeaker(request.params.shortname);

      return res.render('layout', {
        pageTitle: 'Detail',
        template: 'speakers-detail',
        speaker,
        art,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
