import cheerio from 'cheerio'

const [ CC, ELL ] = [ 'CHEFSCHOICE', 'EATLEARNLIVE']
const [ LUNCH, DINNER ] = [ 2, 3 ]

export class MenuParser {
    constructor (request) {
        this.$ = cheerio.load(request.data)
        this.lunch = {}
        this.dinner = {}
    }

    loadMenu (menuNumber, location) {
        return this.$(`#menu-tbl-${ menuNumber } tr.item-row-${ location } td.tbl-td-name`)
            .children()
            .filter('.item-name, .item-desc')
            .map((index, child) => {
                if (child.children[0] && child.children[0].data)
                    return child.children[0].data.replace(/[\n\t]/g, '').trim()
                return ''
            })
            .get()
            .reduce((accum, current, index) => {
                if (index % 2 === 0)
                    accum[accum.length] = { item: current }
                else
                    accum[accum.length - 1].desc = current
                return accum
            }, [])
    }

    loadDay () {
        this.lunch[CC] = this.loadMenu(LUNCH, CC)
        this.lunch[ELL] = this.loadMenu(LUNCH, ELL)
        this.dinner[CC] = this.loadMenu(DINNER, CC)
        this.dinner[ELL] = this.loadMenu(DINNER, ELL)

        return this
    }

    toString () {
        let str = ''

        ;[ 'lunch', 'dinner' ].forEach(meal => {
            str += meal.toUpperCase() + '\n'
            ;[ CC, ELL ].forEach((station, index) => {
                if (this[meal] && this[meal][station]) {
                    str += `\t~~ ${ station } ~~\n`
                    this[meal][station].forEach(item => str += `\t\t${ item.item } (${ item.desc })\n`)
                }
            })
        })

        return str
    }

    asJSON () {
        return JSON.stringify({ lunch: this.lunch, dinner: this.dinner })
    }

}

export default MenuParser
