const router = require('express').Router();
const { User, Tile, Comment, Tracker } = require('../models');
const { withAuth } = require('../utils/auth');


// ------------------------------------------------------------------------------------------
// for testing during development 

// test route for layout development
router.get('/meg', async (req, res) => {
  res.render('test-becca');
});

// test route for any script/route development
router.get('/ben', async (req, res) => {
  res.render('test-ben');
});

// test route for development, endpoint: becca
router.get('/becca', async (req, res) => {
  // test-becca layout
  res.render('test-becca');
});

// test route for development, endpoint: login
router.get('/login', async (req, res) => {
  // login layout
  res.render('login-and-signup');
});

// test route for development, endpoint: login
router.get('/test-becca-dashboard', async (req, res) => {
  // login layout
  res.render('test-becca-dashboard');
});

// test route for development
router.get('/test', async (req, res) => {
  res.render('test');
});

// ------------------------------------------------------------------------------------------

// // GET all users to render to homepage
router.get('/', withAuth, async (req, res) => {
  try {
      const userData = await User.findAll({
          include: [
              {
                model: Tile,
              },
          ],
      });
      
      // serialize for handlebars
      const users = userData.map((user) => user.get({ plain: true }));
      console.log('users:', users)

      // render homepage
      res.render('test-becca-homepage', {
        users,
        logged_in: req.session.logged_in
      });

  } catch (error) {
      res.status(500).json(error);
  }
});


// GET all tiles (by logged in user) to populate dashboard -- DEVELOPED BY BECCA
// NEEDS FURTHER DEVELOPMENT.
router.get('/dashboard', withAuth, async (req, res) => {
  console.log('req:', req.session.user_id)
  try {
      const [tileData, commentData] = await Promise.all([
          
        Tile.findAll({
            where: {
              user_id: req.session.user_id
              },
            include: [
              {
                model: User,
                attributes: ['first_name'],
              },
              {
                model: Comment,
              },
              {
                model: Tracker,
                attributes: ['id', 'tracker_goal', 'current_tracker_status', 'percentage'],
              },
            ],
        }),
      ])

      const loggedInUser = req.session.user_id;

      // add a "user_logged_in" flag to each tile in the array for the tile partial layout
      // for use with delete/update
      const tiles = tileData.map(tile => {
          const oneTile = tile.get({ plain: true });
          // "req.session.user_id === post.user_id"
          // i don't need to do this comparison for the homepage because... 
          // i've only retrieved posts belonging to the user 
          oneTile.user_logged_in = true;
          return oneTile;
      });

      console.log('tiles:', tiles)

      res.render('test-becca-dashboard', {
        tiles, 
        // "logged_in" flag passed to use in main
        logged_in: req.session.logged_in
      });

  } catch (error) {
      res.status(500).json(error);
  }
});


// GET all of a users tiles to view or this redirects to dashboard 
router.get('/users/:id', withAuth, async (req, res) => {
  console.log('req:', req.session.user_id)
  console.log('flag:', req.session.logged_in)
  console.log('req.params.id:', req.params.id)
  // store user_id of logged in user
  const loggedInUser = req.session.user_id;
  console.log("loggedInUser: ", loggedInUser)

  try { 
     // retrieve tile data from db
      const tileData = await Tile.findAll({
        where: {
          user_id: req.params.id,
        },
        include: [
          {
            model: User,
            attributes: ['first_name', 'last_name'],
          },
          {
            model: Comment,
            attributes: [ 'id', 'date_created', 'content', 'user_id', 'tile_id' ],
          },
          {
            model: Tracker,
            attributes: [ 'id', 'tracker_goal', 'current_tracker_status', 'percentage', 'tile_id' ],
          },
        ],
      })
      
      // error handling
      if(!tileData) {
          res.status(404).json({message: 'No tiles exist!'});
          return;
      }

      // serialize tiles and comments for handlebars, while adding user_logged_in flag added to each object 
      // this flag will be set to true/false and used in handlebars for conditional rendering

      // add the 'user_logged_in' flag to each tile
      // user_logged_in flag should be added also if the user_id of tile = loggedInUser
      // could i handle this in the model?

      const tiles = tileData.map(tile => {
        const oneTile = tile.get({ plain: true });
        oneTile.user_logged_in = loggedInUser === oneTile.user_id || loggedInUser === tile.user_id;
        return oneTile;
      })
      console.log('tiles:', tiles)

      // redirect to dashboard if user is visiting their own page
      if (loggedInUser == req.params.id) {
        res.redirect('/dashboard'); 
        return;
      }
      
      res.render('test-becca-single-user', { 
          tiles, // user_logged_in flag attached to post (for use in post partial) 
          // "logged_in" flag passed to use in main
          logged_in: req.session.logged_in,
      });

  } catch (error) {
        res.status(500).json(error);
        console.log(error);
  };     
});



