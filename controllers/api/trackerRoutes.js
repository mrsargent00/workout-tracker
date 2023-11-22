const router = require('express').Router();
const { Tile, User, Comment, Tracker } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/tiles` endpoint

// ------------------------------------------------------------------
// FOR TESTING IN INSOMNIA

// GET all trackers 
router.get('/', async (req, res) => {
  const trackerData = await Tracker.findAll({
    include: [{ model: Tile }],
  });
  res.status(200).json(trackerData);
});
// ------------------------------------------------------------------

// UPDATE a tracker by its `id` value
router.put('/:id', withAuth, async (req, res) => {
  try {
    const tracker = await Tracker.findByPk(req.params.id);

    if (tracker) {
      await tracker.update({
        current_tracker_status: req.body.new_tracker_status,
      });

      res.json(tracker);
    } else {
      res.status(404).json({ message: 'Tracker not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
