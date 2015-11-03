import r from './routing'

export default (app) => {

    /*  ----------------------------
               GENERAL ROUTES
        ----------------------------  */

    app.get('/', r.general.index)
    app.get('/stackoverflow', r.general.stackoverflow)
    app.get('/github', r.general.github)
    app.get('/resume', r.general.resume)

    /*  ----------------------------
                  ERROR PAGES
        ----------------------------  */

    app.use(r.errors.get404)
    app.use(r.errors.get500)
}
