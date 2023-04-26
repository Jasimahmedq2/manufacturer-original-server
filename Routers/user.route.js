const express = require('express');
const { userFindController, makeAdminUserController, findAdminController, storLoginDataController, deleteUserController } = require('../Controller/user.controller');
const Router = express.Router()

Router.get('/', userFindController)
Router.get('/admin/:email', findAdminController)
Router.put('/admin/:email', makeAdminUserController)
Router.put('/login/:email', storLoginDataController)
Router.delete('/delete/:email', deleteUserController)


module.exports = Router;