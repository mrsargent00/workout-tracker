const router = require('express').Router();
const testRoutes = require('./testRoutes') // remove at deployment
const userRoutes = require('./userRoutes')
const tileRoutes = require('./tileRoutes')
const trackerRoutes = require('./trackerRoutes')



router.use('/tests', testRoutes) // remove at deployment

router.use('/users', userRoutes)
router.use('/tiles', tileRoutes)
router.use('/trackers', trackerRoutes)



module.exports = router;