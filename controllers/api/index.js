const router = require('express').Router();
const userRoutes = require('./userRoutes')
const tileRoutes = require('./tileRoutes')
const trackerRoutes = require('./trackerRoutes')




router.use('/users', userRoutes)
router.use('/tiles', tileRoutes)
router.use('/trackers', trackerRoutes)



module.exports = router;