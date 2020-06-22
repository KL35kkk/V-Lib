exports.get404Page = (req, res, next) => { // dealing with all the other Not Found routes
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: ''
    });
}