const router = require('express').Router();
const { Tile, User, Comment, Tracker } = require('../../models');
const { withAuth } = require('../../utils/auth');

// The `/api/comments` endpoint


// ------------------------------------------------------------------
// FOR TESTING IN INSOMNIA


// GET all comments 
router.get('/', async (req, res) => {
    const commentData = await Comment.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(commentData);
});
 

  
// ------------------------------------------------------------------
 

// CREATE a comment 
router.post('/create', withAuth, async (req, res) => {

    /* req.body should look like this...
      {
        "date_created": "",
        "content": "",
        "user_id": "",
        "tile_id": ""
      }
    */
    
    console.log('req.body:', req.body)
    console.log('user_id:', req.session.user_id,)
  
    try {
      const newCommentData = await {
        ...req.body,
        user_id: req.session.user_id,
      } 
      
      const newComment = await Comment.create(newCommentData);
  
      // send new post as a res
      res.json(newComment);
  
    } catch (error) {
      res.status(400).json(error);
    }
});
  

module.exports = router;