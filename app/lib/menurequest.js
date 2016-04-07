import Promise from 'bluebird'
import curl from 'curlrequest'

export class MenuRequest {
    constructor (date) {
        if (!(date instanceof Date))
            throw new Error('A menu request must be passed a date object!')
        this.date = date
        this.request = MenuRequest.requestObj(date)
    }

    getFormattedDate () {
        return this.request.data.dt
    }

    sendRequest () {
        return new Promise((resolve, reject) => {
            curl.request(this.request, (err, data) =>
                err ? reject(err) : resolve(data)
            )
        }).then((data) => {
            this.data = data
            return this
        })
    }

    static requestObj (date) {
        return {
            url: 'http://www.dineoncampus.com/miami/webtrition/webtrition.cfm',
            headers: {
                'Origin': 'http://www.dineoncampus.com',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html, */*; q=0.01',
                'Referer': 'http://www.dineoncampus.com/miami/show.cfm?cmd=menus2',
                'X-Requested-With': 'XMLHttpRequest',
                'Connection': 'keep-alive',
            },
            data: {
                dt: MenuRequest.formatDate(date),
                venueName: 'Mahoney-Pearson+Dining+Hall',
            }
        }
    }

    // example format: 07-Apr-16 for Thursday, April 7, 2016
    static formatDate (date) {
        let tokens = date.toString().split(' ')
        return `${ tokens[2] }-${ tokens[1] }-${ tokens[3] % 100 }`
    }
}

export default MenuRequest
