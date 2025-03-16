module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(404).render('partials/modal', { text: 'You are not authorized user! Please, sign in to see transactions', link: '/' })
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(404).render('partials/modal', { text: 'You are not admin! Please, sign in to see transactions', link: '/' })
    }
}

module.exports.isMember = (req, res, next) => {
    if (req.isAuthenticated() && req.user.membership_status) {
        next();
    } else {
        res.status(404).render('partials/modal', { text: 'You are not member! Please, sign in to see transactions', link: '/' })
    }
}