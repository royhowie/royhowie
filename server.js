import bodyParser from 'body-parser'
import colors from 'colors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import flash from 'connect-flash'
import logger from 'morgan'
import session from 'express-session'

let port = process.env.PORT || 5000
export let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())
app.use(cookieParser())
app.use(flash())
app.use(logger('dev'))
app.use(session({
    secret: String(Math.random() * 0xFFFFFF),
    saveUninitialized: true,
    resave: true
}))

;['/img', '/script', '/style', '/public'].forEach((dir) => {
    app.use(dir, express.static(`${ __dirname }/static${ dir }`))
})

app.set('view engine', 'jade')
app.disable('etag')

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
|               START THE SERVER            |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

require('./app/routes.js')(app)
app.listen(port)
console.log('up and running on port'.bold, port.toString().green.bold)

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
|              SERVER HAS STARTED           |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
