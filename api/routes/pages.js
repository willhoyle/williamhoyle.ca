const { Router } = require('express')

const router = Router()


const { getRoutes } = require("../../util/helpers.js")


/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.json(await getRoutes()).end()
})


module.exports = router