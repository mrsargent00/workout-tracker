const router = require('express').Router();
const { User, Tile, Comment, Tracker } = require('../../models');  // Adjust the relative path accordingly
const withAuth = require('../../utils/auth');  // Adjust the relative path accordingly


// The `/api/users` endpoint


// ------------------------------------------------------------------
// FOR TESTING IN INSOMNIA


// GET all users 
router.get('/', async (req, res) => {
  const userData = await User.findAll({
    include: [{ model: Tile }],
  });
  res.status(200).json(userData);
});

// DELETE a user 
router.delete('/:id', async (req, res) => {
  const deletedUser = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(deletedUser);
});
// ------------------------------------------------------------------


// create a new user -- DEVELOPED BY BECCA
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    /* req.body should look like this
      {
        "first_name": "", 
        "last_name": "", 
        "email": "", 
        "date_of_birth": "", 
        "password": ""
      }
    */

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});



router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});



router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;