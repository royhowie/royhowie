import { MenuWrapper } from '../lib/menuwrapper'
import Promise from 'bluebird'
import moment from 'moment'

export default {
    getMenu,
}

const DAYS_OUT = 3
const DAYS = Array.from(Array(DAYS_OUT), (_, index) => index)
const MS_IN_DAY = 1000 * 60 * 60 * 24
const N_DAYS_OUT = (days) => new Date(Date.now() + days * MS_IN_DAY)

function getMenu (req, res) {
    Promise.all(
        DAYS.map((index) => {
            return new MenuWrapper(N_DAYS_OUT(index)).get()
        })
    ).then((jsonDataArray) => jsonDataArray.map(json => JSON.parse(json)))
    .then((arr) => {
        res.render('menu.jade', { menus: arr, moment })
    })
}
