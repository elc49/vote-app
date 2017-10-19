//Routes handler

var express= require('express');

module.exports = function (app) {
  app.route('/').get(function (req, res) {
    res.render('index');
  });

  //New vote route
  app.route('/polls/newvote').get(function (req, res) {
    res.render('form');
  });
};