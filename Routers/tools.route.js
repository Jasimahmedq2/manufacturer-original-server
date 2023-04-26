const express = require('express');
const { findSpecificServiceController, findAllServiceController, insertToolsProductController } = require('../Controller/tools.controller');
const Router = express.Router()

Router.get('/service', findAllServiceController)
Router.post('/service', insertToolsProductController)
Router.get('/service/:id', findSpecificServiceController)
Router.delete('/service/:id', )

module.exports = Router