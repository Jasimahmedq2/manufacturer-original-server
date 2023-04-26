const PurchaseModel = require("../Model/Purchase.model");

exports.purchaseFindByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    console.log("email is", email);
    const query = { email: email };
    const result = await PurchaseModel.find(query).sort({ $natural: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAllPurchaseController = async (req, res) => {
  try {
    const result = await PurchaseModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateShippedController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateDoc = {
      $set: {
        shipped: true,
      },
    };
    const result = await PurchaseModel.updateOne(id, updateDoc);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findPurchaseByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await PurchaseModel.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insertPurchaseController = async (req, res) => {
  try {
    const newPurchase = new PurchaseModel(req.body)
    await newPurchase.save()
    res.status(200).json({message: "successfully insert purchase details"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.DeletePurchaseController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await PurchaseModel.findByIdAndDelete(id);
    res.status(200).send({message: "successfully deleted", result});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.manageOrderDeleteController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await PurchaseModel.findByIdAndDelete(id);
    res.status(200).json(result, {message: "successfully deleted"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.purchaseDetailsUpdateController = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = req.body;
    console.log(payment);
    const updatePurchase = {
      $set: {
        paid: true,
        transactionId: payment.transactionId,
      },
    };
    const inserted = await paymentCollection.insertOne(payment);
    const result = await purchaseCollection.updateOne(id, updatePurchase);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
