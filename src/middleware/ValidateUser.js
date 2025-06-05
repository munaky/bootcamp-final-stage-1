export default function isAuthenticated(req, res, next){
    if(!req.session.user) return res.redirect('/auth/login');

    res.locals.user = req.session.user;
    res.locals.layout = 'layouts/admin';

    next();
}