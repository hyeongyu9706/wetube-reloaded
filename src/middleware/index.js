export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = 'Wetube';
    res.locals.loggedInUser = req.session.user || {};
    console.log(req.session.user, 'User');
    next();
};

export const protectorMiddlewaree = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        return res.redirect('/login');
    }
};

export const pubilcOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect('/');
    }
};
