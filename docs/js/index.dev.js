"use strict";

var PORT = 9001;

var express = require('express');

var cors = require('cors');

var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var app = express();
app.use(cors());
app.use(express.json());
app.post('/registration', function (req, res) {
  console.log(req.body);
  res.json({
    message: 'Вы успешно зарегистрировались!'
  });
});
app.post('/login', function (req, res) {
  console.log(req.body);
  res.json({
    message: 'Вы успешно авторизованы!'
  });
});
app.get('/products', function (req, res) {
  var products = [{
    id: 1,
    header: 'Товар 1',
    price: 120
  }, {
    id: 2,
    header: 'Товар 2',
    price: 3850
  }, {
    id: 3,
    header: 'Товар 3',
    price: 570
  }, {
    id: 4,
    header: 'Товар 4',
    price: 14360
  }, {
    id: 5,
    header: 'Товар 5',
    price: 98
  }, {
    id: 6,
    header: 'Товар 6',
    price: 734
  }, {
    id: 7,
    header: 'Товар 7',
    price: 198
  }, {
    id: 8,
    header: 'Товар 8',
    price: 334
  }];
  res.json({
    data: products[0]
  });
});

var start = function start() {
  try {
    app.listen(PORT, function () {
      return console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043D\u0430 ".concat(PORT, " \u043F\u043E\u0440\u0442\u0435"));
    });
  } catch (error) {
    console.log(error);
  }
};

start();