'use strict';

/**
 * Module dependencies.
 */

const { wrap: async } = require('co');

/**
 * Load comment
 */

exports.load = function(req, res, next, id) {
  req.comment = req.article.comments.find(comment => comment.id === id);

  if (!req.comment) return next(new Error('找無此流言'));
  next();
};

/**
 * Create comment
 */

exports.create = async(function*(req, res) {
  const article = req.article;
  yield article.addComment(req.user, req.body);
  res.redirect(`/articles/${article._id}`);
});

/**
 * Delete comment
 */

exports.destroy = async(function*(req, res) {
  yield req.article.removeComment(req.params.commentId);
  req.flash('info', '已刪除留言');
  res.redirect(`/articles/${req.article.id}`);
});
