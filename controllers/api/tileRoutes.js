const router = require('express').Router();
const { Tile, User, Comment, Tracker } = require('../../models');
// const withAuth = require('../../utils/auth');

// The `/api/tiles` endpoint


// ------------------------------------------------------------------
// FOR TESTING IN INSOMNIA


// GET all tiles 
router.get('/', async (req, res) => {
    const tileData = await Tile.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(tileData);
  });
  
  
  // DELETE a tile 
  router.delete('/:id', async (req, res) => {
    const deletedtile = await Tile.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedtile);
  });
  
  
  // ------------------------------------------------------------------
 
// GET one tile, with associated user and comment data
router.get('/:id', async (req, res) => {
    try {
        const tilesData = await Tile.findByPk(req.params.id, {
            include: [
                { model: User }, 
                { model: Comment }
            ],
        });
            res.status(200).json(tilesData);
    } catch (err) {
            console.log(err);
    res.status(500).json(err);
    }
});



module.exports = router;