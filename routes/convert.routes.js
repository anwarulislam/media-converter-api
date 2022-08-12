const Router = require('express').Router()
const path = require('path')
const { convert } = require('../controllers/convert')
const { handleUpload } = require('../middlewares/upload')

Router.get('/upload', (req, res) => {
    // server index.html file from views/index.html
    res.sendFile(path.join(__dirname, '../views/index.html'))
})


Router.get('/convert', (req, res) => {
    // redirect to upload page
    res.redirect('/upload')
})
Router.post('/convert', handleUpload, convert)


module.exports = Router