// // GET all users to render to homepage
router.get('/', withAuth, async (req, res) => {
  try {
      const userData = await User.findAll({
          include: [
              {
                model: Tile,
              },
          ],
      });
      
      // serialize for handlebars
      const users = userData.map((user) => user.get({ plain: true }));
      console.log('users:', users)

      // render homepage
      res.render('test-becca-homepage', {
        users,
        logged_in: req.session.logged_in
      });

  } catch (error) {
      res.status(500).json(error);
  }
});


// GET all tiles (by logged in user) to populate dashboard -- DEVELOPED BY BECCA
// NEEDS FURTHER DEVELOPMENT.
router.get('/dashboard', withAuth, async (req, res) => {
  console.log('req:', req.session.user_id)
  try {
      const [tileData, commentData] = await Promise.all([
          
        Tile.findAll({
            where: {
              user_id: req.session.user_id
              },
            include: [
              {
                model: User,
                attributes: ['first_name'],
              },
              {
                model: Comment,
              },
              {
                model: Tracker,
                attributes: ['id', 'tracker_goal', 'current_tracker_status', 'percentage'],
              },
            ],
        }),
      ])

      const loggedInUser = req.session.user_id;

      // add a "user_logged_in" flag to each tile in the array for the tile partial layout
      // for use with delete/update
      const tiles = tileData.map(tile => {
          const oneTile = tile.get({ plain: true });
          // "req.session.user_id === post.user_id"
          // i don't need to do this comparison for the homepage because... 
          // i've only retrieved posts belonging to the user 
          oneTile.user_logged_in = true;
          return oneTile;
      });

      console.log('tiles:', tiles)

      res.render('test-becca-dashboard', {
        tiles, 
        // "logged_in" flag passed to use in main
        logged_in: req.session.logged_in
      });

  } catch (error) {
      res.status(500).json(error);
  }
});




























// GET one tile to render to single-posts layout
router.get('/tiles/:id', withAuth, async (req, res) => {
  console.log('req:', req.session.user_id)
  console.log('flag:', req.session.logged_in)
  console.log('tile_id:', req.params.id)

  try{ 
      const [tileData, commentData] = await Promise.all([
          
          Tile.findByPk(req.params.id, {
              include: [
                {
                    model: User,
                    attributes: ['first_name'],
                },
              ],
          }),

          Comment.findAll({
              where: {
                tile_id: req.params.id,
              },
              include: [
                  {
                    model: User,
                    attributes: ['first_name'],
                  },
              ],
              attributes: ['id', 'date_created', 'content', 'user_id', 'tile_id'],
          }),
      ])
      
      // error handling
      if(!tileData) {
          res.status(404).json({message: 'No tile exists with this id!'});
          return;
      }

      const loggedInUser = req.session.user_id;

      const tile = tileData.get({ plain: true });
      // user_logged_in flag added to post array for post partial layout
      tile.user_logged_in = loggedInUser === tile.user_id;
      console.log('tile:', tile)


      const comments = commentData.map(comment => {
          const oneComment = comment.get({ plain: true });
          // add the 'user_logged_in' flag to each comment
          // user_logged_in flag should be added also if the post_id = logged in user
          oneComment.user_logged_in = loggedInUser === oneComment.user_id || loggedInUser === tile.user_id;
          return oneComment;
      });
      console.log('comments:', comments)
      
  
      res.render('test-becca-single-tile', { 
          tile, // user_logged_in flag attached to post (for use in post partial) 
          comments, // user_logged_in flag attached to comments (for use in comment partial) 
          // "logged_in" flag passed to use in main
          logged_in: req.session.logged_in,
      });

  } catch (error) {
        res.status(500).json(error);
        console.log(error);
  };     
});



// login route -- DEVELOPED BY BECCA
router.get('/login', async (req, res) => {

  // if the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
      res.redirect('/test-becca-dashboard');
      return;
  }

  res.render('login-and-signup'); 
});



module.exports = router;