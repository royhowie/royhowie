export default {
    get404,
    get500,
}

function get404 (req, res) {
    res.status(400)
    res.render('404.jade')
}

function get500 (req, res) {
    res.status(500)
    res.render('500.jade', { err })
}
