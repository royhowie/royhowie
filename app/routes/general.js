export default {
    github,
    index,
    resume,
    stackoverflow,
}

function github (req, res) {
	res.redirect('http://github.com/royhowie')
}

function index (req, res) {
	res.render('index.jade')
}

function resume (req, res) {
	res.render('resume.jade')
}

function stackoverflow (req, res) {
	res.redirect('http://stackoverflow.com/users/2476755/royhowie')
}
