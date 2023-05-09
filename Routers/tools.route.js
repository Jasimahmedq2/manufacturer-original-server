const express = require('express');
const { findSpecificServiceController, findAllServiceController, insertToolsProductController, DeleteToolsManufacturerController } = require('../Controller/tools.controller');
const Router = express.Router()

Router.get('/service', findAllServiceController)
Router.post('/service', insertToolsProductController)
Router.get('/service/:id', findSpecificServiceController)
Router.delete('/service/:id', DeleteToolsManufacturerController)

module.exports = Router