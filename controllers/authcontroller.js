var exports = (module.export = {});

exports.signup = function(req, res){
    res.render("signUp");
};

exports.signin = function(req, res) {
    res.render("signIn");
};

exports.dashboard = function(req,res) {

    let userData = {
        userName: res.req.user.firstname + " " + res.req.user.lastname
    }
    res.render("dashboard", userData);
};

exports.logout = function(req, res) {
    req.session.destroy(function(err){
        res.redirect("/");
    });
};