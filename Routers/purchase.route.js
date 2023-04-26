const express = require("express");
const { purchaseFindByEmail, findAllPurchaseController, updateShippedController, findPurchaseByIdController, insertPurchaseController, DeletePurchaseController, manageOrderDeleteController, purchaseDetailsUpdateController } = require("../Controller/purchase.controller");
const Router = express.Router();

Router.get('/', purchaseFindByEmail)
Router.get('/manageorder', findAllPurchaseController)
Router.post('/', insertPurchaseController)
Router.patch('/shipped/:id', updateShippedController)
Router.get('/payment/:id', findPurchaseByIdController)
Router.delete('/delete/:id', DeletePurchaseController)
Router.delete('/manageorderdelete/:id', manageOrderDeleteController)
Router.patch('/payment/:id', purchaseDetailsUpdateController)


module.exports = Router;
