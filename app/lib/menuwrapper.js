import Promise from 'bluebird'
import { MenuParser } from './menuparser'
import { MenuRequest } from './menurequest'

let fs = Promise.promisifyAll(require('fs'))

export class MenuWrapper {
    constructor (date) {
        if (!(date instanceof Date))
            throw new Error('A menu wrapper must be passed a date object!')
        this.date = date
    }
    get () {
        let formattedDate = MenuRequest.formatDate(this.date)
        let path = `./static/menus/${ formattedDate }.json`

        return fs.statAsync(path).then(() => {
            // file exists
            return fs.readFileAsync(path, 'utf8')
        }).catch((err) => {
            // file does not exist
            return new MenuRequest(this.date)
                .sendRequest()
                .then((request) => new MenuParser(request).loadDay())
                .then((parser) => parser.asJSON())
                .then((json) => {
                    return fs.writeFileAsync(path, json).then(() => json)
                })
        })
    }
}

export default MenuWrapper
