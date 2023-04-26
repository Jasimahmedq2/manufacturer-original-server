const ToolsModel = require("../Model/Tools.model");

exports.findSpecificServiceController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ToolsModel.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAllServiceController = async (req, res) => {
  try {
    const result = await ToolsModel.find({}).sort({ $natural: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insertToolsProductController = async (req, res) => {
  try {
    const NewProduct = new ToolsModel(req.body);
    await NewProduct.save();
    res.status(200).json({message: "successfully inserted a product"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.DeleteToolsManufacturerController = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await ToolsModel.deleteOne(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
