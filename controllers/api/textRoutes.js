// delete this file before deployment

const router = require('express').Router();
const { User, Tile, Tracker, Comment } = require('../../models');

// The `/api/tests` endpoint

router.get('/', async (req, res) => {
    res.render('test');
});



// ------------------------------------------------------------------------------------------
// For testing in INSOMNIA

// GET all Users, including its associated data
// /api/tests/users
router.get('/users', async (req, res) => {
    const userData = await User.findAll({
      include: [
        { model: Tile, attributes: { exclude: ['user_id'] } },
        { model: Comment, attributes: { exclude: ['id'] } }
      ],
    });
    res.status(200).json(userData);
});


// GET all Tiles, including its associated data
// /api/tests/tiles
router.get('/tiles', async (req, res) => {
  const tileData = await Tile.findAll({
    include: [
      { model: Tracker, attributes: { exclude: ['id','tile_id'] } },
      { model: Comment, attributes: { exclude: ['id', 'tile_id'] }  }, 
      { model: User, attributes: { exclude: ['date_of_birth', 'email', 'password'] }}
    ],
  });
  res.status(200).json(tileData);
});


// GET all Trackers, including its associated data
// /api/tests/trackers
router.get('/trackers', async (req, res) => {
  const trackerData = await Tracker.findAll({
    include: [
      { model: Tile, attributes: { exclude: ['id', 'user_id'] } }
    ],
  });
  res.status(200).json(trackerData);
});


// GET all Comments, including its associated data
// /api/tests/comments
router.get('/comments', async (req, res) => {
  const commentData = await Comment.findAll({
    include: [
      { model: User, attributes: { exclude: ['date_of_birth', 'email', 'password'] } },
      { model: Tile,  attributes: { exclude: ['id','date_created', 'description', 'password'] }  },
    ],
  });
  res.status(200).json(commentData);
  console.log(commentData)
});


// ------------------------------------------------------------------------------------------






module.exports = router;