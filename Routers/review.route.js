const express = require("express");
const { getAllReviewController, postReviewController } = require("../Controller/review.controller");
const Router = express.Router();

Router.get('/', getAllReviewController)
Router.post('/', postReviewController)

module.exports = Router;
