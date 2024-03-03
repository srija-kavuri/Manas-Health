const express = require('express');

const auth = (req, res, next) => {
  // Check if req and req.session are defined
  if (req.session && req.session.isAuth) {
    next();
  } else {
    return res.status(400).redirect('/login');
  }
};

module.exports = auth;
