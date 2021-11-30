'use strict';

/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == 'GET') req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

/*
 *  User authorization routing middleware
 */

exports.user = {
  hasAuthorization: function (req, res, next) {
    //if (req.profile.id != req.user.id) {
    if (req.profile.user.level != ("admin" ||"Bee")) {
      req.flash('info', '無權限執行');
      return res.redirect('/users/' + req.profile.id);
    }
    next();
  }
};

/*
 *  Article authorization routing middleware
 */

exports.article = {
  hasAuthorization: function (req, res, next) {
    //if (req.article.user.id != req.user.id) {
    if (req.user.level != ("admin" ||"Bee")) {
      req.flash('info', req.user +'無權限執行');
      return res.redirect('/articles/' + req.article.id);
    }
    next();
  }
};

/**
 * Comment authorization routing middleware
 */

exports.comment = {
  hasAuthorization: function (req, res, next) {
    // if the current user is comment owner or article owner
    // give them authority to delete
    /*if (
      req.user.id === req.comment.user.id ||
      req.user.id === req.article.user.id
    ) {*/
    if (
      req.user.level === ("admin" ||"Bee")
    ) {
      next();
    } else {
      req.flash('info', '無權限執行');
      res.redirect('/articles/' + req.article.id);
    }
  }
};